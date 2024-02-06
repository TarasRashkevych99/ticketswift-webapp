import apiService from './base.service'

function login(email, password) {
  return apiService.post('/auth/login', { email, password })
}

const authenticationApi = {
  login
}

export default authenticationApi
