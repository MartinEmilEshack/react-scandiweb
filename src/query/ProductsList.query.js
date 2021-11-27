import { Query, Field, client } from '@tilework/opus';

export const getAPIProductsList = (category) => {
	const productsQuery = new Query('category')
		.addArgument('input', 'CategoryInput', { title: category })
		.addField('name')
		.addField(new Field('products')
			.addFieldList(['id', 'name', 'inStock', 'gallery', 'brand'])
			.addField(new Field('prices').addFieldList(['currency', 'amount']))
			.addField(new Field('attributes')
				.addFieldList(['id', 'name', 'type'])
				.addField(new Field('items').addFieldList(['id', 'value', 'displayValue']))
			)
		);
	client.setEndpoint('http://localhost:4000/');
	return client.post(productsQuery);
};
