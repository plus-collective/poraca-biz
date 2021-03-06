import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from './store'

import App from './components/app';


// import 'bulma';
import './index.scss';
import * as serviceWorker from './service-worker';

const render = 
<React.StrictMode>
  <Store>
    <Router>
      <App />
    </Router>
  </Store>
</React.StrictMode>

ReactDOM.render(render, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
