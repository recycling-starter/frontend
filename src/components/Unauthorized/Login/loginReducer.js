import LoginAction from './loginActions'

const initialState = {
  isAdmin: undefined,
  isAuthorized: false,
  name: ``,
  building: null,
  email: ``,
  phone: null,
  room: ``,
  organization: null,
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginAction.LOG_IN:
      return { ...state, ...action.payload, isAuthorized: true }
    case LoginAction.GET_DATA:
      return { ...state, ...action.payload, isAuthorized: true }
    default:
      return state
  }
}

export default loginReducer
