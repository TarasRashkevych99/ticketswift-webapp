import apiService from './base.service'

async function isUserAuthenticated() {
  try {
    const response = await apiService.get('/users/active')
    return response.data
  } catch (error) {
    return false
  }
}

const usersApi = {
  isUserAuthenticated
}

export default usersApi
