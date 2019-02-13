import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleTranslation from './SectionArticleTranslation';

class SectionArticleTranslations extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;

		console.log(component.props);

		const translationsMenu = (component.props.translations && component.props.translations.menus && component.props.translations.menus.length > 0) ? component.props.translations.menus : [];
		const translationsMenuCategories = (component.props.translations && component.props.translations.menuCategories && component.props.translations.menuCategories.length > 0) ? component.props.translations.menuCategories : [];
		const translationsMeals = (component.props.translations && component.props.translations.meals && component.props.translations.meals.length > 0) ? component.props.translations.meals : [];

		const menuComponents = (translationsMenu && translationsMenu.length > 0) ? translationsMenu.map((translation, index) => {
			return <SectionArticleTranslation 
				id={translation.MenuID || translation.id}
				title={translation.Title || translation.title}
				type="menu"
				originalText={translation.OriginalText || translation.originaltext}
				translatedText={translation.Text || translation.text}
				languageName={translation.BranchLanguageName || translation.name}
				propKey={translation.PropKey || translation.propKey}
				status={translation.Status || translation.status}
				key={index} />;
		}) : null;

		const noMenusComponent = (!menuComponents || menuComponents.length <= 0) ? (
			<div className="branch--add">
				<h2 className="no-items--headline">Oh no! It looks like you have no menus translations yet.</h2>
				<Link to="/menus" >
					<div className="add-item dashed">
						<span>Go to your Menus</span>
					</div>
				</Link>
			</div>
		) : null;

		const menuCategoriesComponents = (translationsMenuCategories && translationsMenuCategories.length > 0) ? translationsMenuCategories.map((translation, index) => {
			return <SectionArticleTranslation 
				id={translation.MenuID || translation.id}
				title={translation.Title || translation.title}
				type="menu category"
				originalText={translation.OriginalText || translation.originaltext}
				translatedText={translation.Text || translation.text}
				languageName={translation.BranchLanguageName || translation.name}
				propKey={translation.PropKey || translation.propKey}
				status={translation.Status || translation.status}
				key={index} />;
		}) : null;

		const noMenuCategoriesComponent = (!menuCategoriesComponents || menuCategoriesComponents.length <= 0) ? (
			<div className="branch--add">
				<h2 className="no-items--headline">Oh no! It looks like you have no menu category translations yet.</h2>
				<Link to="/menus" >
					<div className="add-item dashed">
						<span>Go to your Menus</span>
					</div>
				</Link>
			</div>
		) : null;

		const mealsComponents = (translationsMeals && translationsMeals.length > 0) ? translationsMeals.map((translation, index) => {
			return <SectionArticleTranslation 
				id={translation.MenuID || translation.id}
				title={translation.Title || translation.title}
				type="meal"
				originalText={translation.OriginalText || translation.originaltext}
				translatedText={translation.Text || translation.text}
				languageName={translation.BranchLanguageName || translation.name}
				propKey={translation.PropKey || translation.propKey}
				status={translation.Status || translation.status}
				key={index} />;
		}) : null;

		const noMealsComponent = (!mealsComponents || mealsComponents.length <= 0) ? (
			<div className="branch--add">
				<h2 className="no-items--headline">Oh no! It looks like you have no meal translations yet.</h2>
				<Link to="/menus" >
					<div className="add-item dashed">
						<span>Go to your Menus</span>
					</div>
				</Link>
			</div>
		) : null;

		return (
			<article className="content--module module--item-details no-metadata content--branches">
				<div className="content--container global-padding-wrapper branches-container">
					<h2 className="asset--subtitle">
                        Menu {title}
                    </h2>
                    {noMenusComponent}
                    <div className="branches menus">
                    	{menuComponents}
                    </div>
                </div>
                <div className="content--container global-padding-wrapper branches-container">
					<h2 className="asset--subtitle">
                        Menu Categories {title}
                    </h2>
                    {noMenuCategoriesComponent}
                    <div className="branches menus">
                    	{menuCategoriesComponents}
                    </div>
                </div>
                <div className="content--container global-padding-wrapper branches-container">
					<h2 className="asset--subtitle">
                        Meals {title}
                    </h2>
                    {noMealsComponent}
                    <div className="branches menus">
                    	{mealsComponents}
                    </div>
                </div>
			</article>
		)
	}
};

SectionArticleTranslations.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleTranslations;