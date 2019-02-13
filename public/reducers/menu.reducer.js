
var initialMenuState = {};

export function _menu(state = initialMenuState, action) {
  console.log('_menu reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'GET_MENUS_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_MENUS_SUCCESS':
      return {
        ...state,
        menu: action.result,
        completed: true
      }
    case 'GET_MENUS_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'SET_MENU_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SET_MENU_SUCCESS':
      return {
        ...state,
        menu: action.result,
        completed: true
      }
    case 'SET_MENU_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'DELETE_MENU_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'DELETE_MENU_SUCCESS':
      return {
        ...state,
        menu: action.result,
        completed: true
      }
    case 'DELETE_MENU_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'SAVE_MENU_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SAVE_MENU_SUCCESS':
      return {
        ...state,
        menu: action.result,
        completed: true
      }
    case 'SAVE_MENU_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'TRANSLATE_MENU_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'TRANSLATE_MENU_SUCCESS':
      return {
        ...state,
        menu: action.result,
        completed: true
      }
    case 'TRANSLATE_MENU_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'GET_MENU_TRANSLATIONS_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_MENU_TRANSLATIONS_SUCCESS':
      return {
        ...state,
        menu: action.result,
        completed: true
      }
    case 'GET_MENU_TRANSLATIONS_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'GET_MENU_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'GET_MENU_SUCCESS':
      return {
        ...state,
        menu: action.result,
        completed: true
      }
    case 'GET_MENU_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}