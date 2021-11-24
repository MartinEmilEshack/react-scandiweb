import { createSlice } from "@reduxjs/toolkit";
import { _setCurrency } from './currency.actions';

const currencySlice = createSlice({
	name: 'currency',
	initialState: {
		selectedCurrency: ''
	},
	reducers: {
		setCurrency: _setCurrency
	}
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;