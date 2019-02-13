import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleAdd from './SectionArticleAdd';

class SectionAdd extends Component {
	render() {
		const { dataText, actionText, data } = this.props;

		console.log(data);

		const { type = '', title = '', component = {}} = data || {};

		return (
			<SectionArticleAdd type={type} title={title} component={component} />
		)
	}
};

SectionAdd.propTypes = {
	dataText: PropTypes.string,
	actionText: PropTypes.string,
	data: PropTypes.object
};

export default SectionAdd;