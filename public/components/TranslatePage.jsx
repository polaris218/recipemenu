import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Navbar from './Navbar';
import PageContent from './PageContent';

class TranslatePage extends Component {
  constructor(props) {
    super(props);
  }

  getCurrentBranch(profile, currentBranchMenuId, obj) {
    const branch = profile.branches && profile.branches.length > 0 ? profile.branches.find(branch => {
      return branch.BranchID === currentBranchMenuId;
    }) : null;

    if (branch && obj && obj.languages) {
      const languages = obj.languages.map((lang, index) => {
        var match = branch.languages.find(l => l.LanguageID == lang.BranchLanguageID);
        lang.Language = (lang.Language) ? lang.Language : match ? match.Language : null;
        lang.LanguageID = (lang.LanguageID) ? lang.LanguageID : match ? match.LanguageID : null;
      });
    }
    return obj;
  }

  render() {
    const { component } = this.props.match.params;
    const actionType = (typeof component !== 'undefined') ? 'translate-menu' : 'translate';

    const profile = (this.props.profile) ? this.props.profile : {};

    const branchRoot = (profile.branches && profile.branches.length > 0) ? profile.branches.find(branch => {
      return branch.HasHeadquarters == 1;
    }) : null;

    if (branchRoot) {
      branchRoot.mainContact = (branchRoot.contacts && branchRoot.contacts.length > 0) ? branchRoot.contacts.find(contact => {
        return contact.IsAdmin == 1;
      }) : null;
    }

    const type = (this.props.location.state && this.props.location.state.component) ? this.props.location.state.component.type : '';
    let obj = (this.props.location.state && this.props.location.state.component) ? this.props.location.state.component.obj : '';

    obj = this.getCurrentBranch(profile, obj.BranchID, obj);

    const company = {
      name: profile.Name,
      description: profile.Description,
      logo: {
        imgPath: profile.LogoPath,
        altDesc: profile.LogoAltDesc
      },
      website: profile.Website,
      tel: profile.Tel,
      email: profile.Email,
      social: {
        twitter: profile.Twitter,
        facebook: profile.Facebook,
        instagram: profile.Instagram,
        youtube: profile.Youtube
      },
      branchRoot: branchRoot
    };

    const sections = [{
      type: actionType,
      title: "Translate",
      articles: [{
        type: "translate",
        title: "Translate " + type,
        component: {
          type: "Alert",
          title: "",
          props: obj
        }
      }]
    }];

    const asideType = 'preview-nosave';

    return (
      <div>
        <Navbar logo={company.logo} />
        <PageContent sections={sections} asideType={asideType} company={company} />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    profile: state._profile.profile
  }
};

export default connect(mapStateToProps)(TranslatePage);
