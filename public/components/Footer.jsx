import React, { Component, PropTypes } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="footer clearfix">
                <div className="footer--logo">
                    <p>Powered by</p>
                    <img src="assets/images/logo-one-menu-bluegrey.png" alt="Logo of One Menu" />
                </div>
                <div className="footer--menu clearfix">
                    {/*
                    <ul>
                        <li><a href="#,">one-menu.com</a></li>
                        <li><a href="#,">Terms &amp; Conditions</a></li>
                        <li><a href="#,">Contact</a></li>
                    </ul>
                    */}
                </div>
            </footer>
		)
	}
};

export default Footer;