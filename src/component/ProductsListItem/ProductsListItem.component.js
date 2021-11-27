import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCartWhite from '../../assets/shopping-cart-white.png';
import { addToCart } from '../../store/cart';
import PriceTag from '../PriceTag';
import './ProductsListItem.style.css';

class ProductsListItem extends Component {
	cartButtonOnClick = (event) => {
		event.stopPropagation();
		event.preventDefault();
		const { product, addToCart } = this.props;
		const { attributes, ...rest } = product;
		const selectedAttributes = Object.values(attributes)
			.reduce((reducedObj, { id, name, type, items }) => {
				return { ...reducedObj, [id]: { name, type, ...items[0] } };
			}, {});
		console.log({ ...rest, attributes: selectedAttributes });
		addToCart({ ...rest, attributes: selectedAttributes });
	};

	render() {
		const { product } = this.props;
		const { id, name, inStock, gallery, brand, prices } = product;

		return (
			<Link id='ProductsListItem' to={'/products/' + id} >
				<div id='Stack'>
					<img src={gallery[0]} alt='First' />
					<div id={inStock ? 'Deactivate' : 'OutOfStockOverlay'}>out of stock</div>
					<button
						id='AddToCart'
						disabled={!inStock}
						onClick={this.cartButtonOnClick.bind(this)}
					>
						<img src={ShoppingCartWhite} alt='Cart' />
					</button>
				</div>
				<div id='ProductProperties' className={inStock ? 'InStock' : 'OutOfStock'}>
					<h2 id='Name'>{name} {brand}</h2>
					<PriceTag prices={prices} />
				</div>
			</Link>
		);
	}
}

const mapDispatchToProps = { addToCart };

export default connect(null, mapDispatchToProps)(ProductsListItem);
