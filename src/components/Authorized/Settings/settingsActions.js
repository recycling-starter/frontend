const SettingsAction = {
  SET_ORGANIZATION: `SET_ORGANIZATION`,
}

export default SettingsAction

export const getOrganization = () => (dispatch, getState, api) => {
  return api
    .get(`/organizations/${getState().session.organization}`)
    .then((response) => {
      return dispatch({
        type: SettingsAction.SET_ORGANIZATION,
        payload: response.data,
      })
    })
}

export const putOrganization = (values) => (dispatch, getState, api) => {
  return api
    .put(`/organizations/${getState().session.organization}`, values)
    .then((response) => {
      return dispatch({
        type: SettingsAction.SET_ORGANIZATION,
        payload: response.data,
      })
    })
}
