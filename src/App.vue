<template>
  <v-app>
    <v-main>
      <TicketSwift />
      <MeteoCard />
    </v-main>
  </v-app>
</template>


<script>
import TicketSwift from './components/TicketSwift.vue'
import MeteoCard from './components/Meteo.vue'
export default {
  name: 'App',
  components: {
    TicketSwift,
    MeteoCard
  }
}
</script>

<style scoped>
/* .v-application {
  background-color: rgb(15, 23, 42);
} */
</style>
