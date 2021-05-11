import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import {Provider} from 'react-redux'
import store from "./redux/store"

const app = (
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
)



ReactDOM.render(app, document.getElementById('root'));

