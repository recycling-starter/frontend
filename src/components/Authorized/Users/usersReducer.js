import UsersAction from './usersActions'

const initialState = {
  users: [],
  user: undefined,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersAction.SET_USERS:
      return { ...state, users: action.payload }
    case UsersAction.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export default usersReducer
