
var initialImageState = {};

export function _image(state = initialImageState, action) {
  console.log('_image reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'UPLOAD_IMAGE_REQUEST':
      return {
        ...state,
        completed: false
      }
    case 'UPLOAD_IMAGE_SUCCESS':
      return {
        ...state,
        image: action.result.image,
        completed: true
      }
    case 'UPLOAD_IMAGE_FAILURE':
      // we could add an error message here, to be printed somewhere in our application
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}