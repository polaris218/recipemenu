import React, { Component, PropTypes } from 'react';

import ContactImageAdd from './ContactImageAdd';

class ContactAdd extends Component {
	render() {
		const contactImage = (
			<ContactImageAdd imgPath={"assets/images/icon-person-add.svg"} altDesc={"Edit contact image"} />
		);

		return (
			<div className="branch--contact">
				<div className="contact--support global-padding-wrapper">
	                <div className="contact--support--header clearfix">
	                    {contactImage}

	                    <div className="news--text">
                       		<div className="content--edit branch--address--edit">
				            	<div className="edit--block">
                            		<label className="label--edit">Enter new First name:</label>
                        			<input className="input--edit" type="text" name="branch-firstname" placeholder="New first name..." />
                        		</div>
                        		<div className="edit--block">
                            		<label className="label--edit">Enter new Last name:</label>
                        			<input className="input--edit" type="text" name="branch-lastname" placeholder="New last name..." />
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
	                        			<input className="input--edit" type="text" name="branch-phone" placeholder="New phone..." />
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
	                        			<input className="input--edit" type="text" name="branch-email" placeholder="New email..." />
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

export default ContactAdd;