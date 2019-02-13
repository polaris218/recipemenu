import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const classNames = require('classnames');

let createHandlers = (ctx) => {
    let togglePopup = () => {
        ctx.setState((prevState) => {
            return {
                opened: !prevState.expanded
            };
        });
    };

    let openPopup = () => {
        ctx.setState({
            opened: true
        });
    };

    let closePopup = () => {
        console.log('popup is about to close!!!');

        let newPopup = {
            isOpened: false,
            type: ctx.props.type,
            component: ctx.props.component,
            text: ctx.props.text,
            actions: ctx.props.actions
        };

        ctx.props.dispatch(actionCreators.setPopup(newPopup, () => {
            ctx.setState({
                opened: false
            });
        }));
    };

    let onButtonClick = (action, component) => {
        closePopup();
        action.fn(component);
    };

    return {
        onButtonClick,
        togglePopup
    };
};

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: props.isOpened || false
        };
        this.handlers = createHandlers(this);
    }

    componentDidMount() {

    }

    render () {
        const { isOpened, type, component, text, actions } = this.props;

        console.log(this.props);
        console.log('state!!!');
        console.log(this.state);

        const typeText = type ? type.toUpperCase() : '';
        const confirmationText = text;

        const popupClasses = classNames(
            'popup',
            (type) ? 'popup--' + type : '',
            (this.props.popup && this.props.popup.isOpened) ? 'opened' : ''
        );

        const buttonsComponent = (actions && actions.length > 0) ? (actions.map((action, index) => {
            return (
                <button className={"button--action button--action-filled button--action--" + action.type} key={index} onClick={(e) => this.handlers.onButtonClick(action, component)}>{action.text}</button>
            );
        })) : null;

        return (
            <div className={popupClasses}>
                <div className="popup--overlay"></div>
                <div className="popup--container">
                    <article className="content--module module--alert">
                        <header className="content--container--header header--orange">
                            <h2 className="content--container--title">{typeText}</h2>
                        </header>
                        <div className="alert--container content--container">
                            <div className="grid alert--content">
                                <div className="content--label">
                                    <span className="label--value">{confirmationText}</span>
                                </div>
                            </div>

                            <footer className="alert--footer group-buttons global-padding-wrapper push-right">
                                {buttonsComponent}
                            </footer>
                        </div>
                    </article>
                </div>
            </div>
        )
    }
};

Popup.propTypes = {
    isOpened: PropTypes.bool,
    type: PropTypes.string,
    component: PropTypes.object,
    text: PropTypes.string,
    actions: PropTypes.array
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        popup: state._popup.popup
    };
};

export default connect(mapStateToProps)(Popup);