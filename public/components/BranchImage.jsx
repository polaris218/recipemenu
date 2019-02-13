import React, { Component, PropTypes } from 'react';


class BranchImage extends Component {
	render() {
		const { id, imgPath, caption, altDesc } = this.props;

		return (
            <div className="branch--image">
                <img src={imgPath} alt={altDesc} />

                {caption &&
                    <p className="branch--image--caption">{caption}</p>
                }
            </div>
		)
	}
};

BranchImage.propTypes = {
	id: PropTypes.number,
	imgPath: PropTypes.string,
	caption: PropTypes.string,
	altDesc: PropTypes.string
};

export default BranchImage;