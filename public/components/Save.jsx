import React, { Component, PropTypes } from 'react';

import { Redirect, Route } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

let createHandlers = (ctx) => {
	let onMenuSaved = (obj) => {
		console.log('menu saved!');
		console.log(obj);

		ctx.props.dispatch(actionCreators.setMenu({}));

		ctx.setState({
			isSaved: true,
			component: {
				type: 'menu',
				obj: obj
			}
		});
	};

	let validateState = (menu, cb) => {
		console.log(menu);

		let errors = [];

		if (!menu.title && !menu.Title) {
			errors.push({
				name: 'title',
				message: 'Menu Title is required.'
			});
		}

		if (!menu.description && !menu.Description) {
			errors.push({
				name: 'description',
				message: 'Menu Description is required.'
			});
		}

		if (!menu.price && !menu.Price) {
			errors.push({
				name: 'price',
				message: 'Menu Price is required.'
			});
		}

		/*
		if (!menu.branches || menu.branches.length <= 0) {
			errors.push({
				name: 'branches',
				message: 'Please choose at least one Branch for your menu.'
			});
		}
		*/

		if (!menu.languages || menu.languages.length <= 0) {
			errors.push({
				name: 'languages',
				message: 'Please choose at least one translation Language for your menu.'
			});
		}

		if (!menu.categories || menu.categories.length <= 0) {
			errors.push({
				name: 'categories',
				message: 'Please choose at least one Menu Category for your menu.'
			});
		}

		if (menu.categories && menu.categories.length > 0) {
			let meals = menu.categories.reduce((acc, cat) => {
				return acc.concat(cat.meals);
			}, []);

			let noMeals = menu.categories.find((cat) => {
				return !cat.meals || !cat.meals.length
			}, []);

			if (noMeals) {
				errors.push({
					name: 'meals',
					message: 'Please choose at least one Meal for each Menu Category for your menu.'
				});
			} else if (!meals || meals.length <= 0) {
				errors.push({
					name: 'meals',
					message: 'Please choose at least one Meal for each Menu Category for your menu.'
				});
			}

			if (meals && meals.length > 0) {
				let mealProps = meals.find(meal => {
					return !meal.Title || !meal.Price;
				});

				if (mealProps) {
					errors.push({
						name: 'mealProps',
						message: 'Please fill all the fields for each new meal.'
					});
				}
			}
		}

		ctx.setState({
			validationErrors: errors,
			isValid: !errors.length
		}, () => {
			if (cb && typeof cb === 'function') {
				cb();
			}
		});
	};

	let onSave = (props) => {
		validateState(ctx.props.menu, () => {
			if (ctx.state.isValid) {
				console.log('should save the object here');

				switch (props.type) {
					case 'menu':
						ctx.props.dispatch(actionCreators.saveMenu(props.component, onMenuSaved));
					default:

				}
			}
		});
	};

	return {
		validateState,
		onSave,
		onMenuSaved
	};
};

class Save extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSaved: false,
			validationErrors: [],
			isValid: true,
			component: {}
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {

	}

	render() {
		const { type, component } = this.props;

		console.log(this.props);

		const saveComponent = (this.state.isSaved)
			? (
				<Redirect to={{
					pathname: '/translate/' + type,
					state: { component: this.state.component }
				}} />
			) : ((this.state.isValid) ? (
				<div className="profile-save">
					<button id="menu-save" onClick={(e) => this.handlers.onSave(this.props)}>Save Menu Changes</button>
				</div>
			) : (
					<div className="profile-save">
						<button id="menu-save" onClick={(e) => this.handlers.onSave(this.props)}>Save Menu Changes</button>
						<div className="error">
							Please check that all the fields are filled before saving your menu (Category, Meal, etc...).
			            </div>
					</div>
				)
			);

		return saveComponent;
	}
};

Save.propTypes = {
	type: PropTypes.string,
	component: PropTypes.object
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		menu: state._menu.menu
	}
};

export default connect(mapStateToProps)(Save);