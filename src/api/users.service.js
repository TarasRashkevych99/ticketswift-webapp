import apiService from './base.service'

async function isUserAuthenticated() {
  try {
    const res = await apiService.get('/users/authenticated')
    return res.isAuthenticated
  } catch (error) {
    return false
  }
}

const usersApi = {
  isUserAuthenticated
}

export default usersApi
