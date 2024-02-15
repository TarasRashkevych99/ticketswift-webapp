<template>
  <div class="form-container">
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        ></v-text-field>
        <v-alert v-if="errorMessage" closable type="error" @click:close="clear()">
          {{ errorMessage }}
        </v-alert>
        <v-btn type="submit" block class="mt-2" color="primary" @click="login()">Login</v-btn>
        <v-btn type="submit" block class="mt-2" @click="goToSignupPage()">Signup</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    email: null,
    password: null,
    errorMessage: null,
    visible: false
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
          this.errorMessage = 'Invalid email or password'
          console.log(err.response.data)
        })
    },
    goToSignupPage() {
      this.$router.push('/signup')
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
