import React, { Component, PropTypes } from 'react';

import ChartPieLegend from './ChartPieLegend';
const classNames = require('classnames');

class ChartPie extends Component {
	render() {
		const { id, title, ownProps } = this.props;

		const description = (Object.keys(ownProps.description).length > 0)
			? <p className="pie-chart--description">
				Of <span className="legend--assets">{ownProps.description.value}</span> {ownProps.description.label}
	          </p>
			: '';

		const legends = (ownProps.legends.length > 0)
			? ownProps.legends.map((p, index) => {
				const color = p.color ? p.color : '';
				const classes = classNames(
					'pie-chart--legend',
					'legend--' + color
				);
				return <ChartPieLegend classes={classes} label={p.label} title={p.key} value={p.value} key={index} />;
	          })
	        : '';

		return (
			<div className="content--container pie-chart--small has-table">
	            <figure id="chart-donut-1" className="content--pie-chart clearfix">
	                <svg width="174" height="174" className="chart--donut--svg"><g transform="translate(87,87)"><path d="M5.327213576290987e-15,-87A87,87,0,1,1,-58.21436275322064,64.65359981653332L-31.449138498866322,34.92780679743754A47,47,0,1,0,2.87791997799628e-15,-47Z" className="donut--purple"></path><path d="M-58.21436275322064,64.65359981653332A87,87,0,0,1,-1.598164072887296e-14,-87L-8.633759933988839e-15,-47A47,47,0,0,0,-31.449138498866322,34.92780679743754Z" className="donut--red"></path><text className="chart--total" y="10">3000</text></g></svg><img className="pie-chart--image" src="assets/images/img-pie-chart-3000.svg" alt="" />
	                <figcaption className="pie-chart--legends">
	                	{description}
	                	<div className="pie-chart--legend-container clearfix">
	                		{legends}
	                	</div>
	                </figcaption>
	            </figure>
	            <div className="content--table-container has-hover">
	                <table className="table--content"></table>
	            </div>
	        </div>
		)
	}
};

ChartPie.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	ownProps: PropTypes.object
};

export default ChartPie;