import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as DomUtils from '../shared/dom.utils';
import * as actionCreators from '../action-creators';

import Menu from './Menu';
import Save from './Save';

let createHandlers = (ctx) => {
	let onPageScroll = () => {
		if (ctx.el) {
			if (window.scrollY >= 64) {
				DomUtils.addClass(ctx.el, 'on-scroll');
			} else {
				DomUtils.removeClass(ctx.el, 'on-scroll');
			}
		}
	};

	return {
		onPageScroll
	}
};

class AsidePreview extends Component {
	constructor(props) {
		super(props);

		this.handlers = createHandlers(this);
	}

	componentDidMount() {
		//access to this.props.menu;
		console.log('in the preview aside ');
		console.log(this.props.menu);

		window.addEventListener('scroll', this.handlers.onPageScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handlers.onPageScroll);
	}

	convertProps(props) {
		console.log(props);
		let newProps = {
			...props,
			Price: props.price || props.Price,
			Description: props.description || props.Description,
			Title: props.title || props.Title,
		};

		if (newProps.title) {
			delete newProps.title;
		}
		if (newProps.description) {
			delete newProps.description;
		}
		if (newProps.price) {
			delete newProps.price;
		}

		console.log(newProps);
		return newProps;
	}

	render() {
		const { component, save } = this.props;

		console.log(this.props.menu);

		const menuComponent = (this.props.menu) ? (
			<Menu ownProps={this.convertProps(this.props.menu)} />
		) : null;

		const saveComponent = (this.props.menu && save) ? (
			<Save type="menu" component={this.convertProps(this.props.menu)} />
		) : null;

		return (
			<aside ref={(ref) => this.el = ref} id="aside-preview" className="aside aside--preview">
	            <section className="aside--section contacts--excellence">
	                <h1 className="aside--title">Preview</h1>

	                {menuComponent}
	            </section>

	            {saveComponent}
	        </aside>
		)
	}
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		menu: state._menu.menu
	};
};

AsidePreview.propTypes = {
	component: PropTypes.object,
	save: PropTypes.bool
};

export default connect(mapStateToProps)(AsidePreview);