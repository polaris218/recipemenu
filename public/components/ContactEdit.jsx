import React, { Component, PropTypes } from 'react';

import ContactImageAdd from './ContactImageAdd';

let createHandlers = (ctx) => {
	let onChanges = (type, obj) => {
		if (ctx.props.onChanges && typeof ctx.props.onChanges === 'function') {
			switch (type) {
				default:
					ctx.props.onChanges(type, obj, ctx.props.id);
			}
		}
	};

	return {
		onChanges
	};
};

class ContactEdit extends Component {
	constructor(props) {
		super(props);
		this.handlers = createHandlers(this);
	}

	render() {
		const { id, firstname, lastname, tel, email, imgPath, altDesc, isAdmin, onChanges } = this.props;

		const contactImage = <ContactImageAdd imgPath={imgPath} altDesc={altDesc} onChanges={this.handlers.onChanges} />;

		return (
			<div className="branch--contact">
				<div className="contact--support global-padding-wrapper">
	                <div className="contact--support--header clearfix">
	                	{contactImage}

	                    <div className="news--text">
                       		<div className="content--edit branch--address--edit">
				            	<div className="edit--block">
                            		<label className="label--edit">Enter new First name:</label>
                        			<input className="input--edit" type="text" name="branch-Firstname" defaultValue={firstname} onChange={(e) => this.handlers.onChanges('contacts', {target: e, key: 'Firstname'}, id)} />
                        		</div>
                        		<div className="edit--block">
                            		<label className="label--edit">Enter new Last name:</label>
                        			<input className="input--edit" type="text" name="branch-Lastname" defaultValue={lastname} onChange={(e) => this.handlers.onChanges('contacts', {target: e, key: 'Lastname'}, id)} />
                        		</div>
                    		</div>
                        </div>
	                </div>
	                <div className="contact--support--details">
	                    <div className="contact--details">
	                        <h4 className="icon--contact icon--phone">Phone</h4>
	                        <div className="news--text">
	                       		<div className="content--edit branch--address--edit">
					            	<div className="edit--block">
	                            		<label className="label--edit">Enter new Phone number:</label>
	                        			<input className="input--edit" type="text" name="branch-Tel" defaultValue={tel} onChange={(e) => this.handlers.onChanges('contacts', {target: e, key: 'Tel'}, id)} />
	                        		</div>
                        		</div>
	                        </div>
	                    </div>
	                    <div className="contact--details">
	                        <h4 className="icon--contact icon--mail">Mail</h4>
	                        <div className="news--text">
	                            <div className="content--edit branch--address--edit">
					            	<div className="edit--block">
	                            		<label className="label--edit">Enter new Email:</label>
	                        			<input className="input--edit" type="text" name="branch-Email" defaultValue={email} onChange={(e) => this.handlers.onChanges('contacts', {target: e, key: 'Email'}, id)} />
	                        		</div>
                        		</div>
	                        </div>
	                    </div>
	                    <div className="contact--details clearfix">
	                   		<h4 className="icon--contact icon--mail" style={{visibility: "hidden"}}>Phone</h4>
	                        <div className="news--text">
	                            <div className="content--edit branch--address--edit">
					            	<div className="edit--block">
	                            		<label className="label--edit">Is Admin?</label>
	                        			<input className="input--edit" type="checkbox" name="branch-IsAdmin" defaultChecked={!!isAdmin} onChange={(e) => this.handlers.onChanges('contacts', {target: e, key: 'IsAdmin'}, id)} />
	                        		</div>
	                    		</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		)
	}
};

ContactEdit.propTypes = {
	id: PropTypes.number,
	imgPath: PropTypes.string,
	altDesc: PropTypes.string,
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	email: PropTypes.string,
	tel: PropTypes.string,
	isAdmin: PropTypes.number,
	onChanges: PropTypes.func
};

export default ContactEdit;