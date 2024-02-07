<template>
  <v-app>
    <v-main>
      <EventsList />
    </v-main>
  </v-app>
</template>

<script>
import EventsList from './EventsList.vue'
export default {
  name: 'App',
  components: {
    EventsList
  }
}
</script>

<style scoped>
/* .v-application {
  background-color: rgb(15, 23, 42);
} */
</style>
