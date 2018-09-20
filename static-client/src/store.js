import {createStore, applyMiddleware, compose} from 'redux';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/index';
import rootSaga from './saga/index';

const sagaMiddleware = createSagaMiddleware();
//const middleware = [thunk];
const middlewares = [sagaMiddleware];

const initState = {};
const store = createStore(rootReducer, initState, compose( 
				applyMiddleware(...middlewares),
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			)
		);

sagaMiddleware.run(rootSaga);
export default store;