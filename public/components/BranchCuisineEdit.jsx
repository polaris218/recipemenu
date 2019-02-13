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

class BranchCuisineEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			removed: false
		};
		this.handlers = createHandlers(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.removed !== nextState.removed;
	}

	render() {
		const { id, title, description, onRemove } = this.props;

		return (
			<span id={"branch-cuisine-" + id}>
            	<span className="label--value">{title}</span>
            	<span className="status status--issue remove" onClick={(e) => this.handlers.onRemove({id, title, description}, onRemove)}></span>
            </span>
		)
	}
};

BranchCuisineEdit.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	onRemove: PropTypes.func
};

export default BranchCuisineEdit;