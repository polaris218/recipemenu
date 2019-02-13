import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Navbar from './Navbar';
import PageContent from './PageContent';

let createHandlers = (ctx) => {
  let onMenusFetched = (obj) => {
    let menus = obj;

    ctx.setState({
      component: {
        type: 'menu',
        menus: menus
      }
    });
  };

  let onProfileFetched = (obj) => {
    let profile = obj;
  };

  const onAnalyticsFetched = (obj) => {
    let analytics = obj;
  };

  return {
    onMenusFetched,
    onAnalyticsFetched,
    onProfileFetched
  };
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: {},
      branches: [],
      analytics: [],
    };
    this.handlers = createHandlers(this);
  }

  componentDidMount() {
    this.props.dispatch(actionCreators.getAnalytics(this.handlers.onAnalyticsFetched));
    this.props.dispatch(actionCreators.getProfile(this.handlers.onProfileFetched));
  }

  render () {
    const profile = (this.props.profile) ? this.props.profile : {};
    const analytics = this.props.analytics || [];

    const branchRoot = (profile.branches && profile.branches.length > 0) ? profile.branches.find(branch => {
      return branch.HasHeadquarters == 1;
    }) : null;

    if (branchRoot) {
      branchRoot.mainContact = (branchRoot.contacts && branchRoot.contacts.length > 0) ? branchRoot.contacts.find(contact => {
        return contact.IsAdmin == 1;
      }) : null;
    }

    /*
    if (!profile.branches || profile.branches.length <= 0) {
      profile.branches = this.state.branches;
    }
    */

    const menus = (profile.branches && profile.branches.length > 0) ? profile.branches.reduce((acc, branch) => {
      return acc.concat(branch.menus);
    }, []) : [];

    console.log(menus);

    const filteredMenus = (menus && menus.length > 0) ? menus.reduce((prev, current) => {
      return (prev.MenuID > current.MenuID) ? prev : current;
    }) : null;

    console.log(filteredMenus);

    const currentBranch = (profile.branches && profile.branches.length > 0) ? profile.branches.find(branch => {
      const menu = filteredMenus[0] || filteredMenus;
      return branch.BranchID === menu.BranchID;
    }) : null;

    const currencies = (currentBranch && currentBranch.currencies && currentBranch.currencies.length > 0) ? currentBranch.currencies : [];

    console.log(currentBranch);

    const lastMenu = filteredMenus;

    console.log(analytics);

    const sections = [{
      type: "analytics",
      title: "Dashboard",
      articles: [{
        type: "analytics",
        title: "Analytics - Views",
        component: {
          type: "AnalyticTotal",
          title: "",
          props: {
            analytics: analytics
          }
        }
      }]
    }, {
      type: "menus",
      title: "Latest Menus",
      articles: [{
        type: "main",
        title: "",
        component: {
          type: "Menu",
          id: 2,
          title: "",
          props: {
            menu: filteredMenus,
            currencies: currencies
          }
        }
      }]
    }];
    const asideType = 'plan';

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
    menu: state._menu.menu,
    profile: state._profile.profile,
    analytics: state._analytics.analytics,
  }
};

export default connect(mapStateToProps)(Dashboard);
