import React, { Component, PropTypes } from 'react';

import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import SectionArticleEditBranch from './SectionArticleEditBranch';

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

    let onChanges = (branchId, type, obj) => {
		let dataToUpdate = {};
		switch (type) {
			case 'main':
				let name = obj.target.getAttribute('name');
				let key = name.substring(name.indexOf('branch-') + 7, name.length);
				if (obj.target.type === 'checkbox') {
					dataToUpdate[key] = obj.target.checked;
				} else {
					dataToUpdate[key] = obj.target.value;
				}

				ctx.props.dispatch(actionCreators.setBranches(ctx.props.profile.branches, dataToUpdate, branchId));
			default:
				dataToUpdate[type] = obj.data;
				ctx.props.dispatch(actionCreators.setBranches(ctx.props.profile.branches, dataToUpdate, branchId));
		}
	};

	let onBranchesSaved = (res) => {
		console.log('branhes saved!');

		// Set profile in the global store here

		ctx.setState({
			isSaved: true
		});
	};

	let onSaveChanges = (branches) => {
		console.log('should save all changes to the db and redirect');
		ctx.props.dispatch(actionCreators.saveBranches(branches, onBranchesSaved));
	};

    return {
        getProfile,
        getAvailableLanguages,
        getAvailableCuisines,
        getAvailableCurrencies,
        onChanges,
        onSaveChanges
    };
};

class SectionArticleEditBranches extends Component {
	constructor(props) {
        super(props);
        this.state = {
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

		const finalBranches = (this.props.profile && this.props.profile.branches && this.props.profile.branches.length > 0) ? this.props.profile.branches : component.props.branches || [];

		console.log(finalBranches);

		const branchComponents = (finalBranches && finalBranches.length > 0) ? finalBranches.map((branch, index) => {
			console.log(branch, 'branch')
			return <SectionArticleEditBranch 
				id={branch.BranchID}
				address={branch.Address}
				city={branch.City}
				contacts={branch.contacts}
				country={branch.Country}
				currencies={branch.currencies}
				availableCurrencies={this.props.availableCurrencies}
				email={branch.Email}
				hasHeadquarters={parseInt(branch.HasHeadquarters, 10)}
				images={branch.images}
				languages={branch.languages}
				availableLanguages={this.props.availableLanguages}
				cuisines={branch.cuisines}
				availableCuisines={this.props.availableCuisines}
				name={branch.Name}
				key={branch.BranchID}
				onChange={this.handlers.onChanges} />;
		}) : null;

		const branchesComponent = (this.state.isSaved) ? (
			<Redirect to={{
                pathname: '/profile/get'
            }} />
		) : (
			<article className="content--module module--item-details no-metadata content--branches">
				<div className="content--container global-padding-wrapper branches-container">
					<h2 className="asset--subtitle">
                        Edit Branches
                    </h2>
                    <div className="branches">
                    	{branchComponents}
                    	<div className="profile-save">
		                    <button id="profile-save" onClick={(e) => this.handlers.onSaveChanges(this.props.profile.branches)}>Save Changes</button>
		                </div>
                    </div>
                </div>
			</article>
		);

		return branchesComponent;
	}
};

SectionArticleEditBranches.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);
  return {
    profile: state._profile.profile,
    availableLanguages: state._languages.languages,
    availableCuisines: state._cuisines.cuisines,
    availableCurrencies: state._currencies.currencies
  };
};

export default connect(mapStateToProps)(SectionArticleEditBranches);