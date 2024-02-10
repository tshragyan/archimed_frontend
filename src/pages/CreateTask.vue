<template>
  <div>
    <input type="text" v-model="task.name" placeholder="Name">
    <input type="text" v-model="task.email" placeholder="Email">
    <input type="text" v-model="task.text" placeholder="Text">
    <button @click="createTask">Create</button>
    <div v-if="message">{{message}}</div>
    <div v-if="validation">{{validation}}</div>
  </div>
</template>

<script>
export default {
  name: 'CreateTask',
  data () {
    return {
      task: {
        name: '',
        email: '',
        text:''
      },
      validation: ''
    }
  },
  computed: {
    message() {
      return this.$store.getters.getMessage
    }
  },
  methods: {
    createTask() {
      this.validation = ''

      if (!this.task.name || this.task.name.length > 255) {
        this.validation = 'Invalid Name'
        return true
      }

      if (!this.task.email || this.task.email.length > 255) {
        this.validation = 'Invalid Email'
        return true
      }

      if (!this.task.text || this.task.text.length > 255) {
        this.validation = 'Invalid Text'
        return true
      }

      this.$store.dispatch('createTask', this.task)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>