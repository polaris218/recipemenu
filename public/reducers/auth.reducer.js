var initialAuthState = {};

export function _auth(state = initialAuthState, action) {
    console.log('_auth reducer called with state ', state, ' and action ', action);

    switch (action.type) {
        case 'AUTH_REQUEST':
            return {
                ...state,
                completed: false
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                token: action.result.token,
                completed: true,
                authenticated: true
            }
        case 'AUTH_FAILURE':
            // we could add an error message here, to be printed somewhere in our application
            return {
                ...state,
                completed: true,
                authenticated: false
            }
        case 'FORGOT_SUCCESS':
            // we could add an error message here, to be printed somewhere in our application
            return {
                ...state,
                completed: true,
                authenticated: false,
                message: "Reset link has been sent to your email address."
            }
        default:
            return state
    }
}

export default _auth;