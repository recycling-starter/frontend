import BoxesAction from './boxesActions'

const initialState = {
  boxes: [],
}

const boxesReducer = (state = initialState, action) => {
  switch (action.type) {
    case BoxesAction.SET_BOXES:
      return { ...state, boxes: action.payload }
    default:
      return state
  }
}

export default boxesReducer
