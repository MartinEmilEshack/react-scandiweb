import React, { Component } from 'react';
import './ProductGallery.style.css';

class ProductGallery extends Component {
	state = { previewedImage: 0 };

	hideBrokenImages = (event) => {
		event.currentTarget.parentNode.style.display = 'none';
	};

	changePreviewedImage = (index) => {
		this.setState({ previewedImage: index });
	};

	getGalleryList = (gallery) => {
		return gallery.map((imageURL, index) => {
			return (
				<div key={index} id='GalleryImage'>
					<img
						src={imageURL}
						alt={`Product ${index}`}
						onError={this.hideBrokenImages}
						onMouseOver={() => this.changePreviewedImage(index)}
					/>
				</div>
			);
		});
	};

	render() {
		const { gallery } = this.props;
		const { previewedImage } = this.state;

		const galleryList = this.getGalleryList(gallery);

		return (
			<div id='ProductGallery' >
				<div id='GalleryList'>
					{galleryList}
				</div>
				<div id='GalleryPreview'>
					<img src={gallery[previewedImage]} alt='Previewed' />
				</div>
			</div>
		);
	}
}

export default ProductGallery;
