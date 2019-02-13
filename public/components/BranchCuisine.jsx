import React, { Component, PropTypes } from 'react';

class BranchCuisine extends Component {
	render() {
		const { id, title, description } = this.props;

		return (
            <span id={"branch-cuisine-" + id} className="label--value">{title}</span>
		)
	}
};

BranchCuisine.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string
};

export default BranchCuisine;