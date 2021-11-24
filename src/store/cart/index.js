import { createSlice } from "@reduxjs/toolkit";
import { _addToCart, _removeFromCart } from "./cart.actions";

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		itemsCount: 0,
		totalPrice: {},
	},
	reducers: {
		addToCart: _addToCart,
		removeFromCart: _removeFromCart,
	}
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;