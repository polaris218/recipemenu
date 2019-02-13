var initialAnalyticsState = {};

export function _analytics(state = initialAnalyticsState, action) {
  console.log('_analytics reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_ANALYTICS_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_ANALYTICS_SUCCESS':
      return {
        ...state,
        analytics: action.result,
        completed: true
      }
    case 'GET_ANALYTICS_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}