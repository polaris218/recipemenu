import React, { Component, PropTypes } from 'react';

import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

const classNames = require('classnames');

import PageHeader from './PageHeader';
import PageSection from './PageSection';
import Aside from './Aside';
import Footer from './Footer';
import Popup from './Popup';

let createHandlers = (ctx) => {
    let onSubmitClick = () => {
        console.log('delete submit button clicked');
        let component = ctx.props.popup.component;
        let submitAction = ctx.props.popup.actions.filter(action => {
            return action.type === 'submit';
        });

        if (submitAction && typeof submitAction.fn === 'function') {
            submitAction.fn(component, onActionSubmitted);
        }
    };

    let onCancelClick = () => {
        console.log('cancel button clicked');
        let component = ctx.props.popup.component;
        let cancelAction = ctx.props.popup.actions.filter(action => {
            return action.type === 'cancel';
        });

        if (cancelAction && typeof cancelAction.fn === 'function') {
            cancelAction.fn(component, onActionSubmitted);
        }
    };

    let onActionSubmitted = (res) => {
        console.log('action submitted!!');
        console.log(res);
        onRedirect();
    };

    let onRedirect = () => {
        ctx.setState({
            redirect: true
        });
    };

    return {
        onSubmitClick,
        onCancelClick
    };
};

class PageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            opened: (this.props.popup) ? this.props.popup.isOpened : false
        };

        this.handlers = createHandlers(this);
    }

    componentDidMount() {

    }

    render() {
        const { sections, company, asideType } = this.props;

        const sectionComponents = sections.map((section, index) => {
            return <PageSection type={section.type} title={section.title} articles={section.articles} key={index} />;
        });

        const opened = (this.state.opened) ? this.state.opened : false;

        const popupComponent = (this.props && this.props.popup) ? (
            <Popup isOpened={opened} type={this.props.popup.type} component={this.props.popup.component} text={this.props.popup.text} actions={this.props.popup.actions} />
        ) : null;

        return (
            <div>
                {popupComponent}

                <div className="content">
                    <PageHeader company={company} />

                    <div className="main-content">
                        <Aside type={asideType} />

                        <main className="main">
                            {sectionComponents}
                        </main>
                    </div>
                </div>
            </div>
        )
    }
};

PageContent.propTypes = {
    sections: PropTypes.array.isRequired,
    company: PropTypes.object,
    asideType: PropTypes.string
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        popup: state._popup.popup
    };
};

export default connect(mapStateToProps)(PageContent);
