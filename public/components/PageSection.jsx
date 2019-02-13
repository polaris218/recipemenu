import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const classNames = require('classnames');

import SectionArticle from './SectionArticle';
import SectionEdit from './SectionEdit';
import SectionAdd from './SectionAdd';
import SectionDelete from './SectionDelete';

class PageSection extends Component {
	getDataFromArticles(str, articles) {
		return articles.find((article, index) => {
			if (str === 'profile') {
				return article.type === 'company' || article.type === str;
			}

			if (str === 'branch') {
				return article.type === 'branches' || article.type === str;
			}

			if (str === 'menu') {
				return article.type === 'menus' || article.type === 'menus-detail' || article.type === str;
			}

			return article.type === str;
		});
	}


	render() {
		const { type, title, articles } = this.props;
		const dataText = type.split('-')[0];
		const action = type.substring(type.lastIndexOf('-') + 1, type.length);
		const actionText = (action.length > 0 && action !== type && action !== 'get') ? action.charAt(0).toUpperCase() + action.slice(1) : '';

		console.log(articles);
		console.log(dataText, actionText);
		console.log(action);

		let articleComponents = null;

		if (dataText.length > 0 && actionText) {

			if (action === 'edit') {
				articleComponents = (<SectionEdit dataText={dataText} data={this.getDataFromArticles(dataText, articles)} actionText={actionText} />);
			}

			if (action === 'add') {
				articleComponents = (<SectionAdd dataText={dataText} data={this.getDataFromArticles(dataText, articles)} actionText={actionText} />);
			}

			if (action === 'delete') {
				articleComponents = (<SectionDelete dataText={dataText} data={this.getDataFromArticles(dataText, articles)} actionText={actionText} />);
			}

			if (dataText === 'translate') {
				articleComponents = articles.map((article, index) => {
					return <SectionArticle action={dataText} type={article.type} title={article.title} dateUpdate={article.dateUpdate} component={article.component} key={index} />;
				});
			}
		} else {
			if (articles.length > 0) {
				articleComponents = articles.map((article, index) => {
					return <SectionArticle action={action} type={article.type} title={article.title} dateUpdate={article.dateUpdate} component={article.component} key={index} />;
				});
			}
		}

		const classes = classNames(
			'content--section',
			'section--dashboard',
			'section--type-' + type
		);

		return (
			<section className={classes}>
	            <PageSectionTitle actionText={actionText} title={title} />

	            {articleComponents}
	        </section>
		)
	}
};

PageSection.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
    articles: PropTypes.array.isRequired
};

class PageSectionTitle extends Component {
	render() {
		const { actionText, title } = this.props;

		return (actionText) ? (
			<div>
				<ul className="breadcrumbs">
	                <li>{'<'} <Link to="/profile/get">Back to Profile</Link></li>
	            </ul>
				<h1 className="content--title"><span>{actionText}</span> {title}</h1>
			</div>
		) : (
			<h1 className="content--title">{title}</h1>
		)
	}
};

PageSectionTitle.propTypes = {
	actionText: PropTypes.string,
	title: PropTypes.string
};


export default PageSection;