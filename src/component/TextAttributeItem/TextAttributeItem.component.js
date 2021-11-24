import React, { Component } from 'react';
import './TextAttributeItem.style.css';

class TextItem extends Component {
	render() {
		const { text, checked } = this.props;
		return (
			<div id={checked ? 'SelectedTextItem' : 'TextItem'}>{text}</div >
		);
	}
}

export default TextItem;
