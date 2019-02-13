import React, { Component, PropTypes } from 'react';

class ContactImage extends Component {
	render() {
		const { imgPath, altDesc } = this.props;

		return (imgPath && imgPath.length > 0) ? (
			<img src={imgPath} alt={altDesc} />
		) : (
			<img src="assets/images/icon-anonymous.svg" alt="" />
		)
	}
};

ContactImage.propTypes = {
	imgPath: PropTypes.string,
	altDesc: PropTypes.string
};

export default ContactImage;