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

class BranchCurrencyEdit extends Component {
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
		const { id, name, nameShort, symbol, description, onRemove } = this.props;

		return (
			<span id={"branch-currency-" + id}>
            	<span className="label--value">{name + ' (' + symbol + ')'}</span>
            	<span className="status status--issue remove" onClick={(e) => this.handlers.onRemove({id, name, nameShort, symbol, description}, onRemove)}></span>
            </span>
		)
	}
};

BranchCurrencyEdit.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	nameShort: PropTypes.string,
	symbol: PropTypes.string,
	description: PropTypes.string,
	onRemove: PropTypes.func
};

export default BranchCurrencyEdit;