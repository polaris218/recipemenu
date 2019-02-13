import React, { Component, PropTypes } from 'react';

import Meal from './Meal';

class MenuCategory extends Component {
	render() {
		const { id, isCustom, title, description, symbol, meals } = this.props;

		console.log(this.props);

		const mealComponents = (meals && meals.length > 0) ? meals.map((meal, index) => {
			return <Meal
				id={meal.MealID || meal.id}
				title={meal.Title || meal.title}
				description={meal.Description || meal.description}
				price={meal.Price || meal.price}
				symbol={symbol}
				enableDetails={!!meal.EnableDetails || !!meal.enableDetails}
				detail={meal.MealDetail || meal.mealDetail}
				key={index} />;
		}) : '';

		return (
			<div className="food-menu--part">
                <h4 className="food-menu--subtitle">{title}</h4>
                <div className="food-menu--separator"></div>
                <div className="food-menu--meal">
                	{mealComponents}
                </div>
            </div>
		)
	}
};

MenuCategory.propTypes = {
	id: PropTypes.number,
	isCustom: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	symbol: PropTypes.string,
	meals: PropTypes.array
};

export default MenuCategory;