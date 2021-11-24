export const _addToCart = (state, action) => {
	const { id: _id, attributes: _attributes, prices: _prices } = action.payload;

	const itemIndex = state.items.findIndex(({ id, attributes }) => {
		return (id === _id) &&
			(JSON.stringify(attributes) === JSON.stringify(_attributes));
	});

	if (itemIndex >= 0) state.items[itemIndex].count++;
	else {
		state.items.push({ count: 1, ...action.payload });
		state.itemsCount++;
	}

	const priceKeys = Object.keys(state.totalPrice);
	if (priceKeys.length === 0) state.totalPrice = _prices;
	else priceKeys.forEach((key) => state.totalPrice[key] += _prices[key]);
};

export const _removeFromCart = (state, action) => {
	const { id: _id, attributes: _attributes, prices: _prices } = action.payload;

	const itemIndex = state.items.findIndex(({ id, attributes }) => {
		return (id === _id) &&
			(JSON.stringify(attributes) === JSON.stringify(_attributes));
	});

	if (state.items[itemIndex].count === 1) {
		state.items.splice(itemIndex, 1);
		state.itemsCount--;
	} else state.items[itemIndex].count--;

	const priceKeys = Object.keys(state.totalPrice);
	priceKeys.forEach((key) => state.totalPrice[key] -= _prices[key]);
	if (state.totalPrice[priceKeys[0]] === 0) state.totalPrice = {};
};
