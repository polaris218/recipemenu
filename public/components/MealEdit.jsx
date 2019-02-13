import React, { Component, PropTypes } from 'react';

import MealDetail from './MealDetail';
import ImageUpload from './ImageUpload';
let createHandlers = (ctx) => {
	let onRemove = (obj, fn) => {
		ctx.setState({
			removed: true
		});
		// actually remove that thing from the global store
		if (typeof fn === 'function') {
			fn(obj);
		}
	};

	let onChange = (obj, fn) => {
		if (obj.target && obj.key) {
			// actually remove that thing from the global store
			if (typeof fn === 'function') {
				let title = document.querySelector('#meal-id-' + ctx.props.catId + '-' + ctx.props.id + ' #meal-title').value;
				let desc = document.querySelector('#meal-id-' + ctx.props.catId + '-' + ctx.props.id + ' #meal-description').value;
				let price = document.querySelector('#meal-id-' + ctx.props.catId + '-' + ctx.props.id + ' #meal-price').value;
				console.log(ctx.props)
				console.log(title);
				console.log(desc);
				console.log(price);
				console.log(obj)
				let tmp = {
					catId: ctx.props.catId,
					id: ctx.props.id,
					title: title,
					description: desc,
					price: parseFloat(price) || null
				};

				console.log(tmp);

				tmp[obj.key] = obj.target.target.value;
				console.log(tmp);
				fn(tmp);
			}
		}
	};
	let onImageUpload = () => {
		console.log('uploaded image!!');
	};
	return {
		onRemove,
		onImageUpload,
		onChange
	};
};

class MealEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			removed: false
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const { id, catId, title, description, price, images, enableDetails, detail, onRemove, onChange } = this.props;
		let detailComponents = '';

		const allImagesComponent = (
			<ImageUpload onChanges={this.handlers.onChange} onUploadSubmit={this.handlers.onImageUpload} images={[]} />
		);

		if (detail &&Object.keys(detail) && Object.keys(detail).length > 0 && enableDetails) {
			detailComponents = <MealDetail id={detail.id} title={detail.title} description={detail.description} medias={detail.medias} />;
		}


		return (
			<div id={"meal-id-" + catId +'-' + id}>
				<h4 className="meal--edit--title">
					Meal n°{id}
					<span className="status status--issue remove" onClick={(e) => this.handlers.onRemove({id}, onRemove)}></span>
				</h4>
				<div className="content--edit">
		            <div className="edit--block">
	                    <label className="label--edit">Enter new Title:</label>
	                    <input className="input--edit" type="text" name="meal--title" id="meal-title" value={title} onChange={(e) => this.handlers.onChange({target: e, key: 'title'}, onChange)} />
	                </div>
	                <div className="edit--block">
	                    <label className="label--edit">Enter new Description:</label>
	                    <input className="input--edit" type="text" name="meal--description" id="meal-description" value={description} onChange={(e) => this.handlers.onChange({target: e, key: 'description'}, onChange)} />
	                </div>
	                <div className="edit--block">
	                    <label className="label--edit">Enter new Price:</label>
	                    <input className="input--edit" type="text" name="meal--price" id="meal-price" value={price > 0 ? price : ''} onChange={(e) => this.handlers.onChange({target: e, key: 'price'}, onChange)} />
	                </div>
					<div className="branch--images">
						<p className="menu--title">Upload Meal Images</p>
						{allImagesComponent}
					</div>
					
		            {detailComponents}
	            </div>
            </div>
		)
	}
};

MealEdit.propTypes = {
	id: PropTypes.number,
	catId: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	price: PropTypes.number,
	enableDetails: PropTypes.bool,
	detail: PropTypes.object,
	onRemove: PropTypes.func,
	onChange: PropTypes.func
};

export default MealEdit;