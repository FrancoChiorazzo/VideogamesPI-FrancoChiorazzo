import {createStore, applyMiddleware, compose} from "redux";
import reducer from "../reducer/index.js";
import thunkMiddleware from "redux-thunk";

//Connect to redux devTools extension for web browser
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Connect to Thunk to make requests to the API? check...........
const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)))

export default store;
