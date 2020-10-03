import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from './components/Unauthorized/Login'
import Registration from './components/Unauthorized/Registration'
import { PUBLIC_PATH } from './config'
import Restore from './components/Unauthorized/Restore/Restore'

const App = () => {
  return (
    <Switch>
      <Route path={PUBLIC_PATH.LOGIN}>
        <Login />
      </Route>
      <Route path={PUBLIC_PATH.REGISTRATION}>
        <Registration />
      </Route>
      <Route path={PUBLIC_PATH.RESTORE}>
        <Restore />
      </Route>
      <Route>
        <Redirect to={PUBLIC_PATH.LOGIN} />
      </Route>
    </Switch>
  )
}

export default App
