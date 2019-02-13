import React, { Component, PropTypes } from 'react';

class Translation extends Component {
	render() {
		const { id, ownKey, value, language } = this.props;

		return (
			<div className="translation--container">
                <div className="translation">
                    Placeholder translation
                </div>
            </div>
		)
	}
};

Translation.propTypes = {
	id: PropTypes.number,
	ownKey: PropTypes.string,
	value: PropTypes.object,
	language: PropTypes.object
};

export default Translation;