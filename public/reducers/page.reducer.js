
var initialPageState = {};

export function _page(state = initialPageState, action) {
  console.log('_page reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_PAGE_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_PAGE_SUCCESS':
      return {
        ...state,
        page: action.result.page,
        completed: true
      }
    case 'GET_PAGE_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}