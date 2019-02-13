import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import BranchImageEdit from './BranchImageEdit';

let createHandlers = (ctx) => {
	let handleSubmit = (e, props) => {
		if (props.onUploadSubmit) {
			props.onUploadSubmit({
				file: ctx.state.file,
				url: ctx.state.imagePreviewUrl
			});
		}

		if (props.onChanges) {
			props.onChanges('images', {data: ctx.state.allImages})
		}
	};

	let handleImageChange = (e, props) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			ctx.setState((prevState) => {
				let nextID = 879237;
				if (prevState.allImages.length > 0) {
					nextID = parseInt(prevState.allImages[prevState.allImages.length - 1].id, 10) + 1;
				}

				let images = prevState.allImages;
				images.push({
					id: nextID,
					imgPath: reader.result,
					newlyAdded: true,
					file: file,
					caption: ''
				});

				return {
					file: file,
					imagePreviewUrl: reader.result,
					allImages: images
				}
			});

			handleSubmit(e, props);
		};

		reader.readAsDataURL(file);
	};

	let onImageRemove = (obj) => {
		ctx.setState((prevState) => {
			let images = prevState.allImages.reduce((acc, current) => {
				return (current.id !== obj.id) ? acc.concat([current]) : acc;
			}, []);

			console.log(prevState.allImages);

			console.log(images);
			ctx.props.onChanges('images', {data: images})
			return {
				allImages: images
			}
		});
		
	};

	return {
		handleSubmit,
		handleImageChange,
		onImageRemove
	};
};

class ImageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imagePreviewUrl: '',
			allImages: props.images
		};
		this.handlers = createHandlers(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.state.allImages.length !== nextState.allImages.length)
			|| (this.state.imagePreviewUrl !== nextState.imagePreviewUrl);
	}

	render() {
		const { onUploadSubmit, onChange, images } = this.props;

		console.log(this.state);

		const imageComponents = (this.state.allImages.length > 0) ? this.state.allImages.map((image, index) => {
			return <BranchImageEdit id={image.id} newlyAdded={image.newlyAdded} imgPath={image.imgPath} altDesc={image.altDesc} onRemove={this.handlers.onImageRemove} key={index} />
		}) : '';

		return (
			<div>
				<ul>
					{imageComponents}
				</ul>
				<div id="image-add" className="image--add">
					<div className="add-item dashed">
						<input className="input--edit-file" type="file" onChange={(e) => this.handlers.handleImageChange(e, this.props)} name="branch-upload-image" />
					</div>
				</div>
			</div>
		);
	}
};

ImageUpload.propTypes = {
	onUploadSubmit: PropTypes.func,
	onChange: PropTypes.func,
	images: PropTypes.array
};

export default ImageUpload;