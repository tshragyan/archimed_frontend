<template>
  <div>
    <input type="text" v-model="credentials.login" placeholder="Login">
    <input type="password" v-model="credentials.password" placeholder="Password">
    <button @click="loginUser">Login</button>
    <div v-if="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      credentials: {
        login: '',
        password: '',
      },
      message: '',
    }
  },
  computed : {
    token() {
      return this.$store.getters.getToken
    }
  },
  methods : {
    async loginUser() {
      this.message = ''

      if (!this.credentials.login) {
        this.message = 'Invalid Login'
        return;
      }

      if (!this.credentials.password) {
        this.message = 'Invalid Password'
        return;
      }

      const data = await this.$store.dispatch('loginUser', this.credentials)
      if (data) {
        this.$router.push({name: 'main'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>