import React, { Component, PropTypes } from 'react';

class BranchLanguage extends Component {
	render() {
		const { id, code, codeFull, name, title } = this.props;

		const finalCode = codeFull || code;

		return (
            <div id={"branch-language-" + id} className="content--label">
                <h3 className="label--key">{name}:</h3>
                <span className="label--value">{finalCode} - {title}</span>
            </div>
		)
	}
};

BranchLanguage.propTypes = {
	id: PropTypes.number,
	code: PropTypes.string,
	codeFull: PropTypes.string,
	name: PropTypes.string,
	title: PropTypes.string
};

export default BranchLanguage;