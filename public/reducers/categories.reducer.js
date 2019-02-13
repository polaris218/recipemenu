
var initialCategoriesState = {};

export function _categories(state = initialCategoriesState, action) {
  console.log('_categories reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_CATEGORIES_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.result,
        completed: true
      }
    case 'GET_CATEGORIES_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}