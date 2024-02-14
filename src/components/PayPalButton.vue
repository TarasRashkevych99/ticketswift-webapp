<template>
  <div>
    <div id="paypal-button-container" class="adjust-dim"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TagsList',
  props: ['cart', 'event', 'coupon'],
  data: () => ({}),
  computed: {},
  mounted() {
    this.payPalSetup()
    console.log('Cart ' + this.cart)
    console.log('Event Id ' + this.event)
    console.log('Coupon ' + this.coupon)
  },
  methods: {
    payPalSetup() {
      window.paypal
        .Buttons({
          style: {
            shape: 'pill',
            //color:'blue', change the default color of the buttons
            layout: 'vertical' //default value. Can be changed to horizontal
          },

          async createOrder() {
            console.log('Cart ' + this.cart)
            console.log('Event Id ' + this.event)
            console.log('Coupon ' + this.coupon)
            try {
              const response = await axios.post(
                `http://localhost:5000/api/purchases/`,
                {
                  cart: this.cart,
                  event_id: this.event,
                  coupon: this.coupon
                },
                {
                  withCredentials: true
                }
              )

              const orderData = await response.data
              console.log(orderData)

              if (orderData.id) {
                return orderData.id
              } else {
                const errorDetail = orderData?.details?.[0]
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData)

                throw new Error(errorMessage)
              }
            } catch (error) {
              console.error(error)
              // resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`)
            }
          },

          async onApprove(data, actions) {
            try {
              const response = await axios.post(
                `http://localhost:5000/api/purchases/${data.orderID}/capture`,
                {
                  withCredentials: true
                }
              )

              const orderData = await response.json()
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()                  (Metodo di pagamento rifiutato)
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0]

              if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart()
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`)
              } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData))
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');

                // Redirect setup page: https://www.sandbox.paypal.com/businessmanage/preferences/website#
                // return actions.redirect('https://developer.paypal.com/docs/checkout/standard/customize/single-page-app/#vue');
                window.location.href = 'thank_you.html'
                // const transaction =
                //   orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                //   orderData?.purchase_units?.[0]?.payments?.authorizations?.[0]

                // resultMessage(
                //   `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
                // )
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2))
              }
            } catch (error) {
              console.error(error)
              // resultMessage(`Sorry, your transaction could not be processed...<br><br>${error}`)
            }
          },

          async onCancel(data) {
            // Se chiudo la pagina di paypal prima di concludere l'acquisto

            console.log('Cancellato')
            console.log('Ordine numero: ' + data.orderID) // TODO Modifico lo stato del pagamento, impostandolo a cancellato
          }
        })
        .render('#paypal-button-container')

      // Example function to show a result to the user. Your site's UI library can be used instead.
      // function resultMessage(message) {
      //   const container = document.querySelector('#result-message')
      //   container.innerHTML = message
      // }
    }
  }
}
</script>

<style scoped>
.adjust-dim {
  width: 25%;
}
</style>
