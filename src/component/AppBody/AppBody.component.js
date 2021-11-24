import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import ProductsList from '../../route/ProductsList';
import Product from '../../route/Product';
import Cart from '../../route/Cart';
import './AppBody.style.css';

class AppBody extends Component {

	static propTypes = {
		overlay: PropTypes.bool,
		categoryRoutes: PropTypes.array.isRequired,
	};

	render() {
		const { overlay, categoryRoutes } = this.props;
		const navCategories = categoryRoutes.map((name, index) => {
			return (
				<Route key={index} path={'/' + name}>
					<ProductsList category={name} />
				</Route>
			);
		});

		return (
			<div id='AppBody'>
				<div id={overlay ? 'BodyOverlay' : 'Deactivate'} />
				<Switch>
					<Route exact path='/'>
						<ProductsList category={categoryRoutes[0]} />
					</Route>
					{navCategories}
					<Route path='/cart'>
						<Cart />
					</Route>
					<Route path='/products/:product_id'>
						<Product />
					</Route>
				</Switch >
			</div>
		);
	}
}

const mapStoreStateToProps = ({ bodyOverlay }, prop) => {
	return { overlay: bodyOverlay.overlay };
};

export default connect(mapStoreStateToProps)(AppBody);
