import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import ContactAdd from './ContactAdd';
import BranchContactsEdit from './BranchContactsEdit';
import BranchCuisinesEdit from './BranchCuisinesEdit';
import BranchCurrenciesEdit from './BranchCurrenciesEdit';
import LanguagesEdit from './LanguagesEdit';
import ImageUpload from './ImageUpload';

let createHandlers = (ctx) => {
	let getProfile = () => {
        ctx.props.dispatch(actionCreators.getProfile());
    };

    let getAvailableLanguages = () => {
        ctx.props.dispatch(actionCreators.getLanguages());
    };

    let getAvailableCuisines = () => {
        ctx.props.dispatch(actionCreators.getCuisines());
    };

    let getAvailableCurrencies = () => {
        ctx.props.dispatch(actionCreators.getCurrencies());
    };

	let onImageUpload = () => {
		console.log('uploaded image!!');
	};

	let onBranchSaved = (res) => {
		console.log('branch saved!');
		ctx.setState({
			isSaved: true
		});
	};

	let validateState = (state, cb) => {
		console.log(state);

		let errors = [];
		let branch = state.branch;

		if (!branch.Address) {
			errors.push({
				name: 'Address',
				message: 'Branch Address is required.'
			});
		}

		if (!branch.City) {
			errors.push({
				name: 'City',
				message: 'Branch City is required.'
			});
		}

		if (!branch.Country) {
			errors.push({
				name: 'Country',
				message: 'Branch Country is required.'
			});
		}

		if (!branch.Name) {
			errors.push({
				name: 'Name',
				message: 'Branch Name is required.'
			});
		}

		if (!branch.currencies || branch.currencies.length <= 0) {
			errors.push({
				name: 'currencies',
				message: 'Please choose at least one currency for your branch.'
			});
		}

		if (!branch.cuisines || branch.cuisines.length <= 0) {
			errors.push({
				name: 'cuisines',
				message: 'Please choose at least one type of cuisine for your branch.'
			});
		}

		if (!branch.languages || branch.languages.length <= 0) {
			errors.push({
				name: 'languages',
				message: 'Please choose at least one translation language for your branch.'
			});
		}

		if (!branch.images || branch.images.length <= 0) {
			errors.push({
				name: 'images',
				message: 'Please upload at least one image for your branch.'
			});
		}

		if (!branch.contacts || branch.contacts.length <= 0 ||
			(!branch.contacts[0].Firstname || !branch.contacts[0].Lastname || !branch.contacts[0].Tel || !branch.contacts[0].Email)
		) {
			errors.push({
				name: 'contacts',
				message: 'Please provide at least one contact point that is not empty for your branch.'
			});
		}
		console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
		console.log(branch)
		ctx.setState({
			validationErrors: errors,
			isValid: !errors.length
		}, () => {
			if (cb && typeof cb === 'function') {
				cb();
			}
		});
	};

	let onSaveBranch = (state) => {
		validateState(state, () => {
			if (ctx.state.isValid) {
				// save menu to db and use 'onBranchSaved' as callback
				console.log('should save all changes to the db and redirect');
				ctx.props.dispatch(actionCreators.saveBranch(state.branch, onBranchSaved));
			}
		});
	};

	let onChanges = (type, obj) => {
		let newBranch;
		switch (type) {
			case 'main':
				obj.persist();
				console.log(type, obj);

				let name = obj.target.getAttribute('name');
				let key = name.substring(name.indexOf('branch-') + 7, name.length);

				ctx.setState((prevState) => {
					newBranch = prevState.branch;
					if (obj.target.type === 'checkbox') {
						newBranch[key] = obj.target.checked;
					} else {
						newBranch[key] = obj.target.value;
					}

					console.log(newBranch);

					ctx.props.dispatch(actionCreators.setBranches(ctx.props.profile.branches, newBranch));

					return {
						branch: newBranch
					};
				});
			default:
				console.log(type, obj);
				ctx.setState((prevState) => {
					newBranch = prevState.branch;
					newBranch[type] = obj.data;

					console.log(newBranch);

					ctx.props.dispatch(actionCreators.setBranches(ctx.props.profile.branches, newBranch));

					return {
						branch: newBranch
					};
				});
		}
	};

	return {
		validateState,
		getProfile,
		getAvailableCuisines,
		getAvailableLanguages,
		getAvailableCurrencies,
		onImageUpload,
		onSaveBranch,
		onChanges
	};
};

