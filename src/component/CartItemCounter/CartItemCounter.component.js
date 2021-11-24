import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cart';
import { ReactComponent as PlusHorizontalSign } from '../../assets/plus-horizontal-sign.svg';
import { ReactComponent as PlusVerticalSign } from '../../assets/plus-vertical-sign.svg';
import './CartItemCounter.style.css';


class CartItemCounter extends Component {
	render() {
		const { item, addToCart, removeFromCart } = this.props;

		return (
			<div id='CartItemCount'>
				<button onClick={() => addToCart(item)}>
					<PlusVerticalSign id='PlusVerticalSign' />
					<PlusHorizontalSign id='PlusHorizontalSign' />
				</button>
				<div id='Count'>
					{item.count}
				</div>
				<button onClick={() => removeFromCart(item)}>
					<PlusHorizontalSign id='PlusHorizontalSign' />
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = { addToCart, removeFromCart };

export default connect(null, mapDispatchToProps)(CartItemCounter);

