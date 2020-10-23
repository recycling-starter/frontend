import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, withRouter } from 'react-router-dom'
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
import usersReducer from './components/Authorized/Users/usersReducer'
import settingsReducer from './components/Authorized/Settings/settingsReducer'

const reducer = combineReducers({
  session: unauthorizedReducer,
  boxes: boxesReducer,
  calls: callsReducer,
  users: usersReducer,
  settings: settingsReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
)

const ScrollToTop = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [history])

  return null
}

const ScrollToTopWithRouter = withRouter(ScrollToTop)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTopWithRouter />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById(`root`),
)
