import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3030/api/v1'
const count = () => {
  let orgs = []
  return axios
    .get(API_URL + '/log/count', { headers: authHeader() })
    .then(response => {
      return response.data.count ? response.data.count : 0
    })
}

const get_unique_services = servers => {
  return axios
    .post(
      API_URL + '/log/services',
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

const get = (uuid, criteria, dedups, next_from) => {
  console.log('Getting logs with:')
  console.log(criteria)
  return axios
    .post(
      API_URL + '/log/get',
      {
        uuid: uuid,
        criteria: criteria,
        dedups: dedups,
        next_from: next_from
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
  count,
  get_unique_services,
  get
}
