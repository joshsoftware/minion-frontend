import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3030/api/v1'
const organizations = () => {
  return axios
    .get(API_URL + '/organizations', { headers: authHeader() })
    .then(response => {
      return response.data.organizations ? response.data.organizations : []
    })
}

export default {
  organizations
}
