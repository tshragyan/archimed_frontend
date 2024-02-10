<template>
  <div>
    <input type="text" v-model="task.text">
    <input type="checkbox" v-model="task.status">
    <button @click="save">Save</button>
    <div v-if="message">{{message}}</div>
    <div v-if="messageServer">{{messageServer}}</div>
  </div>
</template>

<script>
export default {
  name : 'UpdateTask',
  data() {
    return {
      message: ''
    }
  },
  computed: {
    task() {
      return this.$store.getters.findTask(this.$route.params.id) || {}
    },
    messageServer() {
      return this.$store.getters.getMessage
    }
  },
  methods: {
    save() {
      if (!this.task.text) {
        this.message = 'invalid text'
        return;
      }

      this.$store.dispatch('updateTask', {id: this.$route.params.id, text: this.task.text, status: this.task.status})
    }
  },
  beforeCreate() {
    const token = this.$store.getters.getToken
    if (!token) {
      this.$router.push({name : 'login'})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>