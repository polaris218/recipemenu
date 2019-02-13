import React, { Component, PropTypes } from 'react';
import { Redirect, Route } from 'react-router';
import { Link } from 'react-router-dom';

import FormData from 'formdata-polyfill';

import * as actionCreators from '../action-creators';

let createHandlers = (ctx) => {
	let onSubmit = (e) => {
        e.preventDefault();
        var data = ctx.getDataFromEvent(e);
        data.code = window.location.href.substr(window.location.href.indexOf("reset/")+6, window.location.href.length)
		ctx.props.dispatch(actionCreators.updatePassword(data, (res) => {
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

class ResetPasswordHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasToRedirect: false,
            errorMessage: '',
            message:''
		};
        this.handlers = createHandlers(this);
        var body = {
            code: window.location.href.substr(window.location.href.indexOf("reset/")+6, window.location.href.length)
        }
        this.props.dispatch(actionCreators.checkResetCode(body, (res) => {
            console.log(res)
			if (res) {
				this.setState({
					message: res.message
				});
			}
			if (res.error) {
				this.setState({
					message: res.error
				});
			}
		}));
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
			        	<div className="login-container forgot-form">
				            <h1 className="login--title">
				                Reset Password
				            </h1>
							<h5>
							    Please enter a new passowrd.
				            </h5>
				            <form id="login-form" className="login--form" action="#">
				                <p className="login--input">
				                    <label className="login--label label--username" htmlFor="login--username">New password</label>
				                    <input type="password" name="Pwd" id="login--username" className="input--underline" placeholder="New password" />
				                </p>
				                <p className="error">
                                    {this.state.message}
                                </p>
				                <button id="button--login" className="button button--login-outline" onClick={this.handlers.onSubmit}>Update password</button>
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

ResetPasswordHeader.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default ResetPasswordHeader;