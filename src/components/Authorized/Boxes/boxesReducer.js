import BoxesAction from './boxesActions'

const initialState = {
  boxes: [],
  box: undefined,
}

const boxesReducer = (state = initialState, action) => {
  switch (action.type) {
    case BoxesAction.SET_BOXES:
      return { ...state, boxes: action.payload }
    case BoxesAction.SET_BOX:
      return { ...state, box: action.payload }
    default:
      return state
  }
}

export default boxesReducer
