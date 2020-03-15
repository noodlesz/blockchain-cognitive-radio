import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom'

import store from './store'

import App from './app'

import 'semantic-ui-css/semantic.min.css'
import "./static/css/index.scss"

ReactDOM.render(
  <Provider store={ store }>
    <HashRouter>
      <>
        <Route path="/" component={ App } />
      </>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)