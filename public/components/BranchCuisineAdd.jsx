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

class BranchCuisineAdd extends Component {
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
		const { onRemove } = this.props;
		const id = 8766;

		return (
			<span id={"branch-cuisine-add"}>
            	<span className="label--value">Add Cuisine Type</span>
            	<span className="status status--issue remove" onClick={(e) => this.handlers.onRemove({id}, onRemove)}></span>
            </span>
		)
	}
};

BranchCuisineAdd.propTypes = {
	onRemove: PropTypes.func
};

export default BranchCuisineAdd;