import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/currency';
import './CurrencyMenu.style.css';
import ArrowUp from '../../assets/arrow-up.png';
import ArrowDown from '../../assets/arrow-down.png';

class CurrencyMenu extends Component {

	state = { menuOpen: false };

	componentDidMount() {
		this.props.setCurrency(this.props.currencies[0]);
	};

	changeCurrency = (currency) => {
		this.props.setCurrency(currency);
	};

	getSign = (currency) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency
		}).format(0).split('0')[0];
	};

	render() {
		const { menuOpen } = this.state;
		const { currencies, selectedCurrency } = this.props;

		const selectedSign = selectedCurrency ? this.getSign(selectedCurrency) : '';

		const currencyOptions = currencies.map((currency, index) => {
			const sign = this.getSign(currency);
			return (
				<li key={index} onClick={() => this.changeCurrency(currency)}>
					{sign + ' ' + currency}
				</li>
			);
		});

		return (
			<div id='CurrencyMenu'
				onMouseLeave={() => { this.setState({ menuOpen: false }); }} >
				<button
					id='CurrencySelector'
					onClick={() => { this.setState({ menuOpen: !menuOpen }); }}
				>
					{selectedSign}
					<img src={menuOpen ? ArrowUp : ArrowDown} alt='Arrow' />
				</button>
				{menuOpen ? <ul id='CurrencyList'>{currencyOptions}</ul> : <></>}
			</div>
		);
	}
}

const mapStoreStateToProps = ({ currency }, props) => {
	return { selectedCurrency: currency.selectedCurrency };
};

const mapDispatchToProps = { setCurrency };

export default connect(mapStoreStateToProps, mapDispatchToProps)(CurrencyMenu);
