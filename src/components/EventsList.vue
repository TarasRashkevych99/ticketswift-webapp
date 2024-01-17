<template>
  <li v-for="event in events">
    <v-container>
      <v-col cols="12">
        <v-card :href="`http://localhost:3000/events/${event._id}`">
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" size="150" rounded="lg">
              <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
            </v-avatar>

            <div class="text-left">
              <v-card-title class="text-h5"> {{ event.name }} </v-card-title>

              <v-card-subtitle>
                <v-icon icon="mdi-calendar-range" color="primary"></v-icon>
                {{ dateToString(event.date) }}
              </v-card-subtitle>
              <v-card-subtitle>
                <v-icon icon="mdi-currency-eur" color="primary"></v-icon>
                From: {{ event.tickets[0].price }} €
              </v-card-subtitle>
              <v-card-subtitle>
                <v-icon icon="mdi-map-marker" color="primary"></v-icon>
                {{ event.location.city }}, {{ event.location.country }}
              </v-card-subtitle>
              <v-card-subtitle>
                <v-icon icon="mdi-account" color="primary"></v-icon>
                {{ event.artist.name }}
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-container>
  </li>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EventsList',
  data: () => ({
    events: null,
    eventsResponse: null
  }),
  computed: {},
  async mounted() {
    this.eventsResponse = await axios
      .get('http://localhost:5000/api/events', {
        withCredentials: true
      })
      .catch((err) => {
        console.log(err)
      })
    this.events = this.eventsResponse.data
  },
  methods: {
    dateToString(date) {
      const newDate = new Date(date)
      return newDate.toDateString()
    }
  }
}
</script>

<style scoped></style>
