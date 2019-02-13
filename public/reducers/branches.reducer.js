
var initialBranchesState = {};

export function _branches(state = initialBranchesState, action) {
  console.log('_branches reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'SET_BRANCHES_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SET_BRANCHES_SUCCESS':
      return {
        ...state,
        branches: action.result,
        completed: true
      }
    case 'SET_BRANCHES_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'SAVE_BRANCH_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SAVE_BRANCH_SUCCESS':
      return {
        ...state,
        branches: action.result,
        completed: true
      }
    case 'SAVE_BRANCH_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'DELETE_BRANCH_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'DELETE_BRANCH_SUCCESS':
      return {
        ...state,
        branches: action.result,
        completed: true
      }
    case 'DELETE_BRANCH_FAILURE':
      return {
        ...state,
        completed: true
      }
    case 'SAVE_BRANCHES_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'SAVE_BRANCHES_SUCCESS':
      return {
        ...state,
        branches: action.result,
        completed: true
      }
    case 'SAVE_BRANCHES_FAILURE':
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}