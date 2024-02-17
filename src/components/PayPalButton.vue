<template>
  <div>
    <div id="paypal-button-container" class="adjust-dim"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PayPalButton',
  props: {
    cart: {
      type: Map,
      required: true
    },
    eventId: {
      type: String,
      required: true
    },
    coupon: {
      type: String,
      default: null
    }
  },
  data: () => ({}),
  computed: {},
  watch: {
    cart: {
      handler: function (newCart) {
        console.log('Cart updated: ' + JSON.stringify(Object.fromEntries(newCart)))
      },
      deep: true
    },
    coupon: {
      handler: function (newCoupon) {
        console.log('Coupon updated: ' + newCoupon)
      }
    }
  },
  mounted() {
    this.payPalSetup()
    console.log('Cart ' + this.cart)
    console.log('Event Id ' + this.eventId)
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

          // eslint-disable-next-line no-unused-vars
          createOrder: async (data, actions) => {
            //console.log('Cart ' + JSON.stringify(Object.fromEntries(this.cart)))
            //console.log('Event Id ' + this.eventId)
            //console.log('Coupon ' + this.coupon)
            try {
              const response = await axios.post(
                `http://localhost:5000/api/purchases/`,
                {
                  cart: Object.fromEntries(this.cart),
                  event_id: this.eventId,
                  coupon: this.coupons
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
            }
          },

          onApprove: async (data, actions) => {
            try {
              console.log('Event Id ' + this.eventId)
              const response = await axios.post(
                `http://localhost:5000/api/purchases/${data.orderID}/capture`,
                {},
                {
                  withCredentials: true
                }
              )

              //console.log('CIAO' + response.data)
              const orderData = response.data
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()                  (Metodo di pagamento rifiutato)
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0]

              if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                console.log('Instrument Declined')
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart()
              } else if (errorDetail) {
                console.log('Non recoverable error')
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`)
              } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData))
              } else {
                console.log('Successful Transaction')
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');

                // Redirect setup page: https://www.sandbox.paypal.com/businessmanage/preferences/website#
                // return actions.redirect('https://developer.paypal.com/docs/checkout/standard/customize/single-page-app/#vue');
                //window.location.href = 'thank_you.html'

                // const transaction =
                //   orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                //   orderData?.purchase_units?.[0]?.payments?.authorizations?.[0]

                // resultMessage(
                //   `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
                // )
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2))

                // TODO Prima di fare il redirect devo passare dei dati (info sul pagamento + nuovo coupon). Potrei usare sessionStorage
                /*
                return actions.redirect(
                  'https://developer.paypal.com/docs/checkout/standard/customize/single-page-app/#vue'
                )
                */
              }
            } catch (error) {
              console.error(error)
              // resultMessage(`Sorry, your transaction could not be processed...<br><br>${error}`)
            }
          },

          async onCancel(data) {
            // Se chiudo la pagina di paypal prima di concludere l'acquisto

            console.log('Cancellato')
            console.log(data)
            console.log('Ordine numero: ' + data.orderID)
            const response = await axios.post(
              `http://localhost:5000/api/purchases/cancel`,
              {
                id: data.orderID
              },
              {
                withCredentials: true
              }
            )
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
