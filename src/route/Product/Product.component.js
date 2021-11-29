import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import ProductAttribute from '../../component/ProductAttribute';
import ProductGallery from '../../component/ProductGallery';
import PriceTag from '../../component/PriceTag';
import { getAPIProduct } from '../../query/Product.query';
import { addToCart } from '../../store/cart';
import './Product.style.css';


class Product extends Component {
	_isMounted = false;
	state = { product: null, selectedAttributes: {} };

	componentDidMount() {
		this._isMounted = true;
		const product_id = this.props.match.params.product_id;
		getAPIProduct(product_id).then((result) => {
			if (this._isMounted) {
				const { prices, ...modifiedProduct } = result['product'];
				const pricesObj = this.pricesToObject(prices);
				this.setState(() =>
					({ product: { ...modifiedProduct, prices: pricesObj } }));
			}
		});
	}

	componentWillUnmount() { this._isMounted = false; }

	pricesToObject = (prices) => {
		return prices.reduce((reducedObj, price) => {
			return { ...reducedObj, [price.currency]: price.amount };
		}, {});
	};

	setAttributes = (id, value) => {
		this.setState((prevState) => {
			const attributes = { ...prevState.selectedAttributes, [id]: value };
			return { selectedAttributes: attributes };
		});
	};

	addProductToCart = () => {
		const { addToCart } = this.props;
		const {
			product: { id, name, brand, gallery, prices, },
			selectedAttributes: attributes
		} = this.state;
		addToCart({ id, name, brand, gallery, prices, attributes });
	};

	render() {
		const { product, selectedAttributes } = this.state;

		if (product === null) return <div>Loading Product...</div>;

		const attributes = product.attributes.map((attribute) => {
			return (
				<ProductAttribute
					key={attribute.id}
					attribute={attribute}
					selectedAttributes={selectedAttributes}
					onAttributeChange={this.setAttributes.bind(this)}
				/>
			);
		});

		return (
			<div id='Product'>
				<ProductGallery gallery={product.gallery} />
				<div id="ProductDescription">
					<div id='NameCard'>
						<h1>{product.name}</h1>
						<h2>{product.brand}</h2>
					</div>
					{attributes}
					<div id='Price'>
						<h3>price:</h3>
						<PriceTag prices={product.prices} />
					</div>
					<button
						disabled={!product.inStock}
						onClick={this.addProductToCart.bind(this)}
					>{product.inStock ? 'add to cart' : 'out of stock'}</button>
					<div id='Description'>{parse(product.description)}</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = { addToCart };

export default withRouter(connect(null, mapDispatchToProps)(Product));
