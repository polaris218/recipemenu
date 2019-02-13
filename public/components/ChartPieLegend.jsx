import React, { Component, PropTypes } from 'react';

class ChartPieLegend extends Component {
	render() {
		const { label, title, value, classes } = this.props;

		return (
			<p className={classes}>
              	<a href="#,">
                	{label}<br />
                   	<strong>{value}</strong>
                </a>
            </p>
		)
	}
};

ChartPieLegend.propTypes = {
	label: PropTypes.string,
	title: PropTypes.string,
	value: PropTypes.number,
	classes: PropTypes.string
};

export default ChartPieLegend;