import React, { Component, PropTypes } from 'react';

import LoginHeader from './LoginHeader';
import LoginContent from './LoginContent';
import { Link } from 'react-router-dom';
const cookies = true;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state ={
      cookies:true
    }
}
  gotit(){
    this.setState({cookies:!this.state.cookies})  }
  render () {
    const { dispatch } = this.props;

    const images = [];

    return (
      <div className="global-container layout--login">
        <header id="header" className="header--small">
          <a className="main-logo" href="http://one-menu.com">
            <img src="assets/images/logo-one-menu-white.svg" alt="ONE-MENU Logo" />
          </a>
        </header>

        <main id="main" className="main clearfix">
          <div className="giant-image">
            <div className="overlay overlay--yellow"></div>
            <img src="assets/images/img-giant-image-2.jpg" alt="One Menu Restaurant" />
          </div>

          <div className="portal--desc">
              <LoginHeader dispatch={dispatch} />
          </div>
        </main>
        <div className="footer-nav">
            <ul>
              <li><a className="one-menu" href="http://one-menu.com">one-menu.com</a></li>
              <li><a href="mailto:contact@one-menu.com">contact@one-menu.com</a></li>
            </ul>
          </div>
          {this.state.cookies && <div className="cokkieBar" ref="cokkieBar">
            We use cookies to ensure that we provide you with the best possible experience. If you continue to use our portal, we will assume that you are happy with it. <a style={{color:'black', textDecoration: 'underline'}} target="blank" href="http://one-menu.com/OMDocs/legal/om_terms_and_conditions.pdf">Read More</a>
            <button onClick={()=>this.gotit()}>Got It</button>
          </div>}
      </div>
    )
  }
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default Home;
