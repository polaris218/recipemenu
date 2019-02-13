import React, { Component, PropTypes } from 'react';

import { Redirect, Route } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import ImageUpload from './ImageUpload';

let createHandlers = (ctx) => {
    let onImageUpload = (data) => {
        console.log('uploaded image!!');
        console.log(data);

        ctx.setState({
            image: data
        });
    };

    let onImageUploaded = (data) => {
        console.log('image successfully uploaded on cloudinary!');

        // maybe set state with image or something
    };

    let onProfileSaved = (data) => {
        console.log('profile saved!!!');

        ctx.setState({
            profile: data,
            isProfileSaved: true
        });
    };

    let onChanges = (type, obj) => {
        let dataToUpdate = {};
        switch (type) {
            case 'main':
                dataToUpdate[obj.key] = obj.target.target.value;

                ctx.props.dispatch(actionCreators.setProfile(ctx.props.profile, dataToUpdate));
            default:
                dataToUpdate[type] = obj.data;

                console.log(obj);
                console.log(dataToUpdate);
                ctx.props.dispatch(actionCreators.setProfile(ctx.props.profile, dataToUpdate));

        }
    };

    let onSaveChanges = () => {
        let dataToUpdate = fetchFormData();
        dataToUpdate.image = ctx.state.image;
        ctx.props.dispatch(actionCreators.saveProfile(dataToUpdate, onProfileSaved));
    };

    let fetchFormData = () => {
        let fields = document.querySelectorAll('input[name*=profile-]');
        let newImage = ctx.state.imagePath;

        console.log(fields);

        let obj = [...fields].reduce((acc, field) => {
            const parsedField = field.name.substring(field.name.indexOf('profile-') + 8, field.name.length);
            acc[parsedField] = field.value;
            return acc;
        }, {});

        obj.imgPath = newImage;

        console.log(obj);

        return obj;
    };

    let getProfile = (data) => {
        ctx.props.dispatch(actionCreators.getProfile(data));
    };

    return {
        onImageUpload,
        onSaveChanges,
        getProfile,
        onChanges
    };
};

class SectionArticleEditCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            profile: '',
            isProfileSaved: false,
            imagePath: props.component.props.logo.imgPath
        };
        this.handlers = createHandlers(this);
    }

    componentDidMount() {
        this.handlers.getProfile(this.props.component.props);
    }

	render() {
		const { title, dateUpdate, component } = this.props;

        console.log(component.props);
        // do we even need state.profile ???
        console.log(this.props.profile); // THIS IS OK
        console.log(this.state.profile); // THIS IS NOT OK

        const logo = (this.props.profile) ? [{
            altDesc: this.props.profile.LogoAltDesc,
            imgPath: this.props.profile.LogoPath
        }] : [{altDesc: component.props.logo.altDesc || '', imgPath: component.props.logo.imgPath|| ''}];

        const name = (this.props.profile) ? this.props.profile.Name : component.props.name || '';
        const email = (this.props.profile) ? this.props.profile.Email : component.props.email || '';
        const description = (this.props.profile) ? this.props.profile.Description : component.props.description || '';
        const website = (this.props.profile) ? this.props.profile.Website : component.props.website || '';
        const tel = (this.props.profile) ? this.props.profile.Tel : component.props.tel || '';
        const facebook = (this.props.profile) ? this.props.profile.Facebook : component.props.social.facebook || '';
        const twitter = (this.props.profile) ? this.props.profile.Twitter : component.props.social.twitter || '';
        const youtube = (this.props.profile) ? this.props.profile.Youtube : component.props.social.youtube || '';
        const instagram = (this.props.profile) ? this.props.profile.Instagram : component.props.social.instagram || '';

        const allImagesComponent = (
            <ImageUpload onUploadSubmit={this.handlers.onImageUpload} images={logo} />
        );

        const renderComponent = (this.state.isProfileSaved)
            ? (
                <Redirect to={{
                    pathname: '/profile/get'
                }} />
            ) : (
                <article className="content--module module--item-details no-metadata content--company content--edit">
                    <div className="content--container global-padding-wrapper">
                        <header className="content--company--header">
                            <div className="header--title-container">
                                <h2 className="asset--title">
                                    {name}
                                </h2>
                            </div>
                        </header>
                    </div>

                    <div className="content--container global-padding-wrapper no-border-top">
                        <div className="address-container">
                            <div className="content--label">
                                <h3 className="label--key">Name:</h3>
                                <div className="label--value">
                                    <label className="label--edit">Enter new Name:</label>
                                    <input className="input--edit" type="text" name="profile-name" defaultValue={name} onChange={(e) => this.handlers.onChanges('main', {target: e, key: 'Name'})} />
                                </div>
                            </div>
                            <div className="content--label">
                                <h3 className="label--key">Logo Image:</h3>
                                <div className="label--value">
                                    <label className="label--edit">Enter new Logo Image:</label>
                                    <div className="branch--images">
                                        {allImagesComponent}
                                    </div>
                                </div>
                            </div>
                            <div className="content--label">
                                <h3 className="label--key">Logo Text:</h3>
                                <div className="label--value">
                                    <label className="label--edit">Enter new Logo description:</label>
                                    <input className="input--edit" type="text" name="profile-altDesc" defaultValue={logo[0].altDesc} onChange={(e) => this.handlers.onChanges('main', {target: e, key: 'LogoAltDesc'})} />
                                </div>
                            </div>
                            <div className="content--label">
                                <h3 className="label--key">Website:</h3>
                                <div className="label--value">
                                    <label className="label--edit">Enter new Website:</label>
                                    <input className="input--edit" type="text" name="profile-website" defaultValue={website} onChange={(e) => this.handlers.onChanges('main', {target: e, key: 'Website'})} />
                                </div>
                            </div>
                            <div className="content--label">
                                <h3 className="label--key">Email:</h3>
                                <div className="label--value">
                                    <label className="label--edit">Enter new Email:</label>
                                    <input className="input--edit" type="text" name="profile-email" disabled defaultValue={email} />
                                </div>
                            </div>
                            <div className="content--label">
                                <h3 className="label--key">Phone:</h3>
                                <div className="label--value">
                                    <label className="label--edit">Enter new Phone number:</label>
                                    <input className="input--edit" type="text" name="profile-tel" defaultValue={tel} onChange={(e) => this.handlers.onChanges('main', {target: e, key: 'Tel'})} />
                                </div>
                            </div>
                        </div>
                        <div className="profile-social">
                            <ul>
                                <li>
                                    <div className="social--icon icon-twitter">
                                        <img src="assets/images/social_icon_twitter.png" alt="Twitter" />
                                        <div>
                                            <label className="label--edit">Enter new Twitter link:</label>
                                            <input className="input--edit" type="text" name="profile-twitter" defaultValue={twitter} onChange={(e) => this.handlers.onChanges('main', {target: e, key: 'Twitter'})} />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="social--icon icon-facebook">
                                        <img src="assets/images/social_icon_facebook.png" alt="Facebook" />
                                        <div>
                                            <label className="label--edit">Enter new Facebook link:</label>
                                            <input className="input--edit" type="text" name="profile-facebook" defaultValue={facebook} onChange={(e) => this.handlers.onChanges('main', {target: e, key: 'Facebook'})} />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="social--icon icon-instagram">
                                        <img src="assets/images/social_icon_instagram.png" alt="Instagram" />
                                        <div>
                                            <label className="label--edit">Enter new Instagram link:</label>
                                            <input className="input--edit" type="text" name="profile-instagram" defaultValue={instagram} onChange={(e) => this.handlers.onChanges('main', {target: e, key: 'Instagram'})} />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="profile-save">
                        <button id="profile-save" onClick={this.handlers.onSaveChanges}>Save Changes</button>
                    </div>
                </article>
            );

		return renderComponent;
	}
};

SectionArticleEditCompany.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);
  return {
    profile: state._profile.profile
  };
};

export default connect(mapStateToProps)(SectionArticleEditCompany);