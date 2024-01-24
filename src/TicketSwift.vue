<template>
  <v-app>
    <v-main>
      <EventsList />
      <DateFilter />
    </v-main>
  </v-app>
</template>

<script>
import EventsList from './components/EventsList.vue'
import DateFilter from './components/DateFilter.vue'
export default {
  name: 'App',
  components: {
    EventsList,
    DateFilter
  }
}
</script>

<style scoped>
/* .v-application {
  background-color: rgb(15, 23, 42);
} */
</style>
