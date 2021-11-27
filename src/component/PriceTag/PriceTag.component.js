import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PriceTag.css';

class PriceTag extends Component {

	getCurrencySign = (selectedCurrency) => {
		if (!selectedCurrency) return '';
		let sign = new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: selectedCurrency
		}).format(0).split('0');
		return sign[sign.length - 1];
	};

	render() {
		const { selectedCurrency, cartTotalPrice, prices, total } = this.props;
		const sign = this.getCurrencySign(selectedCurrency);

		let price = total ? cartTotalPrice[selectedCurrency] : prices[selectedCurrency];
		if (!price) price = 0;
		price = Math.round((price + Number.EPSILON) * 100) / 100;

		return (
			<div id='PriceTag'>
				{sign + price}
			</div>
		);
	}
}

const mapStoreStateToProps = ({ currency, cart }, props) => {
	return {
		cartTotalPrice: cart.totalPrice,
		selectedCurrency: currency.selectedCurrency,
	};
};

export default connect(mapStoreStateToProps)(PriceTag);
