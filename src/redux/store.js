import { createStore, combineReducers } from "redux";
import MathReducer from './reducers/MathReducer';
import UserReducer from './reducers/UserReducer';

let store = createStore(combineReducers({MathReducer,UserReducer}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;