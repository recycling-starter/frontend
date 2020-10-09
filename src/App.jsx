import React, { useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { PUBLIC_PATH, PRIVATE_PATH } from './config'
import Login from './components/Unauthorized/Login'
import Registration from './components/Unauthorized/Registration'
import Restore from './components/Unauthorized/Restore'
import Authorized from './components/Authorized'
import Boxes from './components/Authorized/Boxes'
import Box from './components/Authorized/Boxes/Box'
import Users from './components/Authorized/Users'
import User from './components/Authorized/Users/User'
import Settings from './components/Authorized/Settings'
import Calls from './components/Authorized/Calls'
import Call from './components/Authorized/Calls/Call/Call'

const App = () => {
  const [authorized, setAuthorized] = useState(true)
  const { pathname } = useLocation()
  return authorized ? (
    <Authorized setAuthorized={setAuthorized}>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path={PRIVATE_PATH.BOXES}>
          <Boxes />
        </Route>
        <Route exact path={PRIVATE_PATH.BOX}>
          <Box />
        </Route>
        <Route exact path={PRIVATE_PATH.USERS}>
          <Users />
        </Route>
        <Route exact path={PRIVATE_PATH.USER}>
          <User />
        </Route>
        <Route exact path={PRIVATE_PATH.SETTINGS}>
          <Settings />
        </Route>
        <Route exact path={PRIVATE_PATH.CALLS}>
          <Calls />
        </Route>
        <Route exact path={PRIVATE_PATH.CALL}>
          <Call />
        </Route>
        <Redirect to={PRIVATE_PATH.BOXES} />
      </Switch>
    </Authorized>
  ) : (
    <Switch>
      <Route exact path={PUBLIC_PATH.LOGIN}>
        <Login setAuthorized={setAuthorized} />
      </Route>
      <Route exact path={PUBLIC_PATH.REGISTRATION}>
        <Registration />
      </Route>
      <Route exact path={PUBLIC_PATH.RESTORE}>
        <Restore />
      </Route>
      <Route>
        <Redirect to={PUBLIC_PATH.LOGIN} />
      </Route>
    </Switch>
  )
}

export default App
