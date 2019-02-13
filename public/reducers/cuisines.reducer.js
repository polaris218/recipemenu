
var initialCuisinesState = {};

export function _cuisines(state = initialCuisinesState, action) {
  console.log('_cuisines reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_CUISINES_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_CUISINES_SUCCESS':
      return {
        ...state,
        cuisines: action.result,
        completed: true
      }
    case 'GET_CUISINES_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}