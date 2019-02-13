
var initialCurrenciesState = {};

export function _currencies(state = initialCurrenciesState, action) {
  console.log('_currencies reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_CURRENCIES_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_CURRENCIES_SUCCESS':
      return {
        ...state,
        currencies: action.result,
        completed: true
      }
    case 'GET_CURRENCIES_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}