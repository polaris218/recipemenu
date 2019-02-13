import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const classNames = require('classnames');

import Menu from './Menu';

let createHandlers = (ctx) => {
  let headerOnClick = () => {
    ctx.setState((prevState) => {
		return {
			expanded: !prevState.expanded
		};
	});
  };

  let goToMenus = () => {
  	ctx.setState({
        redirect: true
    });
  };

  let deleteMenu = (component, cb) => {
  	console.log('component?');
  	console.log(component);

  	ctx.props.dispatch(actionCreators.deleteMenu(component, (res) => {
  		goToMenus();
  	}));
  };

  let dispatchPopup = (obj) => {
  	ctx.props.dispatch(actionCreators.setPopup(obj));
  };

  let onPageLoad = () => {
  	const id = parseInt(ctx.props.component.id, 10);
  	const component = (ctx.props.component.props.menus && ctx.props.component.props.menus.length > 0) ? ctx.props.component.props.menus.find(menu => {
		return menu.MenuID === id;
	}) : null;


	ctx.popupObj = {
  		isOpened: true,
  		type: 'delete',
  		component: component,
  		text: 'Are you sure you want to delete this menu?',
  		actions: [
  			{
  				type: 'submit',
  				text: 'Delete',
  				fn: (comp, cb) => {
  					deleteMenu(component, cb);
  				}
  			},
  			{
  				type: 'cancel',
  				text: 'Cancel',
  				fn: (comp, cb) => {
  					goToMenus();
  				}
  			}
  		]
  	};
  };

  return {
    headerOnClick,
    onPageLoad,
    goToMenus,
    deleteMenu,
    dispatchPopup
  };
};

class SectionArticleDeleteMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			expanded: true
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {
        this.handlers.onPageLoad();
    }

    componentWillReceiveProps(nextProps) {
    	if (nextProps.component.props.menus && nextProps.component.props.menus.length > 0 && this.state.redirect === false) {
			let menuComponent = nextProps.component.props.menus[0] || null;
			console.log('menus changed so popup goes to true!!!!');
			this.popupObj.isOpened = !this.popupObj.isOpened;
			this.popupObj.actions = [
	  			{
	  				type: 'submit',
	  				text: 'Delete',
	  				fn: (comp, cb) => {
	  					this.handlers.deleteMenu(menuComponent, cb);
	  				}
	  			},
	  			{
	  				type: 'cancel',
	  				text: 'Cancel',
	  				fn: (comp, cb) => {
	  					this.handlers.goToMenus();
	  				}
	  			}
	  		];
	  		this.handlers.dispatchPopup(this.popupObj);
    	}
    }

	render() {
		const { title, dateUpdate, component } = this.props;
		const id = parseInt(component.id, 10);

		const menuComponent = (component.props.menus && component.props.menus.length > 0) ? component.props.menus[0] : null;

		const ownProps = {
			title: menuComponent ? (menuComponent.Title || menuComponent.title) : '',
			price: menuComponent ? (menuComponent.Price || menuComponent.price) : '',
			categories: menuComponent ? menuComponent.categories : [],
			description: menuComponent ? (menuComponent.Description || menuComponent.description) : ''
		};

		const translationsContainer = '';

		console.log(component);
		console.log(menuComponent);

		if (this.state.redirect) {
			return <Redirect push to={"/menus"} />;
		}

		const classes = classNames(
			'branch--contact--header',
			'collapsable',
			(this.state.expanded) ? 'opened' : ''
		);

		const deleteComponent = (this.state.redirect)
			? (
				<Redirect to={{
					pathname: '/menus/'
				}} />
			) : (
				<div className="article--menu">
					<div className="branch--contact aside--section contacts--support">
						<header className={classes} onClick={this.handlers.headerOnClick}>
							<div className="header--title-container">
								<h1 className="aside--title collapsable--title">
									{ownProps.title}
								</h1>
							</div>
						</header>
						<div className="global-padding-wrapper">
							<div className="article--menu--translations">
								{translationsContainer}
							</div>
							<div className="goto" onClick={this.handlers.goToMenu}>
								<p className="menu--title">
									Menu
								</p>
								<Menu ownProps={ownProps} />
							</div>
						</div>
					</div>
				</div>
			);


		return deleteComponent;
	}
};

SectionArticleDeleteMenu.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		popup: state._popup.popup
	};
};

export default connect(mapStateToProps)(SectionArticleDeleteMenu);