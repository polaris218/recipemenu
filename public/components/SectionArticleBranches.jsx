import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleBranch from './SectionArticleBranch';

class SectionArticleBranches extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;

		console.log(component.props);

		const branchComponents = (component.props.branches && component.props.branches.length > 0) ? component.props.branches.map((branch, index) => {
			return <SectionArticleBranch 
				id={branch.BranchID}
				address={branch.Address}
				city={branch.City}
				contacts={branch.contacts}
				zipcode={branch.zipcode}
				country={branch.Country}
				currencies={branch.currencies}
				email={branch.email}
				hasHeadquarters={parseInt(branch.HasHeadquarters, 10)}
				images={branch.images}
				languages={branch.languages}
				cuisines={branch.cuisines}
				name={branch.Name}
				key={index} />;
		}) : null;

		const noItemsComponent = (!branchComponents || branchComponents.length <= 0) ? (
			<h2 className="no-items--headline">Oh no! It looks like you have not added any branches yet.</h2>
		) : null;

		return (
			<article className="content--module module--item-details no-metadata content--branches">
				<div className="content--container global-padding-wrapper branches-container">
					<h2 className="asset--subtitle">
                        {title}
                    </h2>
                    <div className="branch--add">
                    	{noItemsComponent}
                    	<Link to="/branch/add/1" >
							<div className="add-item dashed">
								<span>Add a Branch <strong>+</strong></span>
							</div>
						</Link>
                    </div>
                    <div className="branches">
                    	{branchComponents}
                    </div>
                    <div className="branch--see-all">
                    	<Link to="/branches" >
							<button className="button--action button--action-filled">See all branches</button>
						</Link>
                    </div>
                </div>
			</article>
		)
	}
};

SectionArticleBranches.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleBranches;