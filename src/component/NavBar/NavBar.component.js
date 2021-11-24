import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import CurrencyMenu from '../CurrencyMenu';
import StoreLogo from '../../assets/store-logo.png';
import CategoryList from '../CategoryList';
import './NavBar.style.css';
import CartMenu from '../CartMenu';

class NavBar extends Component {
	static propTypes = {
		categories: PropTypes.array.isRequired,
		currencies: PropTypes.array.isRequired,
	};

	render() {
		const { categories, currencies } = this.props;
		return (
			<div id='NavBarSpaceHolder'>
				<div id='NavBar'>
					<CategoryList categories={categories} />
					<NavLink id='Logo' to='/'>
						<img src={StoreLogo} alt='Store Logo' />
					</NavLink>
					<div id='NavBarActions'>
						<CurrencyMenu currencies={currencies} />
						<CartMenu />
					</div>
				</div >
			</div>
		);
	}
}

export default withRouter(NavBar);
