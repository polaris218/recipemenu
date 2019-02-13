import React, { Component, PropTypes } from 'react';
import { Redirect, Route } from 'react-router';
import { Link } from 'react-router-dom';

import FormData from 'formdata-polyfill';

import * as actionCreators from '../action-creators';

let createHandlers = (ctx) => {
	let onLogin = (e) => {
		e.preventDefault();
		ctx.props.dispatch(actionCreators.getAuth(ctx.getDataFromEvent(e), (res) => {
			console.log(res);
			if (res && res.authenticated) {
				ctx.setState({
					hasToRedirect: true
				});
			}

			if (res.error) {
				ctx.setState({
					errorMessage: res.error
				});
			}
		}));
	};

	return {
		onLogin
	};
};

class LoginHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasToRedirect: false,
			errorMessage: ''
		};
		this.handlers = createHandlers(this);
	}

	getDataFromEvent(e) {
		e.preventDefault();

		let formData = new FormData(e.target.parentNode);
		let obj = {};

		for (let pair of formData.entries()) {
		   obj[pair[0]] = pair[1];
		}

		return {
			auth: obj
		};
	}

	render () {
		const { dispatch, token, isAuthenticated, completed } = this.props;

		const renderErrorMessage = (this.state.errorMessage) ? (
			<p className="error">
				{this.state.errorMessage}
			</p>
		) : null;

		return (!this.state.hasToRedirect) ? (
			<div className="login-block">
			    <div className="layout--header-wrapper vertical-container">
			        <div className="vertically-centered">
			        	<div className="login-container">
				            <h1 className="login--title">
				                Management Portal
				            </h1>
							<h5>
							Dont have an account? <Link  style={{fontSize:"0.75rem"}} className="login--link" to="/signup">Create Account</Link>
				            </h5>
				            <form id="login-form" className="login--form" action="#">
				                <p className="login--input">
				                    <label className="login--label label--username" htmlFor="login--username">Username</label>
				                    <input type="text" name="Email" id="login--username" className="input--underline" placeholder="Username" />
				                </p>
				                <p className="login--input">
				                    <label className="login--label label--password" htmlFor="login--password">Password</label>
				                    <input type="password" name="Pwd" id="login--password" className="input--underline" placeholder="Password" />
				                </p>

				                {renderErrorMessage}
				                <button id="button--login" className="button button--login-outline" onClick={this.handlers.onLogin}>Log In</button>
				            </form>
				            <a className="login--link">
				                <Link to="forgot">Forgotten your details?</Link>
				            </a>
			            </div>
			        </div>
			    </div>
			</div>
		) : (
	    	<Redirect to={{
	        	pathname: '/dashboard',
	        	state: { from: this.props.location }
	    	}} />
	    );
	}
};

LoginHeader.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default LoginHeader;