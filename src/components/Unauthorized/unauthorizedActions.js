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

export const getBuildings = (organization) => (dispatch, getState, api) => {
  return api
    .get(`/buildings/`, { params: { organization } })
    .then((response) => {
      return dispatch({
        type: UnauthorizedAction.SET_BUILDINGS,
        payload: response.data,
      })
    })
}

export const postUser = (values) => (dispatch, getState, api) => {
  return api.post(`/users/`, values).catch(({ response }) => {
    throw response.data
  })
}

export const resetPassword = (email) => (dispatch, getState, api) => {
  return api.post(`/users/reset_password`, { email })
}

export const duplicateBackEnd = (path, params) => (dispatch, getState, api) => {
  return api.post(path, params)
}

export const logout = () => () => {
  localStorage.clear()
  window.location.reload()
}
