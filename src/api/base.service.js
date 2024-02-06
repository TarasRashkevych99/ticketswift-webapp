import axios from 'axios'
import config from '../../config'

const apiService = axios.create({
  baseURL: `${config.TICKETSWIFT_HOST_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})

apiService.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default apiService
