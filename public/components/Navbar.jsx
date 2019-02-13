import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render () {
    const { logo } = this.props;

    return (
      <header className="navigation">
        <h1 className="logo--main--dashboard">
            <a href="index.html"><img style={{width: 100 + '%'}} src={logo.imgPath} alt={logo.altDesc} /></a>
        </h1>

        <nav className="navigation--main">
            <ul className="navigation--first-level">
                <li>
                    <Link className="nav-active" to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link className="has-subnav subnav-opened" to="/menus">Menus</Link>
                </li>
                <li>
                    <Link className="has-subnav subnav-opened" to="/translations">Translations</Link>
                </li>
                <li>
                    <Link className="has-subnav subnav-opened" to="/profile/get">Profile</Link>
                    <ul className="navigation--sub-level">
                        <li><Link to="/branches">Branches</Link></li>
                    </ul>
                </li>
                {/*
                <li>
                    <a href="#,">Statistics</a>
                </li>
                <li>
                    <a href="#,">Support</a>
                </li>
                */
                }
            </ul>
        </nav>

        <ul className="navigation--secondary">
            <li>
                <a className="link-icon icon--faq" href="mailto:contact@one-menu.com">
                    Need help?
                    Send us an email at: <br />
                    <span>contact@one-menu.com</span>
                </a>
            </li>
        </ul>
        {/*
        <ul className="navigation--secondary">
            <li><a className="link-icon icon--configuration" href="#,">Settings</a></li>
            <li><a className="link-icon icon--faq" href="faqs.html">FAQS</a></li>
        </ul>
        */}
    </header>
    )
  }
};

Navbar.propTypes = {
  logo: PropTypes.object
};

export default Navbar;
