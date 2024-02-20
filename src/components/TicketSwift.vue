<template>
  <v-app>
    <v-main>
      <EventsList />
    </v-main>
  </v-app>
</template>

<script>
import EventsList from '@/components/Events/EventsList.vue'
export default {
  name: 'TicketSwift',
  components: {
    EventsList
  }
}
</script>
