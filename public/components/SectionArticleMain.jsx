import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import ChartPie from './ChartPie';
import Menu from './Menu';

class SectionArticleMain extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;

		const menuComponent = (component.props && component.props.menu) ? (
			<Menu id={component.id} title={component.title} ownProps={component.props.menu} />
		) : (
			<div className="global-padding-wrapper branches-container">
				<h2 className="no-items--headline">Oh no! It looks like you have not entered any menus yet.</h2>
				<div className="branch--add">
	            	<Link to="/menu/add/1" >
						<div className="add-item dashed">
							<span>Add a Menu <strong>+</strong></span>
						</div>
					</Link>
	            </div>
            </div>
		);

		return (
			<article className="content--module module--failed-assets">
                <h2 className="content--subtitle">
                    {title}
                    {dateUpdate &&
                    	<span className="title--datetime">
	                        Updated
	                        <time dateTime="">
	                            <span className="title--date"> {dateUpdate.date}</span> <span className="title--timezone">{dateUpdate.timezone}</span>
	                        </time>
	                    </span>
                    }
                </h2>

                {component.type === "ChartPie" &&
	                <ChartPie id={component.id} title={component.title} ownProps={component.props} />
	            }

	            {component.type === "Menu" &&
	            	<div className="content--container">
	            		{menuComponent}
	                </div>
	            }
            </article>
		)
	}
};

SectionArticleMain.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleMain;