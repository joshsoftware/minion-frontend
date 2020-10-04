import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3030/api/v1'
const summary = () => {
  return axios
    .get(API_URL + '/server/summary', { headers: authHeader() })
    .then(response => {
      return response.data.servers ? response.data.servers : 0
    })
}

const names = servers => {
  return axios
    .post(
      API_URL + '/server/names',
      {
        servers: servers
      },
      {
        headers: authHeader()
      }
    )
    .then(response => {
      return response.data ? response.data : []
    })
}

export default {
  summary,
  names
}
