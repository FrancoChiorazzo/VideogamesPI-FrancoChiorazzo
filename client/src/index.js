import App from './App';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"; //provider in order to make redux interact with the App. It provides the store to all components
import store from './redux/store/index.js';
import { BrowserRouter} from 'react-router-dom'; // in order to allow the use of routes


ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  
  document.getElementById('root')
);


