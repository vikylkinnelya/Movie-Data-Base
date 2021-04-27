import 'antd/dist/antd.compact.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter  as Router } from 'react-router-dom';

import App from './components/app';


ReactDOM.render ((
    <Router basename="/">
        < App />
    </Router>
), document.getElementById('root'));