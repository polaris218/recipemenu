import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

const classNames = require('classnames');

import SectionArticleMain from './SectionArticleMain';
import SectionArticleCompany from './SectionArticleCompany';
import SectionArticleAnalytics from './SectionArticleAnalytics';
import SectionArticleBranches from './SectionArticleBranches';
import SectionArticleMenus from './SectionArticleMenus';
import SectionArticleMenusDetail from './SectionArticleMenusDetail';
import SectionArticleTranslations from './SectionArticleTranslations';
import SectionArticleTranslate from './SectionArticleTranslate';

class SectionArticle extends Component {
	render() {
		const { type, title, dateUpdate, component } = this.props;

		console.log(type);
		const sectionArticleComponent = () => {
			switch(type) {
				case 'main':
					return <SectionArticleMain title={title} dateUpdate={dateUpdate} component={component} />
				case 'company':
					return <SectionArticleCompany title={title} dateUpdate={dateUpdate} component={component} />
				case 'analytics':
					return <SectionArticleAnalytics title={title} dateUpdate={dateUpdate} component={component} />
				case 'branches':
					return <SectionArticleBranches title={title} dateUpdate={dateUpdate} component={component} />
				case 'menus':
					return <SectionArticleMenus title={title} dateUpdate={dateUpdate} component={component} />
				case 'menus-detail':
					return <SectionArticleMenusDetail title={title} dateUpdate={dateUpdate} component={component} />
				case 'translations':
					return <SectionArticleTranslations title={title} dateUpdate={dateUpdate} component={component} />
				case 'translate':
					return <SectionArticleTranslate title={title} dateUpdate={dateUpdate} component={component} />
				default:
					return <SectionArticleMain title={title} dateUpdate={dateUpdate} component={component} />
			}
		};

		return sectionArticleComponent();
	}
};

SectionArticle.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticle;