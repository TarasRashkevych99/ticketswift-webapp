<!-- EventDetail.vue -->

<template>
  <div>
    <v-img :width="300" aspect-ratio="16/9" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
    <h1>Dettagli dell'evento {{ $route.params.eventId }}</h1>

    <h3>Name: {{ event?.name }}</h3>
    <!-- <MeteoCard :message="'2024-01-26'" :lat="46.14675" :lon="12.21324"></MeteoCard> -->
    <!-- <MeteoCard v-if="lat" :message="'2024-02-10'" :lat="lat" :lon="lon"></MeteoCard> -->
    <MeteoCard v-if="lat" :message="'2024-02-10'" :lat="lat" :lon="lon"></MeteoCard>
    <!-- Altri dettagli dell'evento possono essere aggiunti qui -->
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
      this.lat = this.event.coordinates.latitude
      this.lon = this.event.coordinates.longitude
      console.log(this.event.date)
    }
  }
}
</script>
