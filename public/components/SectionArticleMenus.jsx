import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SectionArticleMenu from './SectionArticleMenu';

class SectionArticleMenus extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;

		const currencies = (component.props.currencies && component.props.currencies.length > 0) ? component.props.currencies : [];

		console.log(component.props);

		const branches = (this.props.profile && this.props.profile.branches && this.props.profile.branches.length > 0) ? this.props.profile.branches : [];

		let duplicates = [];
		const uniqueMenus = (component.props.menus && component.props.menus.length > 0) ? component.props.menus.filter(function (menu, index) {
			const finalTitle = (menu.Title) ? 'Title' : 'title';
			const finalDescription = (menu.Description) ? 'Description' : 'description';
			const finalPrice = (menu.Price) ? 'Price' : 'price';

			if (!this[menu[finalTitle]] || !this[menu[finalDescription]] || !this[menu[finalPrice]]) {
				this[menu[finalTitle]] = true;
				this[menu[finalDescription]] = true;
				this[menu[finalPrice]] = true;
				return true;
			} else {
				duplicates.push({
					id: index,
					MenuID: menu.MenuID,
					BranchID: menu.BranchID,
					Title: menu[finalTitle],
					Description: menu[finalDescription],
					Price: menu[finalPrice]
				});
			}
		}, Object.create(null)) : null;

		console.log(uniqueMenus);
		console.log(duplicates);

		const menuComponents = (uniqueMenus && uniqueMenus.length > 0) ? uniqueMenus.map((menu, index) => {
			const finalTitle = menu.Title || menu.title;
			const finalDescription = menu.Description || menu.description;
			const finalPrice = menu.Price || menu.price;

			const menuDuplicates = duplicates.filter(d => d.Title === finalTitle && d.Description === finalDescription && d.Price === finalPrice);
			const finalDuplicates = (menuDuplicates) ? menuDuplicates : [];
			return <SectionArticleMenu 
				id={menu.MenuID || menu.id}
				branchId={menu.BranchID}
				title={finalTitle}
				description={finalDescription}
				price={finalPrice}
				dateUpdate={menu.dateUpdate}
				categories={menu.categories}
				currencies={currencies}
				branches={branches}
				duplicates={finalDuplicates}
				languages={menu.languages}
				translations={menu.translations}
				key={index} />;
		}) : null;

		const noItemsComponent = (!menuComponents || menuComponents.length <= 0) ? (
			<h2 className="no-items--headline">Oh no! It looks like you have not entered any menus yet.</h2>
		) : null;

		return (
			<article className="content--module module--item-details no-metadata content--menus">
				<div className="content--container global-padding-wrapper branches-container">
					<h2 className="asset--subtitle">
                        {title}
                    </h2>
                    <div className="branch--add">
                    	{noItemsComponent}
                    	<Link to="/menu/add/1" >
							<div className="add-item dashed">
								<span>Add a Menu <strong>+</strong></span>
							</div>
						</Link>
                    </div>
                    <div className="branches menus">
                    	{menuComponents}
                    </div>
                    <div className="branch--see-all">
                    	<Link to="/menus" >
							<button className="button--action button--action-filled">See all menus</button>
						</Link>
                    </div>
                </div>
			</article>
		)
	}
};

SectionArticleMenus.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);
  return {
    profile: state._profile.profile,
  };
};

export default connect(mapStateToProps)(SectionArticleMenus);