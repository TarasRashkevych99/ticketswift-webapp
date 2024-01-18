<template>
  <v-app>
    <v-main>
      <EventsList />
      <DateFilter />
      <TicketSwift />
    </v-main>
  </v-app>
</template>

<script>
import TicketSwift from './components/TicketSwift.vue'
import EventsList from './components/EventsList.vue'
import TagsList from './components/TagsList.vue'
import DateFilter from './components/DateFilter.vue'
export default {
  name: 'App',
  components: {
    EventsList,
    TicketSwift,
    TagsList,
    DateFilter
  }
}
</script>

<style scoped>
/* .v-application {
  background-color: rgb(15, 23, 42);
} */
</style>
