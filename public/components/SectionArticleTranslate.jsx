import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import Alert from './Alert';

class SectionArticleTranslate extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;

        console.log(component);

        const alertComponent = (
            <Alert type={"Alert"} component={component} />
        );

		return alertComponent;
	}
};

SectionArticleTranslate.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleTranslate;