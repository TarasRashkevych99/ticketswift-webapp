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
              <v-date-picker v-model="startDate" :min="minStartDate"></v-date-picker>
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

    {{ startFilterDate }}
  </v-container>
</template>

<script>
export default {
  name: 'DateFilter',
  emits: ['update-dateFilter'],
  data: () => ({
    startDate: null,
    minStartDate: null,
    endDate: null,
    minEndDate: null,
    offset: null,
    filter: '',
    filterStart: '',
    filterEnd: ''
  }),
  computed: {},
  watch: {
    startDate: function () {
      console.log('WATCHER StartDate: ' + this.dateToMyISO(this.startDate))
      console.log('WATCHER StartDate: ' + this.startDate)

      this.minEndDate = new Date(this.startDate.getTime())
      this.minEndDate.setDate(this.minEndDate.getDate() + 1)
      this.endDate = null

      if (this.startDate != null) {
        this.filterStart =
          '&from=' +
          this.dateToMyISO(new Date(this.startDate).setDate(this.startDate.getDate() + 1))
      } else {
        this.filterStart = ''
      }
      this.filter = this.filterStart + this.filterEnd
      this.$emit('update-dateFilter', this.filter)
    },
    endDate: function () {
      if (this.endDate != null) {
        this.filterEnd =
          '&to=' + this.dateToMyISO(new Date(this.endDate).setDate(this.endDate.getDate() + 1))
      } else {
        this.filterEnd = ''
      }
      this.filter = this.filterStart + this.filterEnd
      this.$emit('update-dateFilter', this.filter)
    }
  },
  async mounted() {
    this.minStartDate = new Date()
    this.minStartDate.setDate(this.minStartDate.getDate() - 1) // Oggi
    console.log('MinStart: ' + this.dateToMyISO(this.minStartDate))
    console.log('MinStart: ' + this.minStartDate)

    this.startDate = new Date()
    console.log('StartDate: ' + this.dateToMyISO(this.startDate))
    console.log('StartDate: ' + this.startDate)

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
      date = new Date(date)
      date = date.toISOString().replace(/\.\d+Z$/, 'Z')
      return date
    }
  }
}
</script>

<style scoped></style>
