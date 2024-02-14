import apiService from './base.service'

function applyCoupon(coupon) {
  return apiService.post('/coupons/apply', { code: coupon })
}

const couponsApi = {
  applyCoupon
}

export default couponsApi
