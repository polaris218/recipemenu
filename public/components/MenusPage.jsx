import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Navbar from './Navbar';
import PageContent from './PageContent';

let createHandlers = (ctx) => {
  let onMenusFetched = (obj) => {
    console.log('menus fetched!');

    let menus = obj;

    ctx.setState({
      component: {
        type: 'menu',
        menus: menus
      }
    });
  };

  let onProfileFetched = (obj) => {
    console.log('profile fetched!');

    let profile = obj;

    /*
    ctx.setState({
      branches: profile.branches
    });
*/
  };

  return {
    onMenusFetched,
    onProfileFetched
  };
};

class MenusPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: {},
      branches: []
    };
    this.handlers = createHandlers(this);
  }

  componentDidMount() {
    //this.props.dispatch(actionCreators.getMenus(this.handlers.onMenusFetched));
    this.props.dispatch(actionCreators.getProfile(this.handlers.onProfileFetched));
  }

  render () {
    const action = this.props.match.params.action;

    const profile = (this.props.profile) ? this.props.profile : {};

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
      type: "branches",
      title: "All Menus",
      articles: [{
        type: "menus",
        title: "Menus",
        component: {
          type: "Menu",
          id: 2,
          title: "",
          props: {
            menus: menus
          }
        }
      }]
    }];

    const asideType = 'plan';


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
    profile: state._profile.profile
  }
};

export default connect(mapStateToProps)(MenusPage);
