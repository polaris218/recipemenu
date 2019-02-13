import React, { Component, PropTypes } from 'react';

import SectionArticleEditMenu from './SectionArticleEditMenu';

class SectionArticleEditMenus extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;


		const menuComponents = (component.props.menus && component.props.menus.length > 0) ? component.props.menus.map((menu, index) => {
			return <SectionArticleEditMenu 
				id={menu.id || menu.MenuID}
				title={menu.title || menu.Title}
				description={menu.description || menu.Description}
				price={menu.price || menu.Price}
				categories={menu.categories}
				currency={menu.currency}
				languages={menu.languages}
				translations={menu.translations}
				key={index} />;
		}) : null;

		return (
			<article className="content--module module--item-details no-metadata content--menus">
				<div className="content--container global-padding-wrapper branches-container">
					<h2 className="asset--subtitle">
                        Edit Menus
                    </h2>
                    <div className="branches">
                    	{menuComponents}
                    </div>
                </div>
			</article>
		)
	}
};

SectionArticleEditMenus.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleEditMenus;