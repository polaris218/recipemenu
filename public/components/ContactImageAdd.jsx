import React, { Component, PropTypes } from 'react';

let createHandlers = (ctx) => {
	let handleSubmit = (e, props) => {
		e.preventDefault();
		if (props.onUploadSubmit) {
			props.onUploadSubmit(ctx.state.file);
		}
	};

	let handleImageChange = (e, props) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			ctx.setState((prevState) => {
				if (ctx.props.onChanges && typeof ctx.props.onChanges === 'function') {
					ctx.props.onChanges('contactimage', {
						file: file,
						imagePreviewUrl: reader.result
					});
				}

				return {
					file: file,
					imagePreviewUrl: reader.result
				}
			});
		};

		reader.readAsDataURL(file);
	};

	return {
		handleSubmit,
		handleImageChange
	};
};

class ContactImageAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: '',
			imagePreviewUrl: this.props.imgPath
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const { imgPath, altDesc, onChanges } = this.props;

		const finalImagePath = this.state.imagePreviewUrl || "assets/images/icon-person-add.svg";
		const finalAltDesc = altDesc || "Edit contact image";

		return (
			<div className="contact--add-image">
				<img src={finalImagePath} alt={finalAltDesc} />
				<input className="input--edit-file" type="file" onChange={(e) => this.handlers.handleImageChange(e, this.props)} name="contact-upload-image" />
			</div>
		)
	}
};

ContactImageAdd.propTypes = {
	imgPath: PropTypes.string,
	altDesc: PropTypes.string,
	onChanges: PropTypes.func
};

export default ContactImageAdd;