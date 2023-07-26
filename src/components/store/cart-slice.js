import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
	isShowCart: false,
	totalQuantity: 3,
	cartItems: [
		{ id: "i1", title: "Parrot", quantity: 1, total: 6, price: 6 },
		{ id: "i2", title: "Stone", quantity: 2, total: 4, price: 2 },
	],
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

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
