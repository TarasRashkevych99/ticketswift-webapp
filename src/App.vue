<template>
  <v-app>
    <v-main>
      <TicketSwift />
    </v-main>
  </v-app>
</template>

<script>
import TicketSwift from './components/TicketSwift.vue'
export default {
  name: 'App',
  components: {
    TicketSwift
  }
}
</script>

<style scoped>
/* .v-application {
  background-color: rgb(15, 23, 42);
} */
</style>
