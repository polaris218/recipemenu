import React, { Component, PropTypes } from 'react';

class MealDetail extends Component {
	render() {
		const { id, title, description, medias } = this.props;

		return (
			<div>
				Placeholder MealDetail
            </div>
		)
	}
};

MealDetail.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	description: PropTypes.string,
	medias: PropTypes.array
};

export default MealDetail;