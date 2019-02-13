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

class BranchLanguageEdit extends Component {
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
		const { id, code, codeFull, name, title, onRemove } = this.props;

		console.log(id, this.state.removed);

		const finalCode = codeFull ? codeFull : code;

		const languageComponent = //(!this.state.removed) ? (
            <div id={"branch-language-" + id} className="content--label">
                <h3 className="label--key">{name}:</h3>
                <span className="label--value">{finalCode} - {title}</span>
                <span className="status status--issue remove" onClick={(e) => this.handlers.onRemove({id, code, codeFull, name}, onRemove)}></span>
            </div>
		//) : null;

		return languageComponent;
	}
};

BranchLanguageEdit.propTypes = {
	id: PropTypes.number,
	code: PropTypes.string,
	codeFull: PropTypes.string,
	name: PropTypes.string,
	title: PropTypes.string,
	onRemove: PropTypes.func
};

export default BranchLanguageEdit;