<template>
  <v-container>
    <v-col cols="12">
      <v-card class="mx-auto" color="grey-lighten-5" max-width="400">
        <v-card-text>
          <v-text-field
            v-model="search"
            density="compact"
            variant="solo"
            label="Search events"
            single-line
            hide-details
            clearable
            @click:clear="search = ''"
            @input="eventSearch()"
          ></v-text-field>
        </v-card-text>
      </v-card>

      <DateFilter @update-date-filter="handleDateFilter" />
      <RangeFilter @update-location-filter="handleLocationFilter"></RangeFilter>
      <CategoriesFilter @update-genre-filter="handleGenreFilter"></CategoriesFilter>

      <div v-for="event in events" :key="event._id">
        <v-card :href="`http://localhost:3000/events/${event._id}`">
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" size="150" rounded="lg">
              <v-img v-if="event.image" :src="`${event.image}`"></v-img>
              <v-img v-else src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
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
              <v-card-subtitle v-if="event.artist">
                <v-icon icon="mdi-account" color="primary"></v-icon>
                {{ event.artist.name }}
              </v-card-subtitle>
            </div>
          </div>
        </v-card>
        <br />
      </div>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import DateFilter from '@/components/Filters/DateFilter.vue'
import RangeFilter from '@/components/Filters/RangeFilter.vue'
import CategoriesFilter from '@/components/Filters/CategoriesFilter.vue'

export default {
  name: 'EventsList',
  components: { DateFilter, RangeFilter, CategoriesFilter },
  data: () => ({
    events: null,
    eventsResponse: null,
    search: '',
    dateFilter: '',
    locationFilter: '',
    genreFilter: ''
  }),
  computed: {},
  mounted() {
    this.getMycurrentLocation()
  },
  methods: {
    dateToString(date) {
      const newDate = new Date(date)
      return newDate.toDateString()
    },
    eventSearch: _.debounce(async function () {
      console.log(this.search)
      await this.getEvents()
    }, 400),
    async getEvents() {
      console.log(
        `http://localhost:5000/api/events?keyword=${this.search}${this.dateFilter}${this.locationFilter}${this.genreFilter}`
      )
      this.eventsResponse = await axios
        .get(
          `http://localhost:5000/api/events?keyword=${this.search}${this.dateFilter}${this.locationFilter}${this.genreFilter}`,
          {
            withCredentials: true
          }
        )
        .catch((err) => {
          console.log(err)
        })
      this.events = this.eventsResponse.data
    },
    handleDateFilter(value) {
      this.dateFilter = value
      this.getEvents()
    },
    handleLocationFilter(value) {
      this.locationFilter = value
      this.getEvents()
    },
    handleGenreFilter(value) {
      this.genreFilter = value
      this.getEvents()
    },
    getMycurrentLocation() {
      function success(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        sessionStorage.setItem('latitude', latitude)
        sessionStorage.setItem('longitude', longitude)
      }

      function error() {
        sessionStorage.setItem('positionNotAvailable', true)
      }

      if (!navigator.geolocation) {
        // status.textContent = 'Geolocation is not supported by your browser'
      } else {
        navigator.geolocation.getCurrentPosition(success, error)
      }
    }
  }
}
</script>

<style scoped></style>
