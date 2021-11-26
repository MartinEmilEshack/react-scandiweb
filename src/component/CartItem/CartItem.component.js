import React, { Component } from 'react';
import CartItemCounter from '../CartItemCounter';
import CartItemGallery from '../CartItemGallery';
import PriceTag from '../PriceTag';
import SwatchItem from '../SwatchAttributeItem';
import TextItem from '../TextAttributeItem';
import './CartItem.style.css';

class CartItem extends Component {

	getSelectedAttributes = (attributes) => {
		const attributeValues = Object.values(attributes);
		return attributeValues.map(({ name, type, value, displayValue }, index) => {
			let choiceItem = null;
			if (type === 'text')
				choiceItem = <TextItem text={value} checked />;
			else if (type === 'swatch')
				choiceItem = <SwatchItem color={value} text={displayValue} checked />;

			return (
				<div key={index} id='SelectedAttributes'>
					<h1>{name}:</h1>
					<div id='Item'>{choiceItem}</div>
				</div>
			);
		});
	};

	render() {
		const { item } = this.props;
		const { name, brand, attributes, gallery, prices } = item;

		const selectedAttributes = this.getSelectedAttributes(attributes);

		return (
			<div id='CartItem'>
				<div id='ItemDescription'>
					<div id='NameCard'>
						<h1>{name}</h1>
						<h2>{brand}</h2>
					</div>
					<PriceTag prices={prices} />
					<div id='ItemAttributes'>
						{selectedAttributes}
					</div>
				</div>
				<CartItemCounter item={item} />
				<CartItemGallery gallery={gallery} />
			</div>
		);
	}
}

export default CartItem;