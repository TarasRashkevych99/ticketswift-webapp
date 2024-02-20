import apiService from './base.service'

function getEventById(eventId) {
  return apiService.get(`/events/${eventId}`)
}

const eventsApi = {
  getEventById
}

export default eventsApi