class SectionArticleAddBranch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			branch: {
				Address: '',
				City: '',
				CompanyID: (props.profile) ? props.profile.CompanyID : null,
				Country: '',
				Email: '',
				Tel: '',
				Name: '',
				HasHeadquarters: false,
				contacts: [],
				cuisines: [],
				currencies: [],
				images: [],
				languages: []
			},
			validationErrors: [],
			isValid: true,
			isSaved: false
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {
        this.handlers.getProfile();
        this.handlers.getAvailableLanguages();
        this.handlers.getAvailableCuisines();
        this.handlers.getAvailableCurrencies();
    }

	render() {
		const { title, dateUpdate, component } = this.props;

		console.log(this.props);

		// FIXME:
		// Hack to just show Mediterranean and french for the moment
		//
		const availableCuisines = (this.props.availableCuisines || []).filter(cuisine => cuisine.CuisineID === 1 || cuisine.CuisineID === 3);
		const availableLanguages = this.props.availableLanguages || [];
		const availableCurrencies = this.props.availableCurrencies || [];

		const contactComponents = (
			<BranchContactsEdit contacts={[]} onChange={this.handlers.onChanges} />
		);

		const cuisineComponents = (
			<BranchCuisinesEdit cuisines={[]} availableCuisines={availableCuisines} onChange={this.handlers.onChanges} />
		);

		const branchLanguages = (
			<LanguagesEdit languages={[]} availableLanguages={availableLanguages} onChange={this.handlers.onChanges} />
		);

		const currencyComponents = (
			<BranchCurrenciesEdit currencies={[]} availableCurrencies={availableCurrencies} onChange={this.handlers.onChanges} />
		);

		const allImagesComponent = (
			<ImageUpload onChanges={this.handlers.onChanges} onUploadSubmit={this.handlers.onImageUpload} images={[]} />
		);

		const addBranchComponent = (this.state.isSaved) ? (
			<Redirect to={{
                pathname: '/profile/get'
            }} />
		) : (
			<article className="content--module module--item-details no-metadata content--branches">
				<div className="content--container global-padding-wrapper branches-container">
					<h2 className="asset--subtitle">
                        Add Branch
                    </h2>
                    <div className="branches">
                    	<div className="article--branch">
							<div className="branch--contact aside--section contacts--support">
								<header className="branch--contact--header">
									<div className="header--title-container">
										<a href="#," className="collapsable opened">
											<h1 className="aside--title collapsable--title">
												New Branch
											</h1>
										</a>
									</div>
								</header>
								<div className="global-padding-wrapper">
									<div className="branch--menus edit">
										{
											/*
										<Link to={"/menu/add/"}>
											<button className="button--action button--action-filled">Add Menus</button>
										</Link>
										*/
										}
									</div>
									<div className="branch--title">
										<p className="menu--title">Branch Name</p>
										<div className="content--edit">
											<div className="edit--block">
			                            		<label className="label--edit">Enter new Branch Name:</label>
			                        			<input className="input--edit" type="text" name="branch-Name" placeholder="New Branch name..." onChange={(e) => this.handlers.onChanges('main', e)} />
			                        		</div>
			                        		{
			                        			!!this.state.validationErrors.find(err => err.name === 'Name') &&
			                        			<div className="error">
			                        				{this.state.validationErrors.find(err => err.name === 'Name').message}
			                        			</div>
			                        		}
			                        	</div>
									</div>
									<div className="branch--hq">
										<p className="menu--title">Branch Type</p>
										<div className="content--edit">
											<div className="edit--block">
			                            		<label className="label--edit">Is it your Main Branch?</label>
			                        			<input className="input--edit" type="checkbox" name="branch-HasHeadquarters" onChange={(e) => this.handlers.onChanges('main', e)} />
			                        		</div>
			                        	</div>
									</div>
									<div className="branch--currencies">
										<p className="menu--title">Currency</p>
										{currencyComponents}
										{
		                        			!!this.state.validationErrors.find(err => err.name === 'currencies') &&
		                        			<div className="error">
		                        				{this.state.validationErrors.find(err => err.name === 'currencies').message}
		                        			</div>
		                        		}
									</div>
									<div className="branch--cuisines">
										<p className="menu--title">Cuisine Types</p>
										{cuisineComponents}
										{
		                        			!!this.state.validationErrors.find(err => err.name === 'cuisines') &&
		                        			<div className="error">
		                        				{this.state.validationErrors.find(err => err.name === 'cuisines').message}
		                        			</div>
		                        		}
									</div>
									<div className="branch--languages">
										<p className="menu--title">Languages</p>
										{branchLanguages}
										{
		                        			!!this.state.validationErrors.find(err => err.name === 'languages') &&
		                        			<div className="error">
		                        				{this.state.validationErrors.find(err => err.name === 'languages').message}
		                        			</div>
		                        		}
									</div>
									<div className="branch--address">
							            <p className="menu--title">Address</p>
							            <div className="content--edit branch--address--edit">
							            	<div className="edit--block">
			                            		<label className="label--edit">Enter new Address:</label>
			                        			<input className="input--edit" type="text" name="branch-Address" placeholder="New address..." onChange={(e) => this.handlers.onChanges('main', e)} />
			                        		</div>
			                        		{
			                        			!!this.state.validationErrors.find(err => err.name === 'Address') &&
			                        			<div className="error">
			                        				{this.state.validationErrors.find(err => err.name === 'Address').message}
			                        			</div>
			                        		}
			                        		<div className="edit--block">
			                            		<label className="label--edit">Enter new Zipcode:</label>
			                        			<input className="input--edit" type="text" name="branch-Zipcode" placeholder="New zipcode..." onChange={(e) => this.handlers.onChanges('main', e)} />
			                        		</div>
			                        		<div className="edit--block">
			                            		<label className="label--edit">Enter new City:</label>
			                        			<input className="input--edit" type="text" name="branch-City" placeholder="New city..." onChange={(e) => this.handlers.onChanges('main', e)} />
			                        		</div>
			                        		{
			                        			!!this.state.validationErrors.find(err => err.name === 'City') &&
			                        			<div className="error">
			                        				{this.state.validationErrors.find(err => err.name === 'City').message}
			                        			</div>
			                        		}
			                        		<div className="edit--block">
			                            		<label className="label--edit">Enter new Country:</label>
			                        			<input className="input--edit" type="text" name="branch-Country" placeholder="New country..." onChange={(e) => this.handlers.onChanges('main', e)} />
			                        		</div>
			                        		{
			                        			!!this.state.validationErrors.find(err => err.name === 'Country') &&
			                        			<div className="error">
			                        				{this.state.validationErrors.find(err => err.name === 'Country').message}
			                        			</div>
			                        		}
							            </div>
							        </div>
							        <div className="branch--images">
							        	<p className="menu--title">Images</p>

										{allImagesComponent}
										{
		                        			!!this.state.validationErrors.find(err => err.name === 'images') &&
		                        			<div className="error">
		                        				{this.state.validationErrors.find(err => err.name === 'images').message}
		                        			</div>
		                        		}
									</div>
									<div className="branch--contacts">
										<h3 className="branch--contacts--name">Contacts</h3>
										{contactComponents}
										{
		                        			!!this.state.validationErrors.find(err => err.name === 'contacts') &&
		                        			<div className="error">
		                        				{this.state.validationErrors.find(err => err.name === 'contacts').message}
		                        			</div>
		                        		}
									</div>
								</div>
							</div>
							<div className="profile-save">
			                    <button id="profile-save" onClick={(e) => this.handlers.onSaveBranch(this.state)}>Save Branch</button>
			                </div>
						</div>
                    </div>
                </div>
			</article>
		);

		return addBranchComponent;
	}
};

SectionArticleAddBranch.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);
  	return {
  		branches: state._branches.branches,
    	profile: state._profile.profile,
    	availableLanguages: state._languages.languages,
    	availableCuisines: state._cuisines.cuisines,
    	availableCurrencies: state._currencies.currencies
  	};
};

export default connect(mapStateToProps)(SectionArticleAddBranch);