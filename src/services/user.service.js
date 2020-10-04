import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3030/api/v1'
const users = () => {
  return axios
    .get(API_URL + '/users', { headers: authHeader() })
    .then(response => {
      return response.data.users ? response.data.users : []
    })
}

const user = (uuid) => {
  return axios
    .get(API_URL + '/user/' + uuid, { headers: authHeader() })
    .then(response => {
      return response.data.user ? response.data.user : {}
    })
}

export default {
  users,
  user
}
