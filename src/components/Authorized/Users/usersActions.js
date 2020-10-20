const UsersAction = {
  SET_USERS: `SET_USERS`,
  SET_USER: `SET_USER`,
}

export default UsersAction

export const getUsers = (building) => (dispatch, getState, api) => {
  return api
    .get(`/users/`, { params: { building } })
    .then(({ data }) =>
      dispatch({
        type: UsersAction.SET_USERS,
        payload: data,
      }),
    )
    .catch((error) => {
      console.log(error)
    })
}

export const getUser = (id) => (dispatch, getState, api) => {
  return api
    .get(`/users/${id}`)
    .then(({ data }) =>
      dispatch({
        type: UsersAction.SET_USER,
        payload: data,
      }),
    )
    .catch((error) => {
      console.log(error)
    })
}
