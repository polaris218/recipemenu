import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';


class SectionArticleCompany extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;

		return (
			<article className="content--module module--item-details no-metadata content--company">
                <div className="content--container global-padding-wrapper">
                	<header className="content--company--header">
                		<div className="header--title-container">
		                    <h2 className="asset--title">
		                        {component.props.name}
		                    </h2>
	                    </div>
	                    <div className="header--actions">
							<ul>
								<li>
									<Link to="/profile/edit" className="action--edit">
										Edit
									</Link>
								</li>
							</ul>
						</div>
					</header>
                </div>

                <div className="content--container global-padding-wrapper no-border-top">
                    <div className="address-container">
                        {component.props.name &&
                            <div className="content--label">
                                <h3 className="label--key">Website:</h3>
                                <span className="label--value">
                                <a href={component.props.website}>{component.props.name}</a></span>
                            </div>
                        }
                        {component.props.logo.imgPath &&
                            <div className="content--label address-image">
                                <h3 className="label--key">Logo:</h3>
                                <span className="label--value">
                                    <img src={component.props.logo.imgPath} alt={component.props.logo.altDesc} />
                                </span>
                            </div>
                        }
                        {component.props.website &&
                            <div className="content--label">
                                <h3 className="label--key">Website:</h3>
                                <span className="label--value">
                                <a href={component.props.website}>{component.props.website}</a></span>
                            </div>
                        }
                        {component.props.email &&
                            <div className="content--label">
                                <h3 className="label--key">Email:</h3>
                                <span className="label--value">
                                <a href={"mailto:" + component.props.email}>{component.props.email}</a></span>
                            </div>
                        }
                        {component.props.tel &&
                            <div className="content--label">
                                <h3 className="label--key">Phone:</h3>
                                <span className="label--value">
                                <a href={"tel:" + component.props.tel}>{component.props.tel}</a></span>
                            </div>
                        }
                    </div>
                    <div className="profile-social">
                        <ul>
                            {component.props.social.twitter &&
                                <li>
                                	<a className="icon-twitter" href="#,">
                                		<img src="assets/images/social_icon_twitter.png" alt="Twitter" />
                                		<span>{component.props.social.twitter}</span>
                                	</a>
                                </li>
                            }
                            {component.props.social.facebook &&
                                <li>
                                	<a className="icon-facebook" href="#,">
                                		<img src="assets/images/social_icon_facebook.png" alt="Facebook" />
                                		<span>{component.props.social.facebook}</span>
                               		</a>
                                </li>
                            }
                            {component.props.social.instagram &&
                                <li>
                                	<a className="icon-instagram" href="#,">
                                		<img src="assets/images/social_icon_instagram.png" alt="Instagram" />
                                		<span>{component.props.social.instagram}</span>
                                	</a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </article>
		)
	}
};

SectionArticleCompany.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleCompany;