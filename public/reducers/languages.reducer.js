
var initialLanguagesState = {};

export function _languages(state = initialLanguagesState, action) {
  console.log('_languages reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_LANGUAGES_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_LANGUAGES_SUCCESS':
      return {
        ...state,
        languages: action.result,
        completed: true
      }
    case 'GET_LANGUAGES_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}