<template>
  <div class="form-container">
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field v-model="password" label="Password"></v-text-field>
        <v-alert v-if="errorMessage" closable type="error" @click:close="clear()">
          <span v-html="errorMessage"></span>
        </v-alert>
        <v-btn type="submit" block class="mt-2" color="primary" @click="signup()">Signup</v-btn>
        <v-btn type="submit" block class="mt-2" @click="goToLoginPage()">Login</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data: () => ({
    email: null,
    password: null,
    errorMessage: null
  }),
  computed: {},
  mounted() {},
  methods: {
    signup() {
      return this.apiService.authenticationApi
        .signup(this.email, this.password)
        .then((res) => {
          console.log(res)
          this.$router.push('/')
        })
        .catch((err) => {
          this.errorMessage = 'Email already exists.<br/>Please login.'
          console.log(err.response.data)
        })
    },
    goToLoginPage() {
      this.$router.push('/login')
    },
    clear() {
      console.log('clear')
      this.errorMessage = null
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
