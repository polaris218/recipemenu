import React, { Component, PropTypes } from 'react';

let createHandlers = (ctx) => {
	let onRemove = (obj, fn) => {
		ctx.setState({
			removed: true
		});
		// actually remove that thing from the global store
		if (typeof fn === 'function') {
			fn(obj);
		}
	};

	return {
		onRemove
	};
};

class MenuBranchEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			removed: false
		};
		this.handlers = createHandlers(this);
	}

	render() {
		const { id, name, onRemove } = this.props;

		return (
			<span id={"menu-branch-" + id}>
            	<span className="label--value">{name}</span>
            	<span className="status status--issue remove" onClick={(e) => this.handlers.onRemove({id, name}, onRemove)}></span>
            </span>
		)
	}
};

MenuBranchEdit.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	onRemove: PropTypes.func
};

export default MenuBranchEdit;