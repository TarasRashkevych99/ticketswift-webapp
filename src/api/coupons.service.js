import apiService from './base.service'

function applyCoupon(coupon) {
  return apiService.post('/coupons/apply', { code: coupon })
}

function getCoupon(couponId) {
  return apiService.get(`/coupons/${couponId}`)
}

const couponsApi = {
  applyCoupon,
  getCoupon
}

export default couponsApi
