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
      <Categories @update-genre-filter="handleGenreFilter"></Categories>

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
export default {
  name: 'LandingPage',
  components: {},
  data: () => ({
    coupon: null
  }),
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
