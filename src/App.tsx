import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PUBLIC_PATH, PRIVATE_PATH } from './config'
import Login from './components/Unauthorized/Login'
import Registration from './components/Unauthorized/Registration'
import Restore from './components/Unauthorized/Restore'
import Authorized from './components/Authorized'
import Boxes from './components/Authorized/Boxes'

const App = () => {
  const [authorized, setAuthorized] = useState(false)
  return (
    <Switch>
      {authorized ? (
        <Authorized setAuthorized={setAuthorized}>
          <Route path={PRIVATE_PATH.BOXES}>
            <Boxes />
          </Route>
          <Route>
            <Redirect to={PRIVATE_PATH.BOXES} />
          </Route>
        </Authorized>
      ) : (
        <>
          <Route path={PUBLIC_PATH.LOGIN}>
            <Login setAuthorized={setAuthorized} />
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
        </>
      )}
    </Switch>
  )
}

export default App
