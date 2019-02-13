import React, { Component, PropTypes } from 'react';

import { Redirect, Route } from 'react-router';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import BranchLanguage from './BranchLanguage';

let createHandlers = (ctx) => {
	let onTranslate = (props) => {
		console.log('menu to be translated!');

		if (props.hasOwnProperty('menu')) {
			ctx.props.dispatch(actionCreators.translateMenu(props.component.props, onMenuTranslateRequestDone));
		}
	};

	let onMenuTranslateRequestDone = (obj) => {
		console.log('translation request done! ');

		ctx.setState({
			isTranslateRequestDone: true,
			component: {
				type: 'menu',
				obj: ctx.props.component
			}
		});
	};

	return {
		onTranslate,
		onMenuTranslateRequestDone
	};
};

class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isTranslateRequestDone: false,
			requestComesFromMenuCreation: (props.component.props && props.component.props.languages && props.component.props.languages.length > 0) ? true : false,
			component: {}
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {

	}

	render() {
		const { type, component } = this.props;

		console.log(this.props);

		const languageProps = (component.props && component.props.languages && component.props.languages.length > 0) ? component.props.languages : (this.props.menu && this.props.menu.languages && this.props.menu.languages.length > 0) ? this.props.menu.languages : [];

		const languages = (languageProps && languageProps.length > 0) ? languageProps.map((lang, index) => {
			const finalLanguage = (lang.Language) ? lang.Language : lang;
			return <BranchLanguage id={finalLanguage.LanguageID} code={finalLanguage.Code} codeFull={finalLanguage.CodeFull} name={finalLanguage.Name} title={finalLanguage.Title} key={index} />;
		}) : null;

		const alertComponent = (this.state.isTranslateRequestDone || !this.state.requestComesFromMenuCreation)
			? (
				<Redirect to={{
					pathname: '/translations'
				}} />
			) : (
				<article className="content--module module--alert">
	                <header className="content--container--header header--green">
	                    <h2 className="content--container--title">Menu saved!</h2>
	                </header>
	                <div className="alert--container content--container">
	                    <div className="grid alert--content">
	                        <div className="content--label">
	                            <span className="label--value">Your menu has been saved successfully! Do you want to translate your changes immediately? <br/> (You can always do so later)</span>
	                        </div>
	                        <div className="content--label">
	                        	<h3>Languages to be translated in:</h3>
	                        	{languages}
	                        </div>
	                    </div>

	                    <footer className="alert--footer group-buttons global-padding-wrapper push-right">
	                    	<button id="menu-translate" className="button--action button--action-filled" onClick={(e) => this.handlers.onTranslate(this.props)}>Translate your menu</button>
	                    </footer>
	                </div>
	            </article>
			);

		return alertComponent;
	}
};

Alert.propTypes = {
	type: PropTypes.string,
	component: PropTypes.object
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		menu: state._menu.menu
	}
};

export default connect(mapStateToProps)(Alert);