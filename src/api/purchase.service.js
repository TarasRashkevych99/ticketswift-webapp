import apiService from './base.service'

function getPurchase(orderId) {
  return apiService.get(`/purchases/${orderId}`)
}

const purchasesApi = {
  getPurchase
}

export default purchasesApi
