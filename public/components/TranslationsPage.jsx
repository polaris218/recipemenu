import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import Navbar from './Navbar';
import PageContent from './PageContent';

let createHandlers = (ctx) => {
  let onMenuTranslationsFetched = (obj) => {
    console.log('menu translations fetched!');

    let translations = obj;

    ctx.setState({
      component: {
        type: 'menu',
        translations: translations
      }
    });
  };

  return {
    onMenuTranslationsFetched
  };
};

class TranslationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: {}
    };
    this.handlers = createHandlers(this);
  }

  componentDidMount() {
    //this.props.dispatch(actionCreators.getMenuTranslations(this.handlers.onMenuTranslationsFetched));
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

    const menus = (profile.branches && profile.branches.length > 0) ? profile.branches.reduce((acc, branch) => {
      return acc.concat(branch.menus);
    }, []) : [];

    console.log(menus);

    const menuTranslations = (menus && menus.length > 0) ? menus.reduce((acc, menu) => {
      return acc.concat(menu.translations);
    }, []) : [];

    console.log(menuTranslations);

    const menuCategoryTranslations = (menus && menus.length > 0) ? menus.reduce((acc, menu) => {
      return acc.concat(menu.categories.reduce((catAcc, cat) => {
        return catAcc.concat(cat.translations);
      }, [])).filter(translation => {
        return !!translation.MenuCategoryID;
      });
    }, []) : [];

    console.log(menuCategoryTranslations);

    const mealTranslations = (menus && menus.length > 0) ? menus.reduce((acc, menu) => {
      return acc.concat(menu.categories.reduce((catAcc, cat) => {
        return catAcc.concat(cat.meals.reduce((mealAcc, meal) => {
          return mealAcc.concat(meal.translations);
        }, []));
      }, []));
    }, []) : [];

    console.log(mealTranslations);

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


    let sections = [{
      type: "branches",
      title: "All Translations",
      articles: [{
        type: "translations",
        title: "Translations",
        component: {
          type: "Translations",
          id: 2,
          title: "",
          props: {
            translations: {
              menus: menuTranslations,
              menuCategories: menuCategoryTranslations,
              meals: mealTranslations
            }
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

export default connect(mapStateToProps)(TranslationsPage);
