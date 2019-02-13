import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

const classNames = require('classnames');

import Menu from './Menu';
import Translation from './Translation';

let createHandlers = (ctx) => {
	let headerOnClick = () => {
	    ctx.setState((prevState) => {
			return {
				expanded: !prevState.expanded
			};
		});
	};

 	let goToMenu = () => {
  		ctx.setState({
  			redirect: true
  		});
  	};

  	return {
    	goToMenu,
    	headerOnClick
  	};
};

class SectionArticleMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const {
			id,
			branchId,
			title,
			description,
			price,
			dateUpdate,
			categories,
			branches,
			duplicates,
			languages,
			translations,
			currencies
		} = this.props;

		console.log(this.props);

		const ownProps = {
			id,
			Title: title,
			Description: description,
			Price: price,
			categories
		};

		/*
		Menu:
		--------------
		id, title, ownProps -> { title, description, price, categories }

		MenuCategory:
		--------------
			id={cat.id} 
				isCustom={cat.isCustom} 
				title={cat.title} 
				description={cat.description} 
				meals={cat.meals} 
		*/

		const classes = classNames(
			'branch--contact--header',
			'collapsable',
			(this.state.expanded) ? 'opened' : ''
		);

		if (this.state.redirect) {
			return <Redirect push to={"/menu/get/" + id} />;
		}

		const uniqueLanguages = (translations && translations.length > 0) ? translations.reduce((acc, lang) => {
			if (!acc.find(item => item.BranchLanguageName === lang.BranchLanguageName)) {
				return acc.concat(lang);
			}
			return acc;
		}, []) : [];

		const languagesList = (uniqueLanguages && uniqueLanguages.length > 0) ? uniqueLanguages.map((translation, index) => {
			return (index < uniqueLanguages.length - 1)
				? (
					<span className="language--name" key={index}>
						<span>{translation.BranchLanguageName}</span>
						,&nbsp;
					</span>
				) : (
					<span className="language--name" key={index}>
						<span>{translation.BranchLanguageName}</span>
					</span>
				);
		}) : null;

/*
		let translationComponents = (translations.length > 0) ? translations.map((translation, index) => {
			return (
				<div>
					<header className="article--menu--translations--header">
						Translations: {translations.length}<br />
						Languages: <div>{languagesList}</div>
					</header>
					<Translation id={translation.id} ownKey={translation.key} value={translation.value} language={translation.language} key={index} />
				</div>
			);
		}) : '';
*/

		const initialBranch = branches.filter(b => b.BranchID === branchId);

		console.log(duplicates);

		const finalBranches = (duplicates && duplicates.length > 0) ? duplicates.reduce((acc, dup) => {
			const branch = branches.filter(b => b.BranchID === dup.BranchID);
			console.log(branch);
			return (branch && branch.length > 0) ? acc.concat(branch) : acc;
		}, initialBranch) : initialBranch;

		console.log(finalBranches);

		const branchesList = (finalBranches && finalBranches.length > 0) ? finalBranches.map((branch, index) => {
			return (index < finalBranches.length - 1)
				? (
					<span className="language--name" key={index}>
						<span>{branch.Name}</span>
						,&nbsp;
					</span>
				) : (
					<span className="language--name" key={index}>
						<span>{branch.Name}</span>
					</span>
				);
		}) : null;

		const branchesContainer = (branches && branches.length > 0) ? 
			<div>
				<header className="article--menu--translations--header">
					<p className="menu--title">
						Branches
					</p>
					<div>
						<div className="content--label">
							<h3 className="label--key">Total:</h3>
							<span className="label--value">{finalBranches.length}</span>
						</div>
						<div className="content--label">
							<h3 className="label--key">Branches:</h3>
							<span className="label--value">{branchesList}</span>
						</div>
					</div>
				</header>
				<Link to="/branches" >
					<button className="button--action button--action-filled">See Branches</button>
				</Link>
			</div>
			: null;

		const translationsContainer = (translations && translations.length > 0) ?
			<div>
				<header className="article--menu--translations--header">
					<p className="menu--title">
						Translations
					</p>
					<div>
						<div className="content--label">
							<h3 className="label--key">Total:</h3>
							<span className="label--value">{uniqueLanguages.length}</span>
						</div>
						<div className="content--label">
							<h3 className="label--key">Languages:</h3>
							<span className="label--value">{languagesList}</span>
						</div>
					</div>
				</header>
				<Link to="/translations" >
					<button className="button--action button--action-filled">See Translations</button>
				</Link>
			</div>
			: null;


		return (
			<div className="article--menu">
				<div className="branch--contact aside--section contacts--support">
					<header className={classes} onClick={this.handlers.headerOnClick}>
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
					</header>
					<div className="global-padding-wrapper">
						<div className="article--menu--translations clearfix">
							{branchesContainer}
						</div>
						<div className="article--menu--translations clearfix">
							{translationsContainer}
						</div>
						<div className="goto" onClick={this.handlers.goToMenu}>
							<p className="menu--title">
								Menu
							</p>
							<Menu id={id} title={title} ownProps={ownProps} />
						</div>
					</div>
				</div>
			</div>
		)
	}
};

SectionArticleMenu.propTypes = {
	id: PropTypes.number,
	branchId: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	price: PropTypes.number,
	dateUpdate: PropTypes.object,
	categories: PropTypes.array,
	languages: PropTypes.array,
	branches: PropTypes.array,
	duplicates:PropTypes.array,
	translations: PropTypes.array,
	currencies: PropTypes.array
};

export default SectionArticleMenu;