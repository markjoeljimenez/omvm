import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import map from './containers/Map/Map.reducers';
import timeline from './containers/Timeline/Timeline.reducers';

import rootSaga from './saga/saga';

export const reducer = combineReducers({
	map,
	timeline,
});

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		const { composeWithDevTools } = require('redux-devtools-extension');
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

export const makeStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducer, bindMiddleware([sagaMiddleware]));

	sagaMiddleware.run(rootSaga);

	return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
