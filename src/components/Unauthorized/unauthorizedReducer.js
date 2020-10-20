import UnauthorizedAction from './unauthorizedActions'

const initialState = {
  isAdmin: undefined,
  isAuthorized: false,
  name: ``,
  building: null,
  email: ``,
  phone: null,
  room: ``,
  organization: null,
  buildings: [],
}

const unauthorizedReducer = (state = initialState, action) => {
  switch (action.type) {
    case UnauthorizedAction.SET_BUILDINGS:
      return { ...state, buildings: action.payload }
    case UnauthorizedAction.SET_DATA:
      return { ...state, ...action.payload, isAuthorized: true }
    default:
      return state
  }
}

export default unauthorizedReducer
