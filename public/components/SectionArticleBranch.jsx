import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

const classNames = require('classnames');

import Contact from './Contact';
import BranchCuisine from './BranchCuisine';
import BranchLanguage from './BranchLanguage';
import BranchImage from './BranchImage';
import BranchCurrency from './BranchCurrency';

let createHandlers = (ctx) => {
  let headerOnClick = () => {
    ctx.setState((prevState) => {
		return {
			expanded: !prevState.expanded
		};
	});
  };

  let goToBranch = () => {
  	ctx.setState({
  		redirect: true
  	});
  };

  return {
    headerOnClick,
    goToBranch
  };
};

class SectionArticleBranch extends Component {
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
			address,
			city,
			contacts,
			zipcode,
			country,
			cuisines,
			currencies,
			email,
			hasHeadquarters,
			images,
			languages,
			name
		} = this.props;

		if (this.state.redirect) {
			return <Redirect push to={"/branch/get/" + id} />;
		}

		const contactComponents = (contacts.length > 0) ? contacts.map((contact, index) => {
			return <Contact id={contact.BranchContactID} imgPath={contact.ImagePath} altDesc={contact.ImageAltDesc} firstname={contact.Firstname} lastname={contact.Lastname} isAdmin={contact.IsAdmin} email={contact.Email} tel={contact.Tel} key={contact.BranchContactID} />;
		}) : '';

		const cuisineComponents = (cuisines.length > 0) ? cuisines.map((cuisine, index) => {
			const finalCuisine = (cuisine.Cuisine && Object.keys(cuisine.Cuisine).length > 0) ? cuisine.Cuisine : cuisine;
			return (index < cuisines.length - 1)
				? (
					<div key={cuisine.BranchCuisineID}>
						<BranchCuisine id={cuisine.BranchCuisineID} description={finalCuisine.Description} title={finalCuisine.Title} key={cuisine.BranchCuisineID} />
						,&nbsp;
					</div>
				) : (
					<div key={cuisine.BranchCuisineID}>
						<BranchCuisine id={cuisine.BranchCuisineID} description={finalCuisine.Description} title={finalCuisine.Title} key={cuisine.BranchCuisineID} />
					</div>
				)
		}) : '';

		const languageComponents = (languages.length > 0) ? languages.map((language, index) => {
			const finalLanguage = (language.Language && Object.keys(language.Language).length > 0) ? language.Language : language;
			return <BranchLanguage id={language.BranchLanguageID} code={finalLanguage.Code} codeFull={finalLanguage.CodeFull} name={finalLanguage.Name} title={finalLanguage.Title} key={language.BranchLanguageID} />;
		}) : '';

		const currencyComponents = (currencies && currencies.length > 0) ? currencies.map((currency, index) => {
			const finalCurrency = (currency.Currency && Object.keys(currency.Currency).length > 0) ? currency.Currency : currency;
			return (index < currencies.length - 1)
				? (
					<div key={currency.BranchCurrencyID}>
						<BranchCurrency id={currency.BranchCurrencyID} name={finalCurrency.Name} nameShort={finalCurrency.NameShort} symbol={finalCurrency.Symbol} description={finalCurrency.Description} />
						,&nbsp;
					</div>
				) : (
					<div key={currency.BranchCurrencyID}>
						<BranchCurrency id={currency.BranchCurrencyID} name={finalCurrency.Name} nameShort={finalCurrency.NameShort} symbol={finalCurrency.Symbol} description={finalCurrency.Description} />
					</div>
				)
		}) : '';

		const imageComponents = (images.length > 0) ? images.map((image, index) => {
			return (
				<li key={image.BranchImageID}>
					<BranchImage id={image.BranchImageID} imgPath={image.Path} altDesc={image.AltDesc} key={image.BranchImageID} />
				</li>
			)
		}) : '';

		const isHqComponent = (hasHeadquarters)
			? <span className="label--value">Main Branch</span>
			: <span className="label--value">Normal Branch</span>
		;

		const classes = classNames(
			'branch--contact--header',
			'collapsable',
			(this.state.expanded) ? 'opened' : ''
		);


		return (
			<div className="article--branch">
				<div className="branch--contact aside--section contacts--support">
					<header className={classes} onClick={this.handlers.headerOnClick}>
						<div className="header--title-container">
							<h1 className="aside--title collapsable--title">
								{name}
							</h1>
						</div>
						<div className="header--actions">
							<ul>
								<li><Link to={"/branch/edit/" + id} className="action--edit">Edit</Link></li>
								<li><Link to={"/branch/delete/" + id} className="action--delete">Delete</Link></li>
							</ul>
						</div>
					</header>
					<div className="global-padding-wrapper">
						<div>
							{
								/*
								<div className="branch--menus">
									<Link to={"/menu/branch/" + id}>
										<p>Menus</p>
										<img src="assets/images/icon-menu-white.svg" alt={"Icon of " + name + " branch menus"} />
									</Link>
								</div>
								*/
							}
							<div className="branch--hq">
								<p className="menu--title">Branch Type</p>
								{isHqComponent}
							</div>
							<div className="branch--currencies">
								<p className="menu--title">Currency</p>
								{currencyComponents}
							</div>
							<div className="branch--cuisines">
								<p className="menu--title">Cuisine Types</p>
								{cuisineComponents}
							</div>
							<div className="branch--languages">
								<p className="menu--title">Languages</p>
								{languageComponents}
							</div>
							<div className="branch--address">
					            <p className="menu--title">Address</p>
					            <address className="label--key">
					                {address}<br />
					                {zipcode} {city}<br />
					                {country}<br />
					            </address>
					        </div>
					        <div className="branch--images">
								<ul>
									{imageComponents}
								</ul>
							</div>
							<div className="branch--contacts">
								<h3 className="branch--contacts--name">Contacts</h3>
								{contactComponents}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
};

SectionArticleBranch.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleBranch;