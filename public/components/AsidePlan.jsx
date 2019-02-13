import React, { Component, PropTypes } from 'react';

class AsidePlan extends Component {
	render() {
		const { component } = this.props;

		return (
			<aside className="aside aside--plan">
	            <section className="aside--section contacts--excellence">
	                <h1 className="aside--title">Current Plan</h1>

	                <div className="contact--service global-padding-wrapper">
	                    <img src="assets/images/icon-diamond-blue.png" alt="Icon of current plan" /><h2 className="contact--service--subtitle">Diamond</h2>
	                    <h3 className="contact--service--subsubtitle">
	                        Unlimited menus<br />
	                        Automatic menu translation<br />
	                        Hotspot &amp; Captive Portal integration<br />
	                        Advanced statistics<br />
	                        Dedicated support
	                    </h3>
	                </div>
	            </section>
	        </aside>
		)
	}
};

AsidePlan.propTypes = {
	component: PropTypes.object
};

export default AsidePlan;