<template>
  <div class="form-container">
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field v-model="password" label="Password"></v-text-field>
        <v-btn type="submit" block class="mt-2" @click="login()">Login</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    email: null,
    password: null
  }),
  computed: {},
  mounted() {},
  methods: {
    login() {
      return this.apiService.authenticationApi
        .login(this.email, this.password)
        .then((res) => {
          console.log(res)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* vh stands for viewport height */
}
</style>
