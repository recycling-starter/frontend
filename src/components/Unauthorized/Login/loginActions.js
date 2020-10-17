const LoginAction = {
  LOG_IN: `LOG_IN`,
  LOG_OUT: `LOG_OUT`,
  GET_DATA: `GET_DATA`,
}

export default LoginAction

export const login = ({ email, password }) => (dispatch, getState, api) => {
  return api
    .post(`/users/auth/`, { email, password })
    .then((response) => response.data)
    .then(({ token, is_admin }) => {
      localStorage.setItem(`token`, token)
      return dispatch({
        type: LoginAction.LOG_IN,
        payload: { isAdmin: is_admin },
      })
    })
}

export const getUserData = () => (dispatch, getState, api) => {
  return api
    .get(`/users/`)
    .then((response) => response.data)
    .then(({ first_name: name, building, email, phone, room, organization }) =>
      dispatch({
        type: LoginAction.GET_DATA,
        payload: { name, building, email, phone, room, organization },
      }),
    )
    .catch((error) => {
      console.log(error)
      localStorage.clear()
      window.location.reload()
    })
}

export const logout = () => () => {
  localStorage.clear()
  window.location.reload()
}
