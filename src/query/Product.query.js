import { client, Field, Query } from '@tilework/opus';

export const getAPIProduct = (product_id) => {
	const productQuery = new Query('product', false)
		.addArgument('id', 'String!', product_id)
		.addFieldList(['id', 'name', 'inStock', 'gallery', 'description', 'brand'])
		.addField(new Field('prices').addFieldList(['currency', 'amount']))
		.addField(new Field('attributes')
			.addFieldList(['id', 'name', 'type'])
			.addField(new Field('items').addFieldList(['id', 'value', 'displayValue']))
		);
	client.setEndpoint('http://localhost:4000/');
	return client.post(productQuery);
};