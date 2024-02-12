<template>
  <div class="asdf">
    <div id="paypal-button-container" class="adjust-dim"></div>
  </div>
</template>

<script>
export default {
  name: 'TagsList',
  data: () => ({
    eventData: null,
    eventResponse: null,
    mainTag: null,
    secondaryTags: null
  }),
  computed: {},
  mounted() {
    this.payPalSetup()
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
            try {
              const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                  cart: [
                    {
                      event_id: '65a2b1f19780411fd46fa864',
                      ticket_id: '65a2b1f978041123d46fa864',
                      quantity: '2'
                    },
                    {
                      event_id: '65a2b1f19780411fd46fa864',
                      ticket_id: '65a2b1f978041123d46fa865',
                      quantity: '1'
                    }
                  ],
                  coupon: ''
                })
              })

              const orderData = await response.json()

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
              const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                }
              })

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
.asdf {
  display: flex;
  justify-content: center;
}
</style>
