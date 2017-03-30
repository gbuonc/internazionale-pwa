import './app.scss'
import React from 'react'
import {render} from 'react-dom'
import App from './App'
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

render( <App />, document.querySelector('#app'))
