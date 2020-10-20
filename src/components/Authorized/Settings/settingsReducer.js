import SettingsAction from './settingsActions'

const initialState = {
  organization: undefined,
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SettingsAction.SET_ORGANIZATION:
      return { ...state, organization: action.payload }
    default:
      return state
  }
}

export default settingsReducer
