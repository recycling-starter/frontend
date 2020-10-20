import { PRIVATE_PATH } from '../../config'

const UnauthorizedAction = {
  SET_DATA: `SET_DATA`,
  SET_BUILDINGS: `SET_BUILDINGS`,
}

export default UnauthorizedAction

export const login = ({ email, password }) => (dispatch, getState, api) => {
  return api
    .post(`/users/auth/`, { email, password })
    .then((response) => response.data)
    .then(({ token, id }) => {
      localStorage.setItem(`token`, token)
      localStorage.setItem(`id`, id)
      window.location.href = PRIVATE_PATH.BOXES
    })
}

export const getUserData = (id) => (dispatch, getState, api) => {
  return api
    .get(`/users/${id}`)
    .then((response) => response.data)
    .then(({ first_name, building, email, phone, room, organization }) =>
      dispatch({
        type: UnauthorizedAction.SET_DATA,
        payload: {
          name: first_name,
          isAdmin: !!organization,
          building,
          email,
          phone,
          room,
          organization,
        },
      }),
    )
    .catch((error) => {
      console.log(error)
      localStorage.clear()
      window.location.reload()
    })
}

export const getBuildings = () => (dispatch, getState, api) => {
  return api.get(`/buildings/`).then((response) => {
    return dispatch({
      type: UnauthorizedAction.SET_BUILDINGS,
      payload: response.data,
    })
  })
}

export const register = (values) => (dispatch, getState, api) => {
  return api
    .post(`/users/auth/`, {})
    .then((response) => response.data)
    .then(({ token, is_admin }) => {
      localStorage.setItem(`token`, token)
      return dispatch({
        type: UnauthorizedAction.LOG_IN,
        payload: { isAdmin: is_admin },
      })
    })
}

export const logout = () => () => {
  localStorage.clear()
  window.location.reload()
}
