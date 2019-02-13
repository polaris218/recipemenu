
var initialPopupState = {};

export function _popup(state = initialPopupState, action) {
  console.log('_popup reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'SET_POPUP_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SET_POPUP_SUCCESS':
      return {
        ...state,
        popup: action.result,
        completed: true
      }
    case 'SET_POPUP_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}