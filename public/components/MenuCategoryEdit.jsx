import React, { Component, PropTypes } from 'react';

import * as DomUtils from '../shared/dom.utils';
const classNames = require('classnames');

import MealsEdit from './MealsEdit';
import LanguagePicker from './LanguagePicker';

let createHandlers = (ctx) => {
	let headerOnClick = () => {
    	ctx.setState((prevState) => {
			return {
				expanded: !prevState.expanded
			};
		});
  	};

  	let onCategoryRemove = (obj, fn) => {
		ctx.setState({
			removed: true
		});
		// actually remove that thing from the global store
		if (typeof fn === 'function') {
			fn(obj);
		}
	};

	let onAdd = (obj) => {
		console.log(obj);
		ctx.setState((prevState) => {
			console.log(prevState);
			let cat = {
				oldId: prevState.category.id,
				id: obj.id,
				title: obj.name
			};
			// actually add that thing to the global store
			ctx.props.onChange(cat);

			return {
				category: cat
			};
		});
	};

	let onPickerBlur = (e) => {
		let select = e.target.querySelector('.select--styled.active');
		if (select) {
			DomUtils.toggleClass(select, 'active');
		}
	};

	let onMealsChange = (obj) => {
		let cat = {
			id: obj.catId,
			title: obj.title,
			meals: obj.meals
		};

		ctx.props.onChange(cat);
	};

	let onPickerClick = (e) => {
		DomUtils.toggleClass(e.target, 'active');
	};

	let onPickerItemClick = (e) => {
		// Change UI
		let rel = e.target.getAttribute('rel');
		let text = e.target.textContent;
		//let id = parseInt(e.target.getAttribute('data-id'), 10);
		let id = ctx.props.totalCategories.find((cat) => {
			return cat.Title === text;
		}).CategoryStandardID;
		let target = e.target.parentNode.previousElementSibling;
		target.setAttribute('data-rel', rel);
		target.textContent = text;
		DomUtils.toggleClass(target, 'active');

		console.log(rel, text, id);

		// Then add the new language
		onAdd({
			id,
			rel,
			name: text
		});
	};

	return {
		headerOnClick,
		onCategoryRemove,
		onPickerBlur,
		onAdd,
		onMealsChange,
		onPickerClick,
		onPickerItemClick,
	};
};

class MenuCategoryEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			removed: false,
			expanded: true,
			category: {
				id: this.props.id,
				title: this.props.title
			}
		};
		this.handlers = createHandlers(this);
	}

	componentWillReceiveProps (nextProps, prevProps) {
		if(nextProps !== prevProps) {
			this.setState({category: {
				id: nextProps.id,
				title: nextProps.title
			}})
		}
	}

	render() {
		const { id, isCustom, title, description, meals, categoriesAll, totalCategories, onCategoryRemove, onChange } = this.props;
		
		const stateId = this.state.category.id;
		const stateTitle = this.state.category.title;

		var calCategories = totalCategories ? JSON.parse(JSON.stringify(totalCategories)) : [];

		var find = calCategories.find((cate) => { return cate.CategoryStandardID == stateId; });
		// const availableCategories = calCategories.map((cate, index) => {
		// 	if(find) {
		// 		if(cate.CategoryStandardID == stateId) {
		// 			cate.disabled = true;
		// 		}else {
		// 			cate.disabled = true;
		// 		}
		// 	} else {
		// 		cate.disabled = false;
		// 	}
		// 	return cate;
		// });

		const availableCategories = calCategories.map((cate, index) => {
			var match = (cate.CategoryStandardID == stateId) || !(categoriesAll.find(a=>a.CategoryStandardID == cate.CategoryStandardID))
			cate.disabled = match ? false : true;
			return cate;
		});

		const obj = {
			type: "categories",
			items: availableCategories
		};

		const classes = classNames(
			'branch--contact--header',
			'collapsable',
			(this.state.expanded) ? 'opened' : ''
		);

		

		const mealComponents = (stateId && stateId > 0 && stateId !== 1) ? (
			<MealsEdit meals={meals} category={{id: stateId, title: stateTitle}} onChange={this.handlers.onMealsChange} />
		) : null;

		return (
			<div className="food-menu--part">
        		<h4>
        			Category n°{stateId}
        			<span className="status status--issue remove" onClick={(e) => this.handlers.onCategoryRemove({id: stateId}, onCategoryRemove)}></span>
        		</h4>
        		<div className="content--edit">
	        		<div id="menu-category-add" className="language--add">
						<label>Enter new Category Title:</label>
						<div id="language-picker" className="language--picker">
							<LanguagePicker data={obj} onAdd={this.handlers.onAdd} onPickerBlur={this.handlers.onPickerBlur} onPickerClick={this.handlers.onPickerClick} onPickerItemClick={this.handlers.onPickerItemClick} />
	                    </div>
					</div>
        		</div>
        		<div className="food-menu-meals">
        			<div className="branch--contact aside--section contacts--support">
						<header className={classes} onClick={this.handlers.headerOnClick}>
							<div className="header--title-container">
								<h1 className="aside--title collapsable--title">
									Meals
									{this.state.category.title &&
										' (' + this.state.category.title + ')'
									}
								</h1>
							</div>
						</header>
						<div className="global-padding-wrapper">
							<div className="food-menu--meal">
			                	{mealComponents}
			                </div>
						</div>
					</div>
                </div>
            </div>
		)
	}
};

MenuCategoryEdit.propTypes = {
	id: PropTypes.number,
	isCustom: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	meals: PropTypes.array,
	totalCategories: PropTypes.array,
	onCategoryRemove: PropTypes.func,
	onChange: PropTypes.func
};

export default MenuCategoryEdit;