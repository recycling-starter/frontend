import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PUBLIC_PATH, PRIVATE_PATH } from './config'
import Login from './components/Unauthorized/Login'
import Registration from './components/Unauthorized/Registration'
import Restore from './components/Unauthorized/Restore'
import Authorized from './components/Authorized'
import Boxes from './components/Authorized/Boxes'
import Box from './components/Authorized/Boxes/Box'

const App = () => {
  const [authorized, setAuthorized] = useState(true)
  return authorized ? (
    <Authorized setAuthorized={setAuthorized}>
      <Switch>
        <Route exact path={PRIVATE_PATH.BOXES}>
          <Boxes />
        </Route>
        <Route exact path={PRIVATE_PATH.BOX}>
          <Box />
        </Route>
        <Route>
          <Redirect to={PRIVATE_PATH.BOXES} />
        </Route>
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
