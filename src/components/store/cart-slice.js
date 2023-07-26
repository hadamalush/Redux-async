import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
	isShowCart: false,
	totalQuantity: 0,
	notification: null,
	cartItems: [],
	allProducts: [
		{
			id: "i1",
			title: "Parrot",
			price: 6,
			quantity: 1,
			description: "The best parrots in the world!",
		},
		{
			id: "i2",
			title: "Stone",
			price: 2,
			quantity: 1,
			description: "The toughest stone in the world!",
		},
		{
			id: "i3",
			title: "Tent",
			price: 200,
			quantity: 1,
			description: "Waterproof tent",
		},
		{
			id: "i4",
			title: "Tree",
			price: 2,
			quantity: 1,
			description: "Green tree",
		},
	],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialCartState,
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.cartItems = action.payload.items;
		},
		showCart(state) {
			state.isShowCart = !state.isShowCart;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
		addItemToCart(state, action) {
			const itemId = action.payload.id;
			const itemIndex = state.cartItems.findIndex(item => item.id === itemId);
			state.totalQuantity++;

			if (itemIndex >= 0) {
				state.cartItems[itemIndex].quantity += 1;
				return;
			}
			state.cartItems.push(action.payload);
		},

		removeItemFromCart(state, action) {
			const itemId = action.payload.id;
			const itemIndex = state.cartItems.findIndex(item => item.id === itemId);
			const itemQuantity = action.payload.quantity;
			state.totalQuantity--;

			if (itemQuantity === 1) {
				state.cartItems = state.cartItems.filter(item => item.id !== itemId);
				return;
			}

			state.cartItems[itemIndex].quantity--;
		},
	},
});

//kreator akcji - wykonuje sie dopiero ,jak zostanie cos wykonane

export const sendCartData = cartData => {
	return async dispatch => {
		dispatch(
			cartActions.showNotification({
				status: "pending",
				title: "Sending",
				message: "Application is datas sending",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				"https://react-food-app-cffd3-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(cartData),
				}
			);
			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}
		};

		try {
			await sendRequest();

			dispatch(
				cartActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Cart has been updated",
				})
			);
		} catch (error) {
			dispatch(
				cartActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Cart has not been updated",
				})
			);
		}
	};
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
