import { client, CombinedField, Query } from '@tilework/opus';

export const getAPICategoriesAndCurrencies = () => {
	const categoriesQuery = new Query('categories', true).addField('name');
	const currenciesQuery = new Query('currencies', true);

	client.setEndpoint('http://localhost:4000/');
	return client.post(new CombinedField()
		.add(categoriesQuery, true)
		.add(currenciesQuery, 'String!', true)
	);
};