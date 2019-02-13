
var initialProfileState = {};

export function _profile(state = initialProfileState, action) {
  console.log('_profile reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_PROFILE_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.result,
        completed: true
      }
    case 'GET_PROFILE_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    case 'SET_PROFILE_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SET_PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.result,
        completed: true
      }
    case 'SET_PROFILE_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    case 'SAVE_PROFILE_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SAVE_PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.result,
        completed: true
      }
    case 'SAVE_PROFILE_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}