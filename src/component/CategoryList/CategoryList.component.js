import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './CategoryList.style.css';

class CategoryList extends Component {
	render() {
		const { categories, location: { pathname } } = this.props;
		const navCategories = categories.map((category, index) => {
			const selected = (pathname === '/' + category) || (!index && pathname === '/');
			return (
				<li key={index}>
					<NavLink to={'/' + category}
						id={selected ? 'SelectedCategorey' : 'Category'}
					>
						{category}
					</NavLink>
					<div id={selected ? 'CategoryLine' : 'Deactivate'} />
				</li >
			);
		});

		return <ul id='CategoryList'>{navCategories}</ul>;
	}
}

export default withRouter(CategoryList);
