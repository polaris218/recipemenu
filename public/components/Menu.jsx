import React, { Component, PropTypes } from 'react';

import { MAP_CONSTANTS } from  '../shared/mapping.utils';
import MenuCategory from './MenuCategory';

class Menu extends Component {
	render() {
		const { id, title, ownProps } = this.props;

		console.log(this.props);

		const currency = (ownProps.currencies && ownProps.currencies.length > 0) ? ownProps.currencies : null;
		const symbol = (currency && currency.Currency) ? currency.Currency : MAP_CONSTANTS.DEFAULT_LANGUAGE_SYMBOL;

		const menu = ownProps;//(ownProps.menu) ? ownProps.menu : ownProps;
		const finalTitle = (menu) ? (menu.Title || menu.title) : null;
		const finalPrice = (menu) ? (menu.Price || menu.price) : null;
		const finalDescription = (menu) ? (menu.Description || menu.description) : null;

		const categoryComponents = (menu && menu.categories && menu.categories.length > 0) ? menu.categories.map((cat, index) => {
			const categoryDesc = (cat.Category) ? cat.Category.Description : cat.description;
			const categoryTitle = (cat.Category) ? cat.Category.Title : cat.title;
			return <MenuCategory 
				id={cat.MenuCategoryID || cat.catId} 
				isCustom={cat.IsCustom || cat.isCustom} 
				title={categoryTitle} 
				description={categoryDesc} 
				meals={cat.meals} 
				symbol={symbol} 
				key={index} />;
		}) : null;

		return (
			<div className="content--container">
                <div className="food-menu">
	                {ownProps && finalTitle &&
	                    <h3 className="food-menu--title">{finalTitle}</h3>
	                }
                    {ownProps && finalDescription &&
	                    <p className="food-menu--description">{finalDescription}</p>
	                }

	                {ownProps && finalPrice && finalPrice > 0 &&
	                	<p className="food-menu--price">{symbol} {finalPrice}</p>
	                }

	                {categoryComponents}

                </div>
            </div>
		)
	}
};

Menu.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	ownProps: PropTypes.object
};

export default Menu;