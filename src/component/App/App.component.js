import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppBody from '../AppBody';
import NavBar from '../NavBar';
import { store } from '../../store/store';
import { getAPICategoriesAndCurrencies } from '../../query/Categories_Currencies.query';
import './App.style.css';


class App extends Component {
	_isMounted = false;
	state = { categories: [], currencies: [], };

	componentDidMount() {
		this._isMounted = true;
		getAPICategoriesAndCurrencies().then((results) => {
			if (this._isMounted)
				this.setState(() => ({
					categories: results['categories'].map((value) => value.name),
					currencies: results['currencies'],
				}));
		});
	}

	componentWillUnmount() { this._isMounted = false; }

	render() {
		const { categories, currencies } = this.state;
		const view = categories.length ? (
			<div id='App' >
				<NavBar categories={categories} currencies={currencies} />
				<AppBody categoryRoutes={categories} />
			</div>
		) : <p id='App'>Loading...</p>;

		return (
			<Provider store={store}>
				<BrowserRouter>
					{view}
				</BrowserRouter>
			</Provider >
		);
	}
};

export default App;