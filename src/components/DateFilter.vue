<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" sm="6" md="4">
        <v-dialog width="auto" height="auto">
          <template #activator="{ props }">
            <v-btn v-bind="props"> Start Date: {{ dateToString(startDate) }} </v-btn>
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
            <v-btn v-bind="props"> End Date: {{ dateToString(endDate) }} </v-btn>
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
    offset: null,
    filter: '',
    filterStart: '',
    filterEnd: ''
  }),
  computed: {},
  watch: {
    startDate: function () {
      this.minEndDate = new Date(this.startDate.getTime())
      this.minEndDate.setDate(this.minEndDate.getDate() + 1)
      this.endDate = null

      if (this.startDate != null) {
        this.filterStart = '&from=' + this.dateToMyISO(this.startDate)
      } else {
        this.filterStart = ''
      }
      this.filter = this.filterStart + this.filterEnd
      this.$emit('update-dateFilter', this.filter)
    },
    endDate: function () {
      if (this.endDate != null) {
        this.filterEnd = '&to=' + this.dateToMyISO(this.endDate)
      } else {
        this.filterEnd = ''
      }
      this.filter = this.filterStart + this.filterEnd
      this.$emit('update-dateFilter', this.filter)
    }
  },
  async mounted() {
    this.currentDate = new Date()
    this.currentDate.setDate(this.currentDate.getDate() - 1)

    this.startDate = new Date()
    this.filter = this.filterStart + this.filterEnd
  },
  methods: {
    dateToString(date) {
      // date to "DD-MM-YYYY"
      if (date == undefined) {
        return 'not selected'
      }
      this.offset = date.getTimezoneOffset()
      date = new Date(date.getTime() - this.offset * 60 * 1000)
      date = date.toISOString().split('T')[0]
      date = date.split('-').reverse().join('-')
      return date
    },
    dateToMyISO(date) {
      // date to "YYYY-MM-DDTHH:mm:ssZ"
      date = date.toISOString().replace(/\.\d+Z$/, 'Z')
      return date
    }
  }
}
</script>

<style scoped></style>
