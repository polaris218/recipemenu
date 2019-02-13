import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleEdit from './SectionArticleEdit';

class SectionEdit extends Component {
	render() {
		const { dataText, actionText, data } = this.props;

		console.log(data);

		return (
			<SectionArticleEdit type={data.type} title={data.title} component={data.component} />
		)
	}
};

SectionEdit.propTypes = {
	dataText: PropTypes.string,
	actionText: PropTypes.string,
	data: PropTypes.object
};

export default SectionEdit;