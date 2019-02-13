import React, { Component, PropTypes } from 'react';

import MenuCategory from './MenuCategory';

class MenuCategories extends Component {
	render() {
		const { categories } = this.props;

		const categoriesComponent = (categories.length > 0) ? categories.map((category, index) => {
			return <MenuCategory id={category.id}, isCustom={category.isCustom}, title={category.title}, description={category.description}, meals={category.meals} key={index} />;
		}): null;

		return (
			<div>
				<h3 className="asset--title">Categories</h3>
                {categoriesComponent}
            </div>
		)
	}
};

MenuCategories.propTypes = {
	categories: PropTypes.array
};

export default MenuCategories;