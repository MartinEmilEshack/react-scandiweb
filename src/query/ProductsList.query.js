import { Query, Field, client } from '@tilework/opus';

export const getAPIProductsList = (category) => {
	const productsQuery = new Query('category')
		.addArgument('input', 'CategoryInput', { title: category })
		.addField('name')
		.addField(new Field('products')
			.addFieldList(['id', 'name', 'inStock', 'gallery'])
			.addField(new Field('prices').addFieldList(['currency', 'amount']))
		);
	client.setEndpoint('http://localhost:4000/');
	return client.post(productsQuery);
};
