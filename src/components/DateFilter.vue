<template>
  <v-container>
    <v-row justify="space-around">
      <v-date-picker v-model="selectedDate" :min="currentDate"></v-date-picker>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DateFilter',
  data: () => ({
    selectedDate: null,
    currentDate: null,
    offset: null
  }),
  computed: {},
  async mounted() {
    this.currentDate = new Date()
    this.offset = this.currentDate.getTimezoneOffset()
    this.currentDate = new Date(this.currentDate.getTime() - this.offset * 60 * 1000)
    this.currentDate.toISOString().split('T')[0]
  },
  methods: {}
}
</script>

<style scoped></style>
