import { createSlice } from "@reduxjs/toolkit";
import { _setBodyOverlay } from "./bodyOverlay.actions";

const bodyOverlay = createSlice({
	name: 'bodyOverlay',
	initialState: { overlay: false, },
	reducers: { setBodyOverlay: _setBodyOverlay, }
});

export const { setBodyOverlay } = bodyOverlay.actions;
export default bodyOverlay.reducer;