import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
	isShowCart: false,
	totalQuantity: 0,
	notification: null,
	changed: false,
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
			state.cartItems = action.payload.cartItems;
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
			let itemIndex;
			if (state.cartItems) {
				itemIndex = state.cartItems.findIndex(item => item.id === itemId);
			} else {
				state.cartItems = [];
			}
			state.changed = true;
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
			state.changed = true;

			if (itemQuantity === 1) {
				state.cartItems = state.cartItems.filter(item => item.id !== itemId);
				return;
			}

			state.cartItems[itemIndex].quantity--;
		},
	},
});

//kreator akcji - wykonuje sie dopiero ,jak zostanie cos wykonane

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
