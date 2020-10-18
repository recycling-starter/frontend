import axios from 'axios'
import { HOST } from './config'

const Error = {
  UNAUTHORIZED: 401,
}

export const createAPI = (onUnauthorized) => {
  const token = localStorage.getItem(`token`)

  const api = axios.create({
    baseURL: `${HOST}/v1`,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })

  const onSuccess = (response) => {
    return response
  }

  const onFail = (err) => {
    const { response } = err

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized()
      throw err
    }

    throw err
  }

  api.interceptors.response.use(onSuccess, onFail)

  return api
}
