import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleEditBranches from './SectionArticleEditBranches';
import SectionArticleEditMenus from './SectionArticleEditMenus';
import SectionArticleEditMenusDetail from './SectionArticleEditMenusDetail';
import SectionArticleEditCompany from './SectionArticleEditCompany';

class SectionArticleEdit extends Component {
	render() {
		const { type, title, dateUpdate, component } = this.props;

		console.log(type);
		const sectionArticleComponent = () => {
			switch(type) {
				case 'company':
					return <SectionArticleEditCompany title={title} dateUpdate={dateUpdate} component={component} />
				case 'branches':
					return <SectionArticleEditBranches title={title} dateUpdate={dateUpdate} component={component} />
				case 'menus':
					return <SectionArticleEditMenus title={title} dateUpdate={dateUpdate} component={component} />
				case 'menus-detail':
					return <SectionArticleEditMenusDetail title={title} dateUpdate={dateUpdate} component={component} />
				default:
					return <SectionArticleEditCompany title={title} dateUpdate={dateUpdate} component={component} />
			}
		};

		return sectionArticleComponent();
	}
};

SectionArticleEdit.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleEdit;