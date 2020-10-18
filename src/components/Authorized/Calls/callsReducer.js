import CallsAction from './callsActions'

const initialState = {
  calls: [],
  call: undefined,
}

const callsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CallsAction.SET_CALLS:
      return { ...state, calls: action.payload }
    case CallsAction.SET_CALL:
      return { ...state, call: action.payload }
    default:
      return state
  }
}

export default callsReducer
