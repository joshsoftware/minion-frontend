import axios from 'axios'
import decode from 'jwt-decode'

// TODO: Get this from an environment variable.
const API_URL = 'http://localhost:3030/api/v1/auth/'

const register = (email, password) => {
  return axios.post(API_URL + 'signup', {
    email,
    password
  })
}

const login = (email, password) => {
  return axios
    .post(API_URL + 'signin', {
      email,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  return decode(JSON.parse(localStorage.getItem('user'))['accessToken'])
}

const getAccessToken = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const isAccessTokenExpired = token => {
  try {
    const data = decode(token)
    if (data.exp < Date.now() / 1000) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

export default {
  register,
  login,
  logout,
  getCurrentUser
}
