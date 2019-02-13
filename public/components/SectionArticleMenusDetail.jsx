import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleMenuDetail from './SectionArticleMenuDetail';

class SectionArticleMenusDetail extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;

		const currencies = (component.props.currencies && component.props.currencies.length > 0) ? component.props.currencies : [];
		const languages = (component.props.languages && component.props.languages.length > 0) ? component.props.languages : [];

		console.log(component.props);

		const menuComponents = (component.props.menus && component.props.menus.length > 0) ? component.props.menus.map((menu, index) => {
			return <SectionArticleMenuDetail 
				id={menu.MenuID || menu.id}
				title={menu.Title || menu.title}
				description={menu.Description || menu.description}
				price={menu.Price || menu.price}
				dateUpdate={menu.dateUpdate}
				categories={menu.categories}
				currencies={currencies}
				languages={languages}
				translations={menu.translations}
				key={index} />;
		}) : null;

		const noItemsComponent = (!menuComponents || menuComponents.length <= 0) ? (
			<div className="branch--add global-padding-wrapper">
				<h2 className="no-items--headline">Oh no! It looks like you have not entered any menus yet.</h2>
			</div>
		) : null;

		return (
			<article className="content--module module--item-details no-metadata content--menus">
				<div className="content--container branches-container">
                   	{noItemsComponent}

                    <div className="menus menu-detail">
                    	{menuComponents}
                    </div>
                    <div className="branch--see-all global-padding-wrapper">
                    	<Link to="/menus" >
							<button className="button--action button--action-filled">See all menus</button>
						</Link>
                    </div>
                </div>
			</article>
		)
	}
};

SectionArticleMenusDetail.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleMenusDetail;