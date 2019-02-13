import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

const ANALYTICS_TOTAL = 'ANALYTICS_TOTAL';
const ANALYTICS_MOST_VIEWED = 'ANALYTICS_MOST_VIEWED';


function AnalyticMostViewed({
    entityType,
    entity,
    count,
  }) {
    const entityTitle = entity.Name || entity.Title;
    return (
      <article className="analytic--most-viewed">
        <a>
          <div>
          <header>
            <h3>Most Viewed {entityType}</h3>
            <h4>{entityTitle}</h4>
            <h5>{count} times</h5>
          </header>
          </div>
        </a>
      </article>
    );
  }
  
  function AnalyticTotal({
    entityType,
    count,
  }) {
    return (
      <article className="analytic--total">
        <a>
          <div>
            <header>
              <h3>Total {entityType} Visits</h3>
              <h4>{count}</h4>
            </header>
          </div>
        </a>
      </article>
    );
  }

const renderAnalytics = (props) => {
    const { analyticType, ...rest } = props;
    switch (analyticType) {
      case ANALYTICS_MOST_VIEWED:
        return <AnalyticMostViewed {...rest} />;
      case ANALYTICS_TOTAL:
      default:
        return <AnalyticTotal {...rest} />;
    }
};

class SectionArticleAnalytics extends Component {
	render() {
		const { title, dateUpdate, component } = this.props;

        console.log(component);
        console.log(component.props.analytics);

        const analytics = component.props.analytics || [];
        const totalAnalytics = analytics.filter(a => a.analyticType === ANALYTICS_TOTAL);
        const mostViewedAnalytics = analytics.filter(a => a.analyticType === ANALYTICS_MOST_VIEWED);

		return (
			<article className="content--module module--item-details no-metadata content--company">
                <div className="content--container global-padding-wrapper">
                    <section className="analytics--container wrapper">
                        <h2 class="asset--subtitle">Analytics</h2>
                        <div className="analytics">
                            <div className="analytics--types">
                            <ul className={`analytics--${ANALYTICS_TOTAL.toLowerCase()}`}>
                                {
                                totalAnalytics.map(analytic => (
                                    <li className="blocklist--item">
                                    {renderAnalytics(analytic)}
                                    </li>
                                ))
                                }
                            </ul>
                            <ul className={`analytics--${ANALYTICS_MOST_VIEWED.toLowerCase()}`}>
                                {
                                mostViewedAnalytics.map(analytic => (
                                    <li className="blocklist--item">
                                    {renderAnalytics(analytic)}
                                    </li>
                                ))
                                }
                            </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </article>
		)
	}
};

SectionArticleAnalytics.propTypes = {
	title: PropTypes.string,
	dateUpdate: PropTypes.object,
    component: PropTypes.object
};

export default SectionArticleAnalytics;