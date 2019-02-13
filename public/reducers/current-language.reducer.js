
var initialLanguageState = {};

export function _currentLanguage(state = initialLanguageState, action) {
  console.log('_currentLanguage reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_CURRENT_LANGUAGE_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_CURRENT_LANGUAGE_SUCCESS':
      return {
        ...state,
        currentLanguage: action.result,
        completed: true
      }
    case 'GET_CURRENT_LANGUAGE_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    case 'SET_CURRENT_LANGUAGE_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SET_CURRENT_LANGUAGE_SUCCESS':
      return {
        ...state,
        currentLanguage: action.result,
        completed: true
      }
    case 'SET_CURRENT_LANGUAGE_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}