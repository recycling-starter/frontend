export const HOST = `https://api.recyclingstarter.ru`

export const PUBLIC_PATH = {
  LOGIN: `/login`,
  REGISTRATION: `/registration`,
  RESTORE: `/restore`,
  RESET_PASSWORD: `/reset_password/:uid/:token`,
  CONFIRM_EMAIL: `/confirm_email/:uid/:token`,
}

export const PRIVATE_PATH = {
  PROFILE: `/profile`,
  BOXES: `/boxes`,
  BOX: `/boxes/:id`,
  USERS: `/users`,
  USER: `/users/:id`,
  CALLS: `/calls`,
  CALL: `/calls/:id`,
  SETTINGS: `/settings`,
  CREATE_BOX: `/create_box`,
}
