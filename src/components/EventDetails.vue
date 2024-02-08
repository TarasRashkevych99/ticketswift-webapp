<!-- EventDetail.vue -->

<template>
  <div>
    <v-card class="ma-0 mb-10 " height="600" theme="dark">
      <v-card-title class="my-6" style="font-size: 40px;">{{ name }}</v-card-title>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium vestibulum vestibulum. Phasellus
            semper posuere massa. Proin eu sem a mi cursus elementum. Etiam sed urna ut orci laoreet rutrum. Curabitur vel
            ultrices diam. Duis et blandit lacus. Duis pellentesque a ipsum vel maximus. Ut ligula dolor, finibus at urna
            a,
            luctus elementum turpis.<br>
          </p>
          <p>
            Vestibulum suscipit consectetur erat, at lacinia risus ullamcorper cursus. Suspendisse a augue est. Etiam ut
            lacus id erat ultrices scelerisque ut ac enim. Praesent in placerat justo, et porttitor dui. Nam id sodales
            enim. Quisque gravida ex lectus, quis molestie purus mollis ac. Cras dui ligula, cursus in pharetra vel,
            rhoncus
            sit amet dolor. Maecenas eu viverra est. Aliquam id neque eu massa rhoncus tempus eu consequat eros. Etiam
            orci
            eros, consectetur in malesuada nec, volutpat a libero.<br>
          </p>
          <p>
            Ut sagittis elit vitae magna elementum, a feugiat risus egestas. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Duis scelerisque quam a gravida vestibulum. Pellentesque vitae tellus lobortis purus
            aliquet
            rutrum. Sed ut euismod leo. Cras eu molestie neque. Nullam sed metus tincidunt, finibus magna eu, malesuada
            felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac arcu leo.<br>
          </p>
        </v-col>
        <v-col>
          <!-- <v-row class="d-flex justify-center align-center"> -->
          <v-table class="mb-10">
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Price
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tickets" :key="item.id" height=80>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <v-btn @click="addToCart(item)" color="success">
                    Add to Cart
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <!-- </v-row> -->
          <v-row>
            <MeteoCard v-if="lat" :message="date" :lat="lat" :lon="lon"></MeteoCard>
          </v-row>
        </v-col>
      </v-row>
    </v-container>



  </div>
</template>

<script>
import axios from 'axios'
import MeteoCard from './MeteoPage.vue'

export default {
  name: 'TicketSwift',
  components: {
    MeteoCard
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
    }
  }
}
</script>
