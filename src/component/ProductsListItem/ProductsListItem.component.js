import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCartWhite from '../../assets/shopping-cart-white.png';
import PriceTag from '../PriceTag';
import './ProductsListItem.style.css';

class ProductsListItem extends Component {
	render() {
		const { product, inCart } = this.props;
		const { id, name, brand, gallery, inStock, prices } = product;

		return (
			<Link id='ProductsListItem' to={'/products/' + id} >
				<div id='Stack'>
					<img src={gallery[0]} alt='First' />
					<div id={inStock ? 'Deactivate' : 'OutOfStockOverlay'}>out of stock</div>
					<img id={inCart ? 'InCart' : 'Deactivate'} src={ShoppingCartWhite} alt='Cart' />
				</div>
				<div id='ProductProperties' className={inStock ? 'InStock' : 'OutOfStock'}>
					<h2 id='Name'>{name} {brand}</h2>
					<PriceTag prices={prices} />
				</div>
			</Link>
		);
	}
}

const mapStoreStateToProps = ({ cart }, props) => {
	return { inCart: cart.items.some((item) => item.id === props.product.id) };
};

export default connect(mapStoreStateToProps)(ProductsListItem);
