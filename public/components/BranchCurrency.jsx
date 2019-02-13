import React, { Component, PropTypes } from 'react';

class BranchCurrency extends Component {
	render() {
		const { id, name, nameShort, symbol, description } = this.props;

		return (
            <span id={"branch-currency-" + id}>
            	<span className="label--value">{name + ' (' + symbol + ')'}</span>
            </span>
		)
	}
};

BranchCurrency.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	nameShort: PropTypes.string,
	symbol: PropTypes.string,
	description: PropTypes.string
};

export default BranchCurrency;