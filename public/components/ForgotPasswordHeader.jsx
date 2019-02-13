import React, { Component, PropTypes } from 'react';
import { Redirect, Route } from 'react-router';
import { Link } from 'react-router-dom';

import FormData from 'formdata-polyfill';

import * as actionCreators from '../action-creators';

let createHandlers = (ctx) => {
	let onSubmit = (e) => {
		e.preventDefault();
		ctx.props.dispatch(actionCreators.forgotPassword(ctx.getDataFromEvent(e), (res) => {
            console.log(res)
			if (res) {
				ctx.setState({
					message: res.message
				});
			}
			if (res.error) {
				ctx.setState({
					message: res.error
				});
			}
		}));
	};

	return {
		onSubmit
	};
};

class ForgotPasswordHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasToRedirect: false,
            errorMessage: '',
            message:''
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

		return (!this.state.hasToRedirect) ? (
			<div className="login-block">
			    <div className="layout--header-wrapper vertical-container">
			        <div className="vertically-centered">
			        	<div className="login-container">
				            <h1 className="login--title">
				                Reset Password
				            </h1>
							<h5>
							    Enter your email here and we will send you a link to reset your password.
				            </h5>
				            <form id="login-form" className="login--form" action="#">
				                <p className="login--input">
				                    <label className="login--label label--username" htmlFor="login--username">Your Email</label>
				                    <input type="text" name="Email" id="login--username" className="input--underline" placeholder="Your Email" />
				                </p>

				                <p className="error">
                                    {this.state.message}
                                </p>
				                <button id="button--login" className="button button--login-outline" onClick={this.handlers.onSubmit}>Send reset link</button>
				            </form>
				            <a className="login--link">
				                <Link to="/home">Back to Login page.</Link>
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

ForgotPasswordHeader.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default ForgotPasswordHeader;