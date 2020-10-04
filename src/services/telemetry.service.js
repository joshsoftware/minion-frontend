import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3030/api/v1'
const count = () => {
  return axios
    .get(API_URL + '/telemetry/count', { headers: authHeader() })
    .then(response => {
      return response.data.count ? response.data.count : 0
    })
}

const get = (uuid, criteria) => {
  console.log('Getting telemetry with:')
  console.log(criteria)
  return axios
    .post(
      API_URL + '/telemetry/get',
      {
        uuid: uuid,
        criteria: criteria
      },
      {
        headers: authHeader()
      }
    )
    .then(response => {
      return response.data ? response.data : []
    })
}

const get_primary_data_keys = servers => {
  return axios
    .post(
      API_URL + '/telemetry/primary_data_keys',
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
  get_primary_data_keys,
  count,
  get
}
