import React, { Component, PropTypes } from 'react';

import Footer from './Footer';

class Page extends Component {
  render () {
    return (
        <div id="global-container" className="global-container layout--dashboard">
            <div>
                {this.props.children}
                <Footer />
            </div>
        </div>
    )
  }
};

export default Page;
