const SettingsAction = {
  SET_PROFILE_SETTINGS: `SET_BOXES`,
}

export default BoxesAction

export const getBoxes = () => (dispatch, getState, api) => {
  return api.get(`/boxes/`).then((response) => {
    return dispatch({
      type: BoxesAction.SET_BOXES,
      payload: response.data,
    })
  })
}