const CallsAction = {
  SET_CALLS: `SET_CALLS`,
  SET_CALL: `SET_CALL`,
}

export default CallsAction

export const getCalls = () => (dispatch, getState, api) => {
  return api.get(`/dropoffs/`).then((response) => {
    return dispatch({
      type: CallsAction.SET_CALLS,
      payload: response.data,
    })
  })
}

export const getCall = (id) => (dispatch, getState, api) => {
  return api.get(`/dropoffs/${id}`).then((response) => {
    return dispatch({
      type: CallsAction.SET_CALL,
      payload: response.data,
    })
  })
}

export const putCall = (id) => (dispatch, getState, api) => {
  return api.put(`/dropoffs/${id}`)
}
