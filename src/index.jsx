import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.less'
import api from './api'
import App from './App'
import unauthorizedReducer from './components/Unauthorized/unauthorizedReducer'
import boxesReducer from './components/Authorized/Boxes/boxesReducer'
import callsReducer from './components/Authorized/Calls/callsReducer'

const reducer = combineReducers({
  session: unauthorizedReducer,
  boxes: boxesReducer,
  calls: callsReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById(`root`),
)
