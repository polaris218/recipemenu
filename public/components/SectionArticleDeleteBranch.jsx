import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const classNames = require('classnames');

import Contact from './Contact';
import BranchCuisine from './BranchCuisine';
import BranchLanguage from './BranchLanguage';
import BranchImage from './BranchImage';

let createHandlers = (ctx) => {
  let headerOnClick = () => {
    ctx.setState((prevState) => {
		return {
			expanded: !prevState.expanded
		};
	});
  };

  let redirect = () => {
  	ctx.setState({
        redirect: true
    });
  };

  let goToBranches = () => {
  	redirect();
  };

  let onAfterDeleteBranch = () => {
  	redirect();
  };

  let deleteBranch = (component, cb) => {
  	ctx.props.dispatch(actionCreators.deleteBranch(component, cb));
  };

  let onPageLoad = () => {
  	const id = parseInt(ctx.props.component.id, 10);
  	const component = (ctx.props.component.props.branches && ctx.props.component.props.branches.length > 0) ? ctx.props.component.props.branches.find(branch => {
		return branch.BranchID === id;
	}) : null;

  	ctx.props.dispatch(actionCreators.setPopup({
  		isOpened: true,
  		type: 'delete',
  		component: component,
  		text: 'Are you sure you want to delete this branch?',
  		actions: [
  			{
  				type: 'submit',
  				text: 'Delete',
  				fn: (comp, cb) => {
  					deleteBranch(comp, onAfterDeleteBranch);
  				}
  			},
  			{
  				type: 'cancel',
  				text: 'Cancel',
  				fn: (comp, cb) => {
  					goToBranches();
  				}
  			}
  		]
  	}));
  };

  return {
    headerOnClick,
    onPageLoad,
    goToBranches
  };
};

class SectionArticleDeleteBranch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			expanded: true
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {
        this.handlers.onPageLoad();
    }

	render() {
		const { title, dateUpdate, component } = this.props;
		const id = parseInt(component.id, 10);

		const branchComponent = (component.props.branches && component.props.branches.length > 0) ? component.props.branches.find(branch => {
			return branch.BranchID === id;
		}) : null;

		const address = branchComponent ? branchComponent.Address : '';
		const city = branchComponent ? branchComponent.City : '';
		const zipcode = branchComponent ? branchComponent.Zipcode : '';
		const country = branchComponent ? branchComponent.Country : '';
		const currency = branchComponent ? branchComponent.currency : null;
		const email = branchComponent ? branchComponent.Email : '';
		const name = branchComponent ? branchComponent.Name : '';
		const hasHeadquarters = branchComponent ? branchComponent.HasHeadquarters : false;

		console.log(component);
		console.log(branchComponent);

		if (this.state.redirect) {
			return <Redirect push to={"/branches"} />;
		}

		let contactComponents = (branchComponent && branchComponent.contacts && branchComponent.contacts.length > 0) ? branchComponent.contacts.map((contact, index) => {
			return <Contact id={contact.BranchContactID} imgPath={contact.ImagePath} altDesc={contact.ImageAltDesc} firstname={contact.Firstname} lastname={contact.Lastname} isAdmin={contact.IsAdmin} email={contact.Email} tel={contact.Tel} key={contact.BranchContactID} />;
		}) : null;

		let cuisineComponents = (branchComponent && branchComponent.cuisines && branchComponent.cuisines.length > 0) ? branchComponent.cuisines.map((cuisine, index) => {
			return (index < branchComponent.cuisines.length - 1)
				? (
					<div key={cuisine.BranchCuisineID}>
						<BranchCuisine id={cuisine.BranchCuisineID} description={cuisine.Cuisine.Description} title={cuisine.Cuisine.Title} key={cuisine.BranchCuisineID} />
						,&nbsp;
					</div>
				) : (
					<div key={cuisine.BranchCuisineID}>
						<BranchCuisine id={cuisine.BranchCuisineID} description={cuisine.Cuisine.Description} title={cuisine.Cuisine.Title} key={cuisine.BranchCuisineID} />
					</div>
				)
		}) : null;

		let languageComponents = (branchComponent && branchComponent.languages && branchComponent.languages.length > 0) ? branchComponent.languages.map((language, index) => {
			return <BranchLanguage id={language.BranchLanguageID} code={language.Language.Code} codeFull={language.Language.CodeFull} name={language.Language.Name} title={language.Language.Title} key={language.BranchLanguageID} />;
		}) : null;

		let imageComponents = (branchComponent && branchComponent.images && branchComponent.images.length > 0) ? branchComponent.images.map((image, index) => {
			return (
				<li key={image.BranchImageID}>
					<BranchImage id={image.BranchImageID} imgPath={image.Path} altDesc={image.AltDesc} key={image.BranchImageID} />
				</li>
			)
		}) : null;

		const classes = classNames(
			'branch--contact--header',
			'collapsable',
			(this.state.expanded) ? 'opened' : ''
		);

		const deleteComponent = (this.state.redirect)
			? (
				<Redirect to={{
					pathname: '/branches/'
				}} />
			) : (
				<article className="content--module module--item-details no-metadata content--branches">
					<div className="content--container global-padding-wrapper branches-container">
						<h2 className="asset--subtitle">
	                        {title}
	                    </h2>

	                    <div className="branches">
	                    	<div className="article--branch">
								<div className="branch--contact aside--section contacts--support">
									<header className={classes} onClick={this.handlers.headerOnClick}>
										<div className="header--title-container">
											<h1 className="aside--title collapsable--title">
												{name}
											</h1>
										</div>
									</header>
									<div className="global-padding-wrapper">
										<div className="goto">
											<div className="branch--menus">
												<Link to={"/menu/branch/" + id}>
													<p>Menus</p>
													<img src="assets/images/icon-menu-white.svg" alt={"Icon of " + name + " branch menus"} />
												</Link>
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
	                    </div>
	                    <div className="branch--deletion">
	                    	<Link to="/branches" >
								<button className="button--action button--action-filled">About to be deleted...</button>
							</Link>
	                    </div>
	                </div>
				</article>
			);


		return deleteComponent;
	}
};

SectionArticleDeleteBranch.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		popup: state._popup.popup
	};
};

export default connect(mapStateToProps)(SectionArticleDeleteBranch);