import apiService from './base.service'

function login(email, password) {
  return apiService.post('/auth/login', { email, password })
}

function signup(email, password) {
  return apiService.post('/auth/signup', { email, password })
}

const authenticationApi = {
  login,
  signup
}

export default authenticationApi
