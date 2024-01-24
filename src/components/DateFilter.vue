<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="startDate" label="Start Date" readonly />
        <v-date-picker v-model="startDate" :min="currentDate"></v-date-picker>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="endDate" label="End Date" readonly />
        <v-date-picker v-model="endDate" :min="minEndDate"></v-date-picker>
      </v-col>
    </v-row>
    Start: {{ startDate }} <br />
    End: {{ endDate }}
  </v-container>
</template>

<script>
export default {
  name: 'DateFilter',
  data: () => ({
    startDate: new Date(),
    currentDate: null,
    endDate: null,
    minEndDate: new Date(),
    offset: null
  }),
  computed: {},
  watch: {
    startDate: function () {
      console.log(this.startDate)
      this.minEndDate = new Date(this.startDate.getTime())
      this.minEndDate.setDate(this.minEndDate.getDate() + 1)
      this.endDate = null
    }
  },
  async mounted() {
    this.currentDate = new Date()
    this.currentDate.setDate(this.currentDate.getDate() - 1)
    this.offset = this.currentDate.getTimezoneOffset()
    this.currentDate = new Date(this.currentDate.getTime() - this.offset * 60 * 1000)
    this.currentDate.toISOString()
  },
  methods: {}
}
</script>

<style scoped></style>
