import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleAddBranch from './SectionArticleAddBranch';
import SectionArticleAddMenu from './SectionArticleAddMenu';

class SectionArticleAdd extends Component {
	render() {
		const { type, title, dateUpdate, component } = this.props;

		console.log(type);

		const sectionArticleComponent = () => {
			switch(type) {
				case 'branches':
					return <SectionArticleAddBranch title={title} dateUpdate={dateUpdate} component={component} />
				case 'menus':
					return <SectionArticleAddMenu title={title} dateUpdate={dateUpdate} component={component} />
				case 'menus-detail':
					return <SectionArticleAddMenu title={title} dateUpdate={dateUpdate} component={component} />
				default:
					return <SectionArticleAddBranch title={title} dateUpdate={dateUpdate} component={component} />
			}
		};

		return sectionArticleComponent();
	}
};

SectionArticleAdd.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleAdd;