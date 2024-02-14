import apiService from './base.service'

function applyCoupon(coupon) {
  return apiService.post('/coupons/apply', { coupon })
}

const couponsApi = {
  applyCoupon
}

export default couponsApi
