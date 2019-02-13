import React, { Component, PropTypes } from 'react';

import * as DomUtils from '../shared/dom.utils';

import BranchCuisineEdit from './BranchCuisineEdit';
import LanguagePicker from './LanguagePicker';

let createHandlers = (ctx) => {
	let onAdd = (obj) => {
		ctx.setState((prevState) => {
			let cuisines = prevState.allCuisines;

			let newCuisine = ctx.props.availableCuisines.find(cuisine => {
				return cuisine.CuisineID === obj.id;
			});

			if (newCuisine) {
				cuisines.push(newCuisine);
			}

			ctx.props.onChange('cuisines', {data: cuisines});

			return {
				allCuisines: cuisines
			}
		});
		// actually add that thing to the global store
	};

	let onRemove = (obj) => {
		ctx.setState((prevState) => {
			let cuisines = prevState.allCuisines.reduce((acc, current) => {
				return (current.CuisineID !== obj.id) ? acc.concat([current]) : acc;
			}, []);

			console.log(prevState.allCuisines);

			console.log(cuisines);

			ctx.props.onChange('cuisines', {data: cuisines});

			return {
				allCuisines: cuisines
			}
		});
	};

	let onPickerClick = (e) => {
		DomUtils.toggleClass(e.target, 'active');
	};

	let onPickerBlur = (e) => {
		let select = e.target.querySelector('.select--styled.active');
		if (select) {
			DomUtils.toggleClass(select, 'active');
		}
	};

	let onPickerItemClick = (e) => {
		// Change UI
		let rel = e.target.getAttribute('rel');
		let text = e.target.textContent;
		let id = parseInt(e.target.getAttribute('data-id'), 10);
		let target = e.target.parentNode.previousElementSibling;
		target.setAttribute('data-rel', rel);

		let isItemAlreadyAdded = !!ctx.state.allCuisines.find(cuisine => {
			return cuisine.CuisineID === id;
		});

		// If item has not been added yet, add it
		if (!isItemAlreadyAdded) {
			target.textContent = text;
			DomUtils.toggleClass(target, 'active');

			// Then add the new cuisine
			onAdd({
				id,
				rel,
				title: text
			});
		}
	};

	return {
		onAdd,
		onPickerBlur,
		onRemove,
		onPickerClick,
		onPickerItemClick
	};
};

class BranchCuisinesEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCuisines: props.cuisines
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const { cuisines, availableCuisines, onChange } = this.props;

		console.log(cuisines);
		console.log(availableCuisines);

		// List of all cuisines availables is to retrieved dynamically from db
		const obj = {
			type: "cuisines",
			items: availableCuisines
		};

		console.log(this.state);

		const cuisineComponents = (this.state.allCuisines && this.state.allCuisines.length > 0) ? this.state.allCuisines.map((cuisine, index) => {
			return (index < this.state.allCuisines.length - 1)
				? (
					<span key={cuisine.CuisineID}>
						<BranchCuisineEdit id={cuisine.CuisineID} description={cuisine.Description} title={cuisine.Title} onRemove={(e) => this.handlers.onRemove({id: cuisine.CuisineID})} />
						,&nbsp;
					</span>
				) : (
					<span key={cuisine.CuisineID}>
						<BranchCuisineEdit id={cuisine.CuisineID} description={cuisine.Description} title={cuisine.Title} onRemove={(e) => this.handlers.onRemove({id: cuisine.CuisineID})} />
					</span>
				)
		}) : null;

		return (
			<div>
				{cuisineComponents}

				<div id="language-add" className="language--add">
					<label>Add a Cuisine:</label>
					<div id="cuisine-picker" className="language--picker">
						<LanguagePicker data={obj} onAdd={this.handlers.onAdd} onPickerBlur={this.handlers.onPickerBlur} onPickerClick={this.handlers.onPickerClick} onPickerItemClick={this.handlers.onPickerItemClick} />
                    </div>
				</div>
			</div>
		)
	}
};

BranchCuisinesEdit.propTypes = {
	cuisines: PropTypes.array,
	availableCuisines: PropTypes.array,
	onChange: PropTypes.func
};

export default BranchCuisinesEdit;