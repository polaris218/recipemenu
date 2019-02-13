import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleDeleteBranch from './SectionArticleDeleteBranch';
import SectionArticleDeleteMenu from './SectionArticleDeleteMenu';

class SectionArticleDelete extends Component {
	render() {
		const { type, title, dateUpdate, component } = this.props;

		console.log(type);

		const sectionArticleComponent = () => {
			switch(type) {
				case 'branches':
					return <SectionArticleDeleteBranch title={title} dateUpdate={dateUpdate} component={component} />
				case 'menus':
					return <SectionArticleDeleteMenu title={title} dateUpdate={dateUpdate} component={component} />
				case 'menus-detail':
					return <SectionArticleDeleteMenu title={title} dateUpdate={dateUpdate} component={component} />
				default:
					return <SectionArticleDeleteBranch title={title} dateUpdate={dateUpdate} component={component} />
			}
		};

		return sectionArticleComponent();
	}
};

SectionArticleDelete.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleDelete;