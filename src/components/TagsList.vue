<template>
  <div class="d-flex justify-center ga-2">
    <v-chip> {{ mainTag }} </v-chip>
    <li v-for="tag in secondaryTags">
      <v-chip> {{ tag }} </v-chip>
    </li>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TagsList',
  data: () => ({
    eventData: null,
    eventResponse: null,
    mainTag: null,
    secondaryTags: null
  }),
  computed: {},
  async mounted() {
    this.eventResponse = await axios
      .get('http://localhost:5000/api/events/65a7fff84e0426b36519ac04', {
        withCredentials: true
      })
      .catch((err) => {
        console.log(err)
      })
    this.eventData = this.eventResponse.data[0]
    this.mainTag = this.eventData.genre
    this.secondaryTags = this.eventData.subgenre
  },
  methods: {}
}
</script>

<style scoped></style>
