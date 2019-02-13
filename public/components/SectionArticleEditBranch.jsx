import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');

import ContactEdit from './ContactEdit';
import BranchCuisinesEdit from './BranchCuisinesEdit';
import BranchLanguagesEdit from './BranchLanguagesEdit';
import BranchContactsEdit from './BranchContactsEdit';
import BranchCurrenciesEdit from './BranchCurrenciesEdit';
import ImageUpload from './ImageUpload';

let createHandlers = (ctx) => {
	let headerOnClick = () => {
	    ctx.setState((prevState) => {
			return {
				expanded: !prevState.expanded
			};
		});
	};

	let onImageUpload = (type, obj) => {
		console.log('uploaded image!!');
		ctx.props.onChange(ctx.props.id, type, obj);
	};

	let onSaveChanges = (changes) => {
		console.log(changes);
	};

	let onChanges = (type, obj) => {

		// update store
		ctx.props.onChange(ctx.props.id, type, obj);
	};

	return {
		headerOnClick,
		onImageUpload,
		onSaveChanges,
		onChanges
	};
};

class SectionArticleEditBranch extends Component {
	constructor(props) {	
		super(props);
		this.state = {
			expanded: false,
			branch: this.props
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
			availableCuisines,
			currencies,
			availableCurrencies,
			email,
			hasHeadquarters,
			images,
			languages,
			availableLanguages,
			name,
			onChange
		} = this.props;

		console.log(this.props);

		console.log(this.state);

		const classes = classNames(
			'branch--contact--header',
			'collapsable',
			(this.state.expanded) ? 'opened' : ''
		);

		const contactComponents = (
			<BranchContactsEdit contacts={contacts} branchId={id} onChange={this.handlers.onChanges} />
		);

		const cuisineComponents = (
			<BranchCuisinesEdit cuisines={cuisines.map(cuisine => cuisine.Cuisine)} availableCuisines={availableCuisines} onChange={this.handlers.onChanges} />
		);

		const branchLanguages = (
			<BranchLanguagesEdit languages={languages.map(lang => lang.Language)} availableLanguages={availableLanguages} onChange={this.handlers.onChanges} />
		);

		const currencyComponents = (
			<BranchCurrenciesEdit currencies={(currencies && currencies.length > 0) ? currencies.map(currency => currency.Currency) : []} availableCurrencies={availableCurrencies} onChange={this.handlers.onChanges} />
		);

		const allImages = images.map(img => {
			return {
				id: img.BranchImageID,
				altDesc: img.AltDesc,
				caption: img.Caption,
				imgPath: img.Path,
				branchId: img.BranchID
			};
		});

		console.log(allImages, 'test')
		const allImagesComponent = (
			<ImageUpload onChanges={this.handlers.onChanges} images={allImages} />
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
					</header>
					<div className="global-padding-wrapper">
						<div className="branch--menus edit">
							{
							/*
							<Link to={"/menus/branch/" + id}>
								<button className="button--action button--action-filled">Edit Menus</button>
							</Link>
							*/
							}
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
							{branchLanguages}
						</div>
						<div className="branch--name">
				            <p className="menu--title">Name</p>
				            <div className="content--edit branch--address--edit">
				            	<div className="edit--block">
                            		<label className="label--edit">Enter new Branch Name:</label>
                        			<input className="input--edit" type="text" name="branch-Name" defaultValue={name} onChange={(e) => this.handlers.onChanges('main', e)} />
                        		</div>
                        	</div>
                       	</div>
                       	<div className="branch--hq">
							<p className="menu--title">Branch Type</p>
							<div className="content--edit">
								<div className="edit--block">
                            		<label className="label--edit">Is it your Main Branch?</label>
                        			<input className="input--edit" type="checkbox" name="branch-HasHeadquarters" defaultChecked={!!hasHeadquarters} onChange={(e) => this.handlers.onChanges('main', e)} />
                        		</div>
                        	</div>
						</div>
						<div className="branch--address">
				            <p className="menu--title">Address</p>
				            <div className="content--edit branch--address--edit">
				            	<div className="edit--block">
                            		<label className="label--edit">Enter new Address:</label>
                        			<input className="input--edit" type="text" name="branch-Address" defaultValue={address} onChange={(e) => this.handlers.onChanges('main', e)} />
                        		</div>
                        		<div className="edit--block">
                            		<label className="label--edit">Enter new Zipcode:</label>
                        			<input className="input--edit" type="text" name="branch-Zipcode" defaultValue={zipcode} onChange={(e) => this.handlers.onChanges('main', e)} />
                        		</div>
                        		<div className="edit--block">
                            		<label className="label--edit">Enter new City:</label>
                        			<input className="input--edit" type="text" name="branch-City" defaultValue={city} onChange={(e) => this.handlers.onChanges('main', e)} />
                        		</div>
                        		<div className="edit--block">
                            		<label className="label--edit">Enter new Country:</label>
                        			<input className="input--edit" type="text" name="branch-Country" defaultValue={country} onChange={(e) => this.handlers.onChanges('main', e)} />
                        		</div>
				            </div>
				        </div>
				        <div className="branch--images">
				        	<p className="menu--title">Images</p>

							{allImagesComponent}
						</div>
						<div className="branch--contacts">
							<h3 className="branch--contacts--name">Contacts</h3>
							{contactComponents}
						</div>
					</div>
				</div>
			</div>
		)
	}
};

SectionArticleEditBranch.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object,
    onChange: PropTypes.func
};

export default SectionArticleEditBranch;