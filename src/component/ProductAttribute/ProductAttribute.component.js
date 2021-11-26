import React, { Component } from 'react';
import './ProductAttribute.style.css';
import SwatchItem from '../SwatchAttributeItem';
import TextItem from '../TextAttributeItem';

class ProductAttribute extends Component {

	componentDidMount() {
		const { onAttributeChange, attribute: { id, name, type, items } } = this.props;
		const { id: itemID, value, displayValue } = items[0];
		onAttributeChange(id, { name, type, id: itemID, value, displayValue });
	}

	getAttributeChoices = () => {
		const {
			attribute: { id, type, name, items },
			onAttributeChange,
			selectedAttributes,
		} = this.props;

		return items.map(({ id: itemID, value, displayValue }, index) => {
			const checked =
				Object.keys(selectedAttributes).length !== 0 &&
				selectedAttributes[id].id === itemID;

			let choiceItem = null;
			if (type === 'text')
				choiceItem = <TextItem text={value} checked={checked} />;
			else if (type === 'swatch')
				choiceItem = <SwatchItem color={value} text={displayValue} checked={checked} />;

			return (
				<div
					key={index}
					id='ChoiceItem'
					onClick={() => onAttributeChange(id, { name, type, id: itemID, value, displayValue })}
				>{choiceItem}</div>
			);
		});
	};

	render() {
		const { attribute: { name } } = this.props;

		const choices = this.getAttributeChoices();

		return (
			<div id='ProductAttribute' >
				<h1>{name}:</h1>
				<div id='Choices'>
					{choices}
				</div>
			</div>
		);
	}
}

export default ProductAttribute;
