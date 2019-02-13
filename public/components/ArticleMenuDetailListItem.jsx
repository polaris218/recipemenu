import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router-dom';
import ArticleMenuDetailListItemMeal from './ArticleMenuDetailListItemMeal';

class ArticleMenuDetailListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		const { nbItems, category, currency, language } = this.props;

    console.log(category);
    console.log(language);

    const mealsComponent = (category && category.meals && category.meals.length > 0) ? category.meals.map((meal, index) => {
      return <ArticleMenuDetailListItemMeal meal={meal} currency={currency} currentLanguage={language} index={index} key={index} />
    }) : null;

    const widthStyle = (100 / nbItems) + '%';

		return (
      <article className="menu--category" style={{width: widthStyle}}>
        {mealsComponent}
      </article>
    )
	}
};

ArticleMenuDetailListItem.propTypes = {
  nbItems: PropTypes.number,
	category: PropTypes.object,
  currency: PropTypes.object,
  language: PropTypes.object
};

export default ArticleMenuDetailListItem;