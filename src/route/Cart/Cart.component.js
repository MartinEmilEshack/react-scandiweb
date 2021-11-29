import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from '../../component/CartItem';
import PriceTag from '../../component/PriceTag';
import { checkoutItems } from '../../query/CheckoutItems.query';
import './Cart.style.css';

class Cart extends Component {
	render() {
		const { items, itemsCount } = this.props;

		const noItems = itemsCount === 0;
		const cartItems = items.map((item, index) => {
			return (
				<div key={index} id='CartItemWrapper'>
					<hr />
					<CartItem item={item} />
				</div>
			);
		});

		return (
			<div id='Cart'>
				<h1>Cart</h1>
				<h2 id={noItems ? 'NoItems' : 'Deactivate'}>No<br />Shopping Items</h2>
				{cartItems}
				<hr />
				<div id='TotalPrice'>
					<h2>Total:</h2>
					<PriceTag total />
					<button
						id='Checkout'
						disabled={noItems}
						onClick={() => checkoutItems(items)}
					>checkout</button>
				</div>
			</div>
		);
	}
}

const mapStoreStateToProps = ({ cart }, props) => {
	return { items: cart.items, itemsCount: cart.itemsCount };
};

export default connect(mapStoreStateToProps)(Cart);
