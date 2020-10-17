import { PRIVATE_PATH } from '../../../config'

const BoxesAction = {
  SET_BOXES: `SET_BOXES`,
  SET_BOX: `SET_BOX`,
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

export const getBox = (id) => (dispatch, getState, api) => {
  return api.get(`/boxes/${id}`).then((response) => {
    return dispatch({
      type: BoxesAction.SET_BOX,
      payload: response.data,
    })
  })
}

export const putBox = (id, values) => (dispatch, getState, api) => {
  return api.put(`/boxes/${id}`, values).then((response) => {
    dispatch(getBox(id))
  })
}

export const postBox = (values) => (dispatch, getState, api) => {
  return api
    .post(`/boxes/`, values)
    .then((response) => response.data)
    .then(({ id }) => {
      window.location.pathname = `${PRIVATE_PATH.BOXES}/${id}`
    })
}
