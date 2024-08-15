import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './Map';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './store/store.js'
// styles
import './style/main.css';
import './style/card.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Map />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
