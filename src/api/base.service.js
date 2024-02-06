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

export default apiService
