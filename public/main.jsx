import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import createStore from './create-store';

import App from './components/App';

const store = createStore();

render(
	// As explained above, the Provider must wrap your application's Root component. This way,
    // this component and all of its children (even deeply nested ones) will have access to your
    // Redux store. Of course, to allow Provider to do that, you must give it the store
    // you built previously (via a "store" props).
    <Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app-wrapper')
)