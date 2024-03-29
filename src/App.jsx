import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
import Call from './components/Authorized/Calls/Call'
import Unauthorized from './components/Unauthorized'
import { getUserData } from './components/Unauthorized/unauthorizedActions'
import CreateBox from './components/Authorized/CreateBox'
import ResetPassword from './components/Unauthorized/ResetPassword'
import ConfirmEmail from './components/Unauthorized/ConfirmEmail'

const App = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const { isAuthorized } = useSelector((state) => state.session)

  useEffect(() => {
    if (
      !(
        localStorage.getItem(`token`) &&
        localStorage.getItem(`id`) &&
        !isAuthorized
      )
    ) {
      setLoading(false)
      return
    }
    dispatch(getUserData(localStorage.getItem(`id`)))
  }, [isAuthorized, dispatch])

  return (
    !loading &&
    (isAuthorized ? (
      <Authorized>
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route exact path={PRIVATE_PATH.BOXES}>
            <Boxes />
          </Route>
          <Route exact path={PRIVATE_PATH.BOX}>
            <Box />
          </Route>
          <Route exact path={PRIVATE_PATH.CREATE_BOX}>
            <CreateBox />
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
          <Route exact path={PUBLIC_PATH.RESET_PASSWORD}>
            <ResetPassword />
          </Route>
          <Route exact path={PUBLIC_PATH.CONFIRM_EMAIL}>
            <ConfirmEmail />
          </Route>
          <Redirect to={PRIVATE_PATH.BOXES} />
        </Switch>
      </Authorized>
    ) : (
      <Unauthorized>
        <Switch>
          <Route exact path={PUBLIC_PATH.LOGIN}>
            <Login />
          </Route>
          <Route exact path={PUBLIC_PATH.REGISTRATION}>
            <Registration />
          </Route>
          <Route exact path={PUBLIC_PATH.RESTORE}>
            <Restore />
          </Route>
          <Route exact path={PUBLIC_PATH.RESET_PASSWORD}>
            <ResetPassword />
          </Route>
          <Route exact path={PUBLIC_PATH.CONFIRM_EMAIL}>
            <ConfirmEmail />
          </Route>
          <Redirect to={PUBLIC_PATH.LOGIN} />
        </Switch>
      </Unauthorized>
    ))
  )
}

export default App
