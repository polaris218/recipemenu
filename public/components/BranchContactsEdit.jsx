import React, { Component, PropTypes } from 'react';

import * as DomUtils from '../shared/dom.utils';

import ContactEdit from './ContactEdit';
import LanguagePicker from './LanguagePicker';

let createHandlers = (ctx) => {
	let onAdd = () => {
		ctx.setState((prevState) => {
			let contacts = prevState.allContacts;

			let nextID = 1;
     		if (contacts.length > 0) {
    			//nextID = parseInt(contacts[contacts.length - 1].BranchContactID, 10) + 1;
    			nextID = contacts.reduce((acc, contact) => {
    				return Math.max(acc, parseInt(contact.BranchContactID, 10));
    			}, 0) + 1;
    		}

			let obj = {
				BranchContactID: nextID,
				BranchID: ctx.props.branchId,
				Firstname: '',
				Lastname: '',
				ImagePath: '',
				ImageAltDesc: '',
				Email: '',
				Tel: '',
				IsAdmin: 0
			};

			console.log(obj);

			contacts.push(obj);

			ctx.props.onChange('contacts', {data: contacts});

			return {
				allContacts: contacts
			}
		});
	};

	let onChanges = (type, obj, id) => {
		console.log(type, obj, id);

		if (type !== 'contactimage') {
			obj.target.persist();
		}

		ctx.setState((prevState) => {
			let contacts = prevState.allContacts.map(prevContact => {
				if (prevContact.BranchContactID === id) {
					let newContact = prevContact;

					switch (type) {
						case 'contactimage':
							if (obj.imagePreviewUrl) {
								newContact.ImageAltDesc = '';
								newContact.file = obj.file;
								newContact.ImagePath = obj.imagePreviewUrl;
								newContact.BranchID = ctx.props.branchId;
							}

							return newContact;
						default:
							console.log('enters default!!!!!!!!!');
							if (obj.target.target.type === 'checkbox') {
								newContact[obj.key] = obj.target.target.checked;
							} else {
								newContact[obj.key] = obj.target.target.value;
							}

							return newContact;
					}
				}

				return prevContact;
			});

			console.log(contacts);

			ctx.props.onChange('contacts', {data: contacts});

			return {
				allContacts: contacts
			};
		});
	};

	let onRemove = (obj) => {
		ctx.setState((prevState) => {
			let contacts = prevState.allContacts.reduce((acc, current) => {
				return (current.id !== obj.id) ? acc.concat([current]) : acc;
			}, []);

			console.log(prevState.allContacts);

			console.log(contacts);

			ctx.props.onChange('contacts', {data: contacts});

			return {
				allContacts: contacts
			}
		});
	};

	return {
		onAdd,
		onChanges,
		onRemove
	};
};

class BranchContactsEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allContacts: props.contacts
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const { contacts, onChange, branchId } = this.props;

		console.log(this.state.allContacts);

		const contactComponents = (this.state.allContacts && this.state.allContacts.length > 0) ? this.state.allContacts.map((contact, index) => {
			return <ContactEdit id={contact.BranchContactID} imgPath={contact.ImagePath} altDesc={contact.ImageAltDesc} firstname={contact.Firstname} lastname={contact.Lastname} isAdmin={parseInt(contact.IsAdmin, 10)} email={contact.Email} tel={contact.Tel} key={index} onChanges={this.handlers.onChanges} />;
		}) : null;

		return (
			<div>
				{contactComponents}

				<div className="branch--add contact--add">
                	<div onClick={(e) => this.handlers.onAdd()}>
						<div className="add-item dashed">
							<span>Add a Contact <strong>+</strong></span>
						</div>
					</div>
                </div>
			</div>
		)
	}
};

BranchContactsEdit.propTypes = {
	contacts: PropTypes.array,
	onChange: PropTypes.func,
	branchId: PropTypes.number
};

export default BranchContactsEdit;