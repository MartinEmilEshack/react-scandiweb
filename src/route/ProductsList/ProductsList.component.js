import React, { Component } from 'react';
import ProductsListItem from '../../component/ProductsListItem';
import { getAPIProductsList } from '../../query/ProductsList.query';
import './ProductsList.style.css';

class ProductsList extends Component {
	_isMounted = false;
	state = { products: [] };

	componentDidMount() {
		const { category } = this.props;
		this._isMounted = true;
		getAPIProductsList(category).then((results) => {
			if (this._isMounted) this.setState(() => {
				return { products: results.category.products };
			});
		});
	}

	componentWillUnmount() { this._isMounted = false; }

	pricesToObject = (prices) => {
		return prices.reduce((reducedObj, price) => {
			return { ...reducedObj, [price.currency]: price.amount };
		}, {});
	};

	productsMapping = (products) => {
		return products.map((product, index) => {
			const { prices, ...modifiedProduct } = product;
			const pricesObj = this.pricesToObject(prices);
			return (
				<ProductsListItem
					key={index}
					product={{ ...modifiedProduct, prices: pricesObj }}
				/>
			);
		});
	};

	render() {
		const { products } = this.state;
		const { category } = this.props;

		const productsList = products.length ?
			this.productsMapping(products) : <p>No Products</p>;

		return (
			<div id='ProductsPage'>
				<h1>{category}</h1>
				<div id='ProductsList'>
					{productsList}
				</div>
			</div>
		);
	}
}

export default ProductsList;
