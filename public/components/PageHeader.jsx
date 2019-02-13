import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

class PageHeader extends Component {
	render () {
		const { company } = this.props;

		const adminComponent = (company.branchRoot && company.branchRoot.mainContact) ? (
			<div>
				<h4 className="login">
					{company.branchRoot.mainContact.Firstname} {company.branchRoot.mainContact.Lastname}
					<span>Admin</span>
				</h4>
				<img src={company.branchRoot.mainContact.ImagePath} alt={company.branchRoot.mainContact.ImageAltDesc} />
			</div>
		) : (
			<div>
				<h4 className="login">
					Admin
					<span>Profile</span>
				</h4>
				<img src="assets/images/icon-anonymous.svg" alt="" />
			</div>
		);

		return (
			<section className="toolbar clearfix">
	            <h3 className="content--container--title">{company.name} Management Portal</h3>
	            <nav className="admin-nav">
	                <Link to="/profile/get">
	                    {adminComponent}
	                </Link>
	            </nav>
	        </section>
		)
	}
};

PageHeader.propTypes = {
	company: PropTypes.object
};

export default PageHeader;