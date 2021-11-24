import React, { Component } from 'react';
import CartGalleryArrow from '../../assets/cart-gallery-arrow.png';
import './CartItemGallery.style.css';

class CartItemGallery extends Component {

	state = { index: 0 };

	previousImage = () => {
		const { gallery } = this.props;
		this.setState(({ index }) => {
			return { index: index - 1 > -1 ? --index : gallery.length - 1 };
		});
	};

	nextImage = () => {
		const { gallery } = this.props;
		this.setState(({ index }) => {
			return { index: gallery.length > index + 1 ? ++index : 0 };
		});
	};

	render() {
		const { gallery } = this.props;
		const { index } = this.state;

		return (
			<div id='CartItemGallery'>
				<div id='ImagePreview'><img src={gallery[index]} alt='Previewed' /></div>
				<button
					id='Left'
					disabled={gallery.length === 1}
					onClick={this.previousImage.bind(this)}
				><img src={CartGalleryArrow} alt='Left Arrow' /></button>
				<button
					id='Right'
					disabled={gallery.length === 1}
					onClick={this.nextImage.bind(this)}
				><img src={CartGalleryArrow} alt='Right Arrow' /></button>
			</div>
		);
	}
}

export default CartItemGallery;