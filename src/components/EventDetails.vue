<!-- EventDetail.vue -->

<template>
  <div>
    <div>
      <v-card class="ma-0 mb-10" height="600" theme="dark">
        <v-card-title class="my-6" style="font-size: 40px">{{ name }}</v-card-title>
        <v-img v-if="image" :src="event.image" :title="name"></v-img>
        <v-img v-else src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" title=""></v-img>
      </v-card>

      <!-- <h1>Dettagli dell'evento {{ $route.params.eventId }}</h1> -->
      <!-- <h3>Name: {{ name }}</h3> -->
      <!-- <MeteoCard :message="'2024-01-26'" :lat="46.14675" :lon="12.21324"></MeteoCard> -->
      <!-- <MeteoCard v-if="lat" :message="'2024-02-10'" :lat="lat" :lon="lon"></MeteoCard> -->

      <v-container fluid ma-0 pa-0 fill-height>
        <v-row>
          <v-col cols="9">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium vestibulum
              vestibulum. Phasellus semper posuere massa. Proin eu sem a mi cursus elementum. Etiam
              sed urna ut orci laoreet rutrum. Curabitur vel ultrices diam. Duis et blandit lacus.
              Duis pellentesque a ipsum vel maximus. Ut ligula dolor, finibus at urna a, luctus
              elementum turpis.<br />
            </p>
            <p>
              Vestibulum suscipit consectetur erat, at lacinia risus ullamcorper cursus. Suspendisse
              a augue est. Etiam ut lacus id erat ultrices scelerisque ut ac enim. Praesent in
              placerat justo, et porttitor dui. Nam id sodales enim. Quisque gravida ex lectus, quis
              molestie purus mollis ac. Cras dui ligula, cursus in pharetra vel, rhoncus sit amet
              dolor. Maecenas eu viverra est. Aliquam id neque eu massa rhoncus tempus eu consequat
              eros. Etiam orci eros, consectetur in malesuada nec, volutpat a libero.<br />
            </p>
            <p>
              Ut sagittis elit vitae magna elementum, a feugiat risus egestas. Interdum et malesuada
              fames ac ante ipsum primis in faucibus. Duis scelerisque quam a gravida vestibulum.
              Pellentesque vitae tellus lobortis purus aliquet rutrum. Sed ut euismod leo. Cras eu
              molestie neque. Nullam sed metus tincidunt, finibus magna eu, malesuada felis. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac arcu leo.<br />
            </p>
          </v-col>
          <v-col>
            <MeteoCard v-if="lat" :message="date" :lat="lat" :lon="lon"></MeteoCard>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container fluid>
      <v-row class="head-section">
        <v-col class="column-cell">Ticket</v-col>
        <v-col class="column-cell">Price</v-col>
        <v-col class="column-cell">Quantity</v-col>
        <v-col class="column-cell">Actions</v-col>
      </v-row>
      <v-row v-for="item in tickets" :key="item._id">
        <v-col class="column-cell">
          {{ item.name }}
        </v-col>
        <v-col class="column-cell">
          {{ item.price }}
        </v-col>
        <v-col class="column-cell">
          {{ cart.get(item._id) }}
        </v-col>
        <v-col class="column-cell">
          <v-btn
            class="add-margin"
            icon="mdi-plus"
            size="small"
            color="success"
            :disabled="cart.get(item._id) >= item.availability"
            @click="addToCart(item)"
          >
          </v-btn>
          <v-btn
            icon="mdi-minus"
            size="small"
            color="error"
            :disabled="!cart.get(item._id)"
            @click="removeFromCart(item)"
          >
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-row class="column-cell">
      <PayPalButton />
    </v-row> -->
    <div style="margin-top: 50px"></div>
    <div class="payment-card">
      <v-card>
        <v-card-title>{{ name }}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
          <v-row>
            <v-col class="column-cell">Item</v-col>
            <v-col class="column-cell">Quantity</v-col>
            <v-col class="column-cell">Price</v-col>
          </v-row>
          <v-row v-for="item in tickets" :key="item._id">
            <v-col class="column-cell">
              <span class="center-ticket-name">{{ item.name }}</span>
            </v-col>
            <v-col class="column-cell">{{ cart.get(item._id) }}</v-col>
            <v-col class="column-cell">{{ item.price * cart.get(item._id) }}</v-col>
          </v-row>
          <v-row>
            <v-col class="column-cell">Total</v-col>
            <v-col class="column-cell"></v-col>
            <v-col class="column-cell">
              {{
                Array.from(cart).reduce(
                  (acc, [id, quantity]) => acc + tickets.find((t) => t._id === id).price * quantity,
                  0
                )
              }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-text-field
            v-model="discount"
            label="Discount"
            variant="solo"
            class="discount-form"
          ></v-text-field>
          <v-btn rounded="lg" variant="tonal" color="primary" class="discount-button">
            Apply
          </v-btn>
          <PayPalButton :discount="discount" />
        </v-card-actions>
      </v-card>
    </div>
    <!-- <MapCard v-if="lat" :lat="lat" :lon="lon" /> -->
    <div style="height: 10px"></div>
  </div>
</template>

<script>
import axios from 'axios'
import MeteoCard from './MeteoPage.vue'
// import MapCard from './GoogleMaps/MapCard.vue'
import PayPalButton from './PayPalButton.vue'

export default {
  name: 'TicketSwift',
  components: {
    MeteoCard,
    // MapCard,
    PayPalButton
  },
  data: () => ({
    res: null,
    event: null,
    lat: null,
    lon: null,
    date: null,
    image: null,
    name: null,
    tickets: null,
    cart: new Map(),
    discount: null
  }),
  computed: {},
  async mounted() {
    this.load()
  },
  methods: {
    load: async function () {
      console.log('Loading... ' + this.$route.params.eventId)
      this.event = await axios
        .get(`http://localhost:5000/api/events/${this.$route.params.eventId}`, {
          withCredentials: true
        })
        .catch((err) => {
          console.log(err)
        })
      this.event = this.event.data?.[0]
      this.date = this.event.date.split('T')[0]
      this.lat = this.event.location.coordinates.latitude
      this.lon = this.event.location.coordinates.longitude
      this.image = this.event?.image
      this.name = this.event?.name
      this.tickets = this.event.tickets
      for (let ticket of this.tickets) {
        this.cart.set(ticket._id, 0)
      }
    },
    addToCart(item) {
      console.log(this.cart)
      this.cart.set(item._id, this.cart.get(item._id) + 1)
      console.log(item._id + ': ' + this.cart.get(item._id))
    },
    removeFromCart(item) {
      this.cart.set(item._id, this.cart.get(item._id) - 1)
      console.log(item._id + ': ' + this.cart.get(item._id))
    }
  }
}
</script>

<style scoped>
.column-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid rgb(0, 0, 0);
}
.head-section {
  background-color: #d8d8d8;
  font-weight: bold;
}
.add-margin {
  margin: 0 10px;
}
.payment-card {
  margin: auto;
  width: 50%;
}
.center-ticket-name {
  text-align: center;
}
.discount-form {
  margin-top: 0.75rem;
  width: 30px;
}
.discount-button {
  margin: 0 0.5rem 0.5rem 0.5rem;
}
</style>
