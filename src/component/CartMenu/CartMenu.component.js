import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ShoppingCartBlack from '../../assets/shopping-cart-black.png';
import CartItem from '../CartItem';
import PriceTag from '../PriceTag';
import { setBodyOverlay } from '../../store/body_overlay';
import './CartMenu.style.css';

class CartMenu extends Component {
	state = { menuOpen: false };

	switchMenu = (menuOpen) => {
		this.setState(() => ({ menuOpen }));
		this.props.setBodyOverlay(menuOpen);
	};

	render() {
		const { history, items, itemsCount } = this.props;
		const { menuOpen } = this.state;

		const noItems = itemsCount === 0;
		const cartItems = items.map((item, index) => {
			return <CartItem key={index} item={item} />;
		});

		return (
			<div id='CartMenu' onMouseLeave={() => this.switchMenu(false)}>
				<button id='CartMenuButton' onClick={() => this.switchMenu(!menuOpen)}>
					<img src={ShoppingCartBlack} alt='Cart Menu' />
					<div id={noItems ? 'Deactivate' : 'CartMenuCounter'}>
						{itemsCount}
					</div>
				</button >
				<div id={!menuOpen ? 'Deactivate' : 'CartMenuDropdown'}>
					<div id='CartMenuTitle'><b>My Bag</b>, {itemsCount} items</div>
					<div id='CartItems'>{cartItems}</div>
					<div id={noItems ? 'Deactivate' : 'TotalPrice'}>
						<h2>Total</h2>
						<PriceTag total />
					</div>
					<div id='CartMenuButtons'>
						<button id='ViewBag' onClick={() => history.push('/cart')}>
							view bag
						</button>
						<button id='Checkout' disabled={noItems}>checkout</button>
					</div>
				</div>
			</div >
		);
	}
}

const mapStoreStateToProps = ({ cart }, props) => {
	return { items: cart.items, itemsCount: cart.itemsCount };
};

const mapDispatchToProps = { setBodyOverlay };

export default withRouter(connect(mapStoreStateToProps, mapDispatchToProps)(CartMenu));