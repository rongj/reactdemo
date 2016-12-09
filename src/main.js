import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import TodoApp from './redux/reducer/reducers';
import RouteConfig from './routers';


// css
import './assets/scss/app.scss';



ReactDOM.render(
    <Provider store={createStore(TodoApp)}>{RouteConfig}</Provider>,
    document.getElementById("app")
)
