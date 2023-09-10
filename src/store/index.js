import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './../reducers/index';

const initialState = {};

const middleware = [thunk];

const store = createStore(combineReducers, initialState, compose(applyMiddleware(...middleware)))

 export default store;