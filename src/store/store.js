import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currency';
import cartReducer from './cart';
import bodyOverlayReducer from './body_overlay';

export const store = configureStore({
	reducer: {
		currency: currencyReducer,
		cart: cartReducer,
		bodyOverlay: bodyOverlayReducer,
	},
});