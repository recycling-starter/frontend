const BoxesAction = {
  SET_BOXES: `SET_BOXES`,
  SET_BOX: `SET_BOX`,
  SET_AVAILABLE_USERS: `SET_AVAILABLE_USERS`,
}

export default BoxesAction

export const getBoxes = ({ building, organization } = {}) => (
  dispatch,
  getState,
  api,
) => {
  return api
    .get(`/boxes/`, { params: building ? { building } : { organization } })
    .then((response) => {
      return dispatch({
        type: BoxesAction.SET_BOXES,
        payload: response.data,
      })
    })
}

export const getBox = (id) => (dispatch, getState, api) => {
  return api.get(`/boxes/${id}`).then((response) => {
    return dispatch({
      type: BoxesAction.SET_BOX,
      payload: response.data,
    })
  })
}

export const getAvailableUsers = (id) => (dispatch, getState, api) => {
  return api.get(`/boxes/${id}/get_available`).then((response) => {
    return dispatch({
      type: BoxesAction.SET_AVAILABLE_USERS,
      payload: response.data,
    })
  })
}

export const putBox = (id, values) => (dispatch, getState, api) => {
  return api.put(`/boxes/${id}`, values).then(() => {
    dispatch(getBox(id))
  })
}

export const patchBox = (id, fullness) => (dispatch, getState, api) => {
  return api.patch(`/boxes/${id}`, { fullness }).then(() => {
    dispatch(getBox(id))
  })
}

export const postBox = (values) => (dispatch, getState, api) => {
  return api.post(`/boxes/`, values).then((response) => response.data)
}

export const deleteBox = (id) => (dispatch, getState, api) => {
  return api.delete(`/boxes/${id}`)
}

export const postUserToBox = ({ user, id }) => (dispatch, getState, api) => {
  return api
    .post(`/boxes/${id}/changeuser`, { user })
    .then((response) => response.data)
    .then(() => {
      dispatch(getBox(id))
      dispatch(getAvailableUsers(id))
    })
}

export const deleteUserFromBox = ({ user, id }) => (
  dispatch,
  getState,
  api,
) => {
  return api.delete(`/boxes/${id}/changeuser?user=${user}`)
}
