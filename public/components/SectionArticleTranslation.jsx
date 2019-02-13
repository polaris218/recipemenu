import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

const classNames = require('classnames');

import Menu from './Menu';
import Translation from './Translation';

let createHandlers = (ctx) => {
	let headerOnClick = () => {
	    ctx.setState((prevState) => {
			return {
				expanded: !prevState.expanded
			};
		});
	};

	let mealHeaderOnClick = () => {
		ctx.setState((prevState) => {
			return {
				mealExpanded: !prevState.mealExpanded
			};
		});
	};

 	let goToMenu = () => {
  		ctx.setState({
  			redirect: true
  		});
  	};

  	return {
    	goToMenu,
    	headerOnClick,
    	mealHeaderOnClick
  	};
};

class SectionArticleTranslation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			mealExpanded: false
		};
		this.handlers = createHandlers(this);
	}

	convertToMenu(cats) {
		return cats;
	}

	render() {
		const {
			id,
			title,
			type,
			originalText,
			translatedText,
			languageName,
			propKey,
			status
		} = this.props;

		console.log(this.props);

		const translationStatus = (status === 'COMPLETED') ? 
			(
				<div className="translation--status">
					<div className="content--container">
                		<div className="food-menu completed">
							Translation is complete!
						</div>
					</div>
				</div>
			) : (
				<div className="translation--status">
					<div className="content--container">
                		<div className="food-menu pending">
							Translation is pending...
						</div>
					</div>
				</div>
			);

		const classes = classNames(
			'branch--contact--header',
			'collapsable',
			'status--' + status.toLowerCase(),
			(this.state.expanded) ? 'opened' : ''
		);

		if (this.state.redirect) {
			return <Redirect push to={"/menu/get/" + id} />;
		}

		let languageComponent = (
			<span className="language--name">
				<span>{languageName}</span>
			</span>
		);

		return (
			<div className="article--menu">
				<div className="branch--contact aside--section contacts--support">
					<header className={classes} onClick={this.handlers.headerOnClick}>
						<div className="header--title-container">
							<h1 className="aside--title collapsable--title">
								{type}: {originalText} - {languageName}
							</h1>
						</div>
					</header>
					<div className="global-padding-wrapper">
						<div className="article--menu--translations">
							<header className="article--menu--translations--header">
								<p className="menu--title">
									Translation of your {type} {propKey} in {languageName} :
								</p>
								<div>
									<div className="content--label">
										<h3 className="label--key">Original {propKey}:</h3>
										<span className="label--value">{originalText}</span>
									</div>
								</div>
								<div>
									<div className="content--label">
										<h3 className="label--key">Translated {propKey}:</h3>
										<span className="label--value">{translatedText}</span>
									</div>
								</div>
							</header>
						</div>
						<div className="goto">
							<p className="menu--title">
								Translation Status
							</p>
							{translationStatus}
						</div>
					</div>
				</div>
			</div>
		)
	}
};

SectionArticleTranslation.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	type: PropTypes.string,
	originalText: PropTypes.string,
	translatedText: PropTypes.string,
	languageName: PropTypes.string,
	propKey: PropTypes.string,
	status: PropTypes.string
};

export default SectionArticleTranslation;