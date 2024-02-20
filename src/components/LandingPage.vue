<template>
  <div>
    <v-container>
      <v-card class="mx-auto" color="grey-lighten-5" max-width="600">
        <v-card-title v-if="purchaseData">
          Payment Details: o.n. {{ purchaseData.payPalId }}
        </v-card-title>
        <v-card-text v-if="purchaseData">
          <p v-if="errorMessage !== null">{{ errorMessage }}</p>
          <p>Total Price: {{ purchaseData.price }}</p>
          <p>Cart:</p>
          <ul>
            <li v-for="item of purchaseData.cart" :key="item.ticketId" class="cart-item">
              {{ item.ticketId }} x{{ item.quantity }}
            </li>
          </ul>
          <p v-if="couponId">CouponId: {{ couponId }}</p>
          <ul>
            <li class="cart-item">
              <p v-if="couponId">Code: {{ couponData.code }}</p>
            </li>
            <li class="cart-item">
              <p v-if="couponId">
                Amount: {{ couponData.amount }} {{ couponData.isPercentage ? '%' : '' }}
              </p>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" block class="mt-2" color="primary" @click="goHome()">Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <RoutingCard v-if="lat && lon" :lat="lat" :lon="lon" />
  </div>
</template>

<script>
import RoutingCard from '@/components/GoogleMaps/RoutingCard.vue'

export default {
  name: 'LandingPage',
  components: {
    RoutingCard
  },
  data: () => ({
    orderId: null,
    couponId: null,
    eventId: null,
    couponData: null,
    purchaseData: null,
    lat: null,
    lon: null,
    errorMessage: null
  }),
  computed: {},
  async created() {
    this.orderId = this.$route.query.orderId
    console.log(this.$route.query.couponId)
    this.couponId = this.$route.query.couponId
    console.log(this.couponId)

    if (this.couponId) {
      try {
        const coupon = await this.apiService.couponsApi.getCoupon(this.couponId)
        this.couponData = coupon.couponDetails
      } catch (error) {
        console.log(error)
      }
    }

    try {
      const purchase = await this.apiService.purchasesApi.getPurchase(this.orderId)
      this.purchaseData = purchase.purchaseDetails
      this.eventId = this.purchaseData.cart[0].eventId

      const event = await this.apiService.eventsApi.getEventById('65c3605ba8f4a309a5b0621a')
      console.log(event)
      this.lat = event[0].location.coordinates.latitude
      this.lon = event[0].location.coordinates.longitude
    } catch (error) {
      console.log(error)
      this.errorMessage = error.message
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.cart-item {
  margin-left: 2rem;
}
</style>
