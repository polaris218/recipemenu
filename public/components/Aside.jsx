import React, { Component, PropTypes } from 'react';

import AsidePlan from './AsidePlan';
import AsidePreview from './AsidePreview';

class Aside extends Component {
	render () {
		const { type } = this.props;

		const asideComponent = () => {
			switch(type) {
				case 'plan':
					return <AsidePlan />
				case 'preview':
					return <AsidePreview save={true} />
				case 'preview-menu-get':
					return <AsidePreview save={false} />
				case 'preview-menu-add':
					return <AsidePreview save={true} />
				case 'preview-menu-edit':
					return <AsidePreview save={true} />
				default:
					return <AsidePlan />
			}
		};

		return asideComponent();
	}
};

Aside.propTypes = {
	type: PropTypes.string
};

export default Aside;