import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import { MAP_CONSTANTS } from  '../shared/mapping.utils';
const classNames = require('classnames');

import Menu from './Menu';
import SubNav from './SubNav';
import ArticleMenuDetailListItem from './ArticleMenuDetailListItem';

const DEFAULT_LANGUAGE = {
  LanguageID: 23,
  Language: {
    Code: "en",
    CodeFull: "en-GB",
    Flag: {
      FlagID: 23,
      AltDescription: "English",
      Title: "English",
      Path: "https://res.cloudinary.com/one-menu/image/upload/v1509377412/United_Kingdom_vix6gw.svg",
      Date: "2017-10-30T00:00:00.000Z",
      DateUpdated: "2017-07-17T23:00:00.000Z"
    },
    FlagID: 23,
    LanguageID: 23,
    Name: "English",
    Title: "English"
  }
};

let createHandlers = (ctx) => {
	let onNavItemClick = (item) => {
		ctx.setState({
			currentSubNavItem: item.index
		});
	};

	let getTranslatedItems = (lang, translations) => {
		if (!lang || !translations || translations.length <= 0) {
      		return null;
    	}

    	const finalLang = (lang.Language) ? lang.Language : lang;
    	if (finalLang.LanguageID && finalLang.LanguageID === 23) {
			return translations;
		}

    	const langTranslations = translations.filter(t => {
    		console.log(t, finalLang);
      		return (t.BranchLanguageID === finalLang.BranchLanguageID) || (t.BranchLanguageName === finalLang.Title);
    	});

    	return langTranslations;
	};

	let setMenu = (menu, lang) => {
		const getDataToUpdate = (props, language) => {
			const textKey = (language.LanguageID && language.LanguageID === 23) ? 'OriginalText' : 'Text';
			const capitalizeFirstLetter = (str) => {
			    return str.charAt(0).toUpperCase() + str.slice(1);
			};

			const injectWithTranslatedProps = (arr, options) => {
				return arr.map(item => {
					const obj = getTranslatedItems(language, item.translations);
					console.log(obj);
					if (!obj || obj.length <= 0) {
						return item;
					}

					let newProps = {};

					let desc = obj.find(item => item.PropKey === 'description' || item.PropKey === 'Description');
					let title = obj.find(item => item.PropKey === 'title' || item.PropKey === 'Title');

					let propsDesc = (desc) ? desc[textKey] : '';
					let propsTitle = (title) ? title[textKey] : '';

					if (options && options.parent) {
						newProps[options.parent] = {
							Description: propsDesc,
							Title: propsTitle
						};
					} else {
						newProps = {
							Description: propsDesc,
							Title: propsTitle
						};
					}

					if (options && options.key && options.key.length > 0) {
						newProps[options.key] = injectWithTranslatedProps(item[options.key]);
					}

					return Object.assign({}, item, newProps);
				})
			};

			const replaceArray = (arr, translations, key) => {
				if (!translations || translations.length <= 0) {
					return arr;
				}

				return Object.assign(arr, arr.map(item => {
					let mealsObj = {};
					if (item.meals && item.meals.length > 0) {
						mealsObj = {
							meals: item.meals.map(meal => {
								return replaceArray(meal.translations, getTranslatedItems(language, meal.translations), 'MealID');
							})
						};
					}

					console.log(mealsObj);

					const newItem = ['title', 'description'].reduce((acc, propKey) => {
						let obj = {};
						const translation = translations.find(lang => lang.PropKey === propKey);
						console.log(translation);
						if (translation && translation.length > 0 && item[key] === translation[key]) {
							obj[capitalizeFirstLetter(propKey)] = translation[textKey];
						}
						return Object.assign(acc, item, obj);
					}, {});

					return Object.assign(newItem, newItem, mealsObj);
				}));
			};

			// Could use same funciton as newItem = ...
			let obj = getTranslatedItems(language, props.translations);
			console.log(obj);
			if (!obj || obj.length <= 0) {
				return props;
			}

			if (!!obj.find(prop => prop.Status === 'PENDING')) {
				return props;
			}

			let desc = obj.find(item => item.PropKey === 'description' || item.PropKey === 'Description');
			let title = obj.find(item => item.PropKey === 'title' || item.PropKey === 'Title');

			let propsDesc = (desc) ? desc[textKey] : '';
			let propsTitle = (title) ? title[textKey] : '';

			let newMenu = Object.assign({}, props, {
				title: propsTitle,
				description: propsDesc,
				categories: injectWithTranslatedProps(props.categories, {parent: 'Category', key: 'meals'})
			});

			console.log(newMenu);

			return newMenu;
		};

		ctx.props.dispatch(actionCreators.setMenu(getDataToUpdate(menu, lang)));
	};



	let onLanguageClick = (e, lang, index) => {
	    ctx.props.dispatch(actionCreators.setCurrentLanguage(lang, (res) => {
	    	console.log('changed current language!');
	    	console.log(res);

	    	ctx.setState({
	    		currentLanguage: lang,
	    		currentLanguageItem: index
	    	});

	    	const newMenu = ctx.props.menu || ctx.props;
	    	setMenu(newMenu, lang);
	    }));
	 };

	let onTranslateClick = () => {
	 	console.log('menu to be translated!');
	 	ctx.props.dispatch(actionCreators.translateMenu({
	 		...ctx.props.menu,
	 		languages: ctx.props.languages,
	 	}, onMenuTranslateRequestDone));
	};

	let onMenuTranslateRequestDone = (obj) => {
		console.log('translation request done! ');
		console.log(obj);

		ctx.setState({
			redirect: true,
			/*
			isTranslateRequestDone: true,
			component: {
				type: 'menu',
				obj: ctx.props.component
			}
			*/
		});
	};

  	return {
  		onLanguageClick,
  		onTranslateClick,
  		setMenu,
    	onNavItemClick
  	};
};

class SectionArticleMenuDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			currentSubNavItem: 0,
			currentLanguageItem: 0,
			currentLanguage: props.currentLanguage || DEFAULT_LANGUAGE
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {
		this.handlers.setMenu(this.props, this.state.currentLanguage);
	}

	getNavItemClasses(index) {
		const classes = classNames(
			'language--item',
			(this.state.currentLanguageItem === index) ? 'selected' : ''
		);
		return classes;
	}

	render() {
		const {
			id,
			title,
			description,
			price,
			dateUpdate,
			categories,
			languages,
			translations,
			currencies
		} = this.props;

		console.log(this.props);

		const currency = (currencies && currencies.length > 0) ? currencies[0] : {};
		const currencySymbol = (currency && currency.Currency) ? currency.Currency.Symbol : MAP_CONSTANTS.DEFAULT_LANGUAGE_SYMBOL;

		const ownProps = {
			id,
			Title: title,
			Description: description,
			Price: price,
			categories
		};

		const finalLanguages = (this.state.currentLanguage && languages && languages.length > 0) ?
	    	((languages.find(lang => lang.LanguageID === DEFAULT_LANGUAGE.LanguageID)) ?
	        	languages : [
	          		{
	            		LanguageID: DEFAULT_LANGUAGE.LanguageID,
	            		Language: DEFAULT_LANGUAGE.Language
	          		}
	        	].concat(languages)
	      	) : [DEFAULT_LANGUAGE];

      	console.log(finalLanguages);

		const currentItem = this.state.currentSubNavItem || 0;

		const languageItems = (finalLanguages && finalLanguages.length > 0) ? finalLanguages.map((language, index) => {
			const lang = (language.Language) ? language.Language : language;
			return <li key={index}>
				<div className={this.getNavItemClasses(index)} onClick={(e) => this.handlers.onLanguageClick(e, lang, index)}>
					{lang && lang.Flag && lang.Flag.Path &&
		            	<img src={lang.Flag.Path} alt={lang.Flag.AltDescription} />
		            }

		            {lang && (!lang.Flag || !lang.Flag.Path) && lang.Name &&
		            	<p>
		            		{lang.Name}
		            	</p>
		            }
				</div>
			</li>;
		}) : null;

		const nbLanguages = (finalLanguages && finalLanguages.length > 0) ? finalLanguages.length - 1 : '';

		const languagesComponent = (
			<ul>
				{languageItems}
			</ul>
		);

		const finishedTranslations = (translations && translations.length > 0) ? translations.find(translation => {
			return translation.Status === 'COMPLETED';
		}) : [];

		const noTranslationsMessage = (!finishedTranslations || finishedTranslations.length <= 0 && translations && translations.length > 0) ? (
			<div className="add-item dashed">
				<h2 className="no-items--headline">It looks like your menu translations are pending, please come back in a little bit.</h2>
				<div className="button-translate-menu">
					<span><Link to={"/translations"}>Check translation status</Link></span>
				</div>
			</div>
		) : (
			<div className="add-item dashed">
				<h2 className="no-items--headline">It looks like your menu translations are pending or your menu is not translated yet.</h2>
				<div className="button-translate-menu">
					<span onClick={this.handlers.onTranslateClick}>Translate this menu</span>
				</div>
			</div>
		);

		const noTranslationsComponent = (!finishedTranslations || finishedTranslations.length <= 0) ? (
			<div className="global-padding-wrapper">
				<div className="branch--add">
					{noTranslationsMessage}
				</div>
			</div>
		) : (
			<div className="global-padding-wrapper">
				<div className="branch--add">
					<div className="add-item dashed">
						{
						/*
						<h2 className="no-items--headline">Do you want to reset this menu translation?</h2>
						<p className="no-items--disclaimer">(This will re-translate your menu in all {nbLanguages} target languages.)</p>
						<div className="button-translate-menu">
							<span onClick={this.handlers.onTranslateClick}>Translate this menu again</span>
						</div>
						*/
						}
						<h2 className="no-items--headline">Here are your menu translations below</h2>
					</div>
				</div>
			</div>
		);

		const categoriesComponent = (categories && categories.length > 0) ? categories.map((category, index) => {
			return <ArticleMenuDetailListItem nbItems={categories.length} currentItem={currentItem} category={category} currency={currency} language={this.props.currentLanguage} key={index} />;
		}) : null;

		const subnavComponent = (categories && categories.length > 0) ? (
			<SubNav categories={categories} currentItem={currentItem} onNavItemClick={this.handlers.onNavItemClick} />
		) : null;

		const containerWidth = (categories && categories.length > 0) ? (
			(100 * categories.length) + '%'
		) : '100%';

		const translate = (categories && categories.length > 0) ? (
			'translateX('+ -((this.state.currentSubNavItem * 100) / categories.length) + '%)'
		) : '0%';


		return (this.state.redirect) ? (
			<Redirect to={{
				pathname: '/translate/menu',
				state: { component: this.state.component }
			}} />
		) : (
			<div className="article--menu-detail">
				<div className="branch--contact--header">
					<div className="header--title-container">
						<h1 className="aside--title collapsable--title">
							{title}
						</h1>
					</div>
					<div className="header--actions">
						<ul>
							<li><Link to={"/menu/edit/" + id} className="action--edit">Edit</Link></li>
							<li><Link to={"/menu/delete/" + id} className="action--delete">Delete</Link></li>
						</ul>
					</div>
				</div>
				<header className="menu-detail--header">
					<h1 className="menu-detail--title">
						{title}
					</h1>
					<h2>
						{description}
					</h2>
					<h3>{currencySymbol} {price}</h3>
				</header>
				<div className="menu-detail--languages">
					{languagesComponent}
				</div>

				{noTranslationsComponent}

				{subnavComponent}

				<div className="menu-categories menu-detail">
					<div className="categories-container" data-item-active={currentItem} style={{width: containerWidth, transform: translate}}>
						{categoriesComponent}
					</div>
				</div>
			</div>
		);
	}
};

SectionArticleMenuDetail.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	price: PropTypes.number,
	dateUpdate: PropTypes.object,
	categories: PropTypes.array,
	languages: PropTypes.array,
	translations: PropTypes.array,
	currencies: PropTypes.array
};


const mapStateToProps = (state) => {
    console.log(state);
    return {
        currentLanguage: state._currentLanguage.currentLanguage,
        menu: state._menu.menu
    };
};

export default connect(mapStateToProps)(SectionArticleMenuDetail);