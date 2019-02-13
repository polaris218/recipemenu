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

class BranchLanguageAdd extends Component {
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
		const id = 9827376;

		console.log(id, this.state.removed);

		const languageComponent = //(!this.state.removed) ? (
            <div id={"branch-language-add"} className="content--label">
                <h3 className="label--key">Add Language:</h3>
                <span className="label--value"></span>
                <span className="status status--issue remove" onClick={(e) => this.handlers.onRemove({id}, onRemove)}></span>
            </div>
		//) : null;

		return languageComponent;
	}
};

BranchLanguageAdd.propTypes = {
	onRemove: PropTypes.func
};

export default BranchLanguageAdd;