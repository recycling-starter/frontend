const UsersAction = {
  SET_USERS: `SET_USERS`,
}

export default UsersAction

export const getBoxes = () => (dispatch, getState, api) => {
  return api.get(`/users/`).then((response) => {
    return dispatch({
      type: UsersAction.SET_USERS,
      payload: response.data,
    })
  })
}
