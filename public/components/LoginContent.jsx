import React, { Component, PropTypes } from 'react';

import BranchImage from './BranchImage';

class LoginContent extends Component {
	render () {
		const { images } = this.props;
		let imageComponents = '';

		if (images.length > 0) {
			imageComponents = images.map((img, index) => {
				return <BranchImage id={img.id} path={img.path} caption={img.caption} altDesc={img.altDesc} key={index} />;
			});
		}

		return (
			<main id="main" className="main clearfix">
                <a href="#," className="logo--main--login">
                    <img src="assets/images/logo-one-menu-white.png" alt="One Menu Logo" />
                </a>

                <div className="portal--desc">
                    <div className="portal--article--content">
                        <header>
                            <h1>
                                The Cafe Mediterranean
                            </h1>
                        </header>
                        <p>
                            The Mediterranean lifestyle is all about enjoying life to the fullest. <br />
                            Through fresh, healthy meals with family and friends, finding a balance between work, relaxation, and experiencing the pleasures of an active life.
                        </p>
                    </div>
                </div>

                {imageComponents}
            </main>
		);
	}
};


LoginContent.propTypes = {
	images: PropTypes.array.isRequired,
};


export default LoginContent;