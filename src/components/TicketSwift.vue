<template>
  <v-container align="center" justify="center">
    <v-card class="rounded-lg">
      <v-card-title class="chat-title">{{ res }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TicketSwift',
  data: () => ({
    res: null
  }),
  computed: {},
  async mounted() {
    this.res = await axios
      .get('http://localhost:5000', {
        withCredentials: true
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {}
}
</script>

<style scoped></style>
