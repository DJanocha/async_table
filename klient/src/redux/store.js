import {createStore, compose, applyMiddleware} from 'redux' // oraz {compose}
import createSagamiddleware from 'redux-saga'
import rootReducer from './reducery/index.js'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagamiddleware();
//const store = createStore(rootReducer);
const store = compose(applyMiddleware(sagaMiddleware), window.devToolsExtension && window.devToolsExtension(),)(createStore)(rootReducer);
sagaMiddleware.run(rootSaga);
export default store;