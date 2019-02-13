import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import SectionArticleDelete from './SectionArticleDelete';

class SectionDelete extends Component {
	render() {
		const { dataText, actionText, data } = this.props;

		console.log(data);

		return (
			<SectionArticleDelete type={data.type} title={data.title} component={data.component} />
		)
	}
};

SectionDelete.propTypes = {
	dataText: PropTypes.string,
	actionText: PropTypes.string,
	data: PropTypes.object
};

export default SectionDelete;