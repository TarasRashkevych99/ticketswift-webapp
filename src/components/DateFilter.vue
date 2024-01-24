<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" sm="6" md="4">
        <v-dialog width="auto" height="auto">
          <template #activator="{ props }">
            <v-btn v-bind="props"> Start Date: {{ dateToISO(startDate) }} </v-btn>
          </template>

          <template #default="{ isActive }">
            <v-card title="Start Date">
              <v-date-picker v-model="startDate" :min="currentDate"></v-date-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Select Start Date" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-dialog width="auto" height="auto">
          <template #activator="{ props }">
            <v-btn v-bind="props"> End Date: {{ dateToISO(endDate) }} </v-btn>
          </template>

          <template #default="{ isActive }">
            <v-card title="End Date">
              <v-date-picker v-model="endDate" :min="minEndDate"></v-date-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Select End Date" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>

    <br /><br /><br />
    <v-row>
      Start: {{ startDate }} <br />
      End: {{ endDate }}
    </v-row>
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
      this.minEndDate = new Date(this.startDate.getTime())
      this.minEndDate.setDate(this.minEndDate.getDate() + 1)
      this.endDate = null
    }
  },
  async mounted() {
    this.currentDate = new Date()
    this.currentDate.setDate(this.currentDate.getDate() - 1)
  },
  methods: {
    dateToISO(date) {
      if (date == undefined) {
        return 'not selected'
      }
      console.log(date)
      this.offset = date.getTimezoneOffset()
      date = new Date(date.getTime() - this.offset * 60 * 1000)
      date = date.toISOString().split('T')[0]
      date = date.split('-').reverse().join('-')
      console.log(date)
      return date
    }
  }
}
</script>

<style scoped></style>
