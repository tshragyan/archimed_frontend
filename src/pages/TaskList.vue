<template>
  <div>
    <div v-if="!loading">
      <div v-if="tasks.length" >
        <table class="table">
          <tr>
            <td class="sorting" @click="() => sortData('name')"><b>Name</b></td>
            <td class="sorting" @click="() => sortData('email')"><b>Email</b></td>
            <td>Text</td>
            <td>Is Changed</td>
            <td class="sorting" @click="() => sortData('status')"><b>Status</b></td>
            <td v-if="token">Actions</td>
          </tr>
          <tr v-for="(task, index) in tasks" :key="index">
            <td>{{task.name}}</td>
            <td>{{task.email}}</td>
            <td>{{task.text}}</td>
            <td>{{task.is_changed ? 'true' : 'false'}}</td>
            <td>{{task.status == 1 ? 'Done' : 'Not Done'}}</td>
            <td v-if="token">
              <button @click="() => editTask(task.id)">Edit</button>
            </td>
          </tr>
        </table>
        <div>
          <button v-for="(item, index) in Array.from({length: totalPages})" :key="index" @click="() => changePage(index + 1)">
            {{index + 1}}
          </button>
        </div>
      </div>
    </div>
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  computed: {
    tasks() {
      return this.$store.getters.getTasks
    },
    page() {
      return this.$store.getters.getPage
    },
    totalPages() {
      return this.$store.getters.getTotalPages
    },
    loading() {
      return this.$store.getters.getLoading
    },
    sort() {
      return this.$store.getters.getSort
    },
    token() {
      return this.$store.getters.getToken
    },
  },
  methods: {
    editTask(id) {
      this.$router.push({name: 'update', params: {id}})
    },
    changePage(page) {
      this.$store.commit('setPage', page)
      this.$store.dispatch('fetchTasks')
    },
    sortData(column) {
      if (this.sort === column) {
        this.$store.commit('changeDirection')
      } else {
        this.$store.commit('setSort', column)
      }

      this.$store.dispatch('fetchTasks')
    }
  },
  async beforeMount() {
    await this.$store.dispatch("fetchTasks")
  }
}
</script>

<style scoped>
  .table td {
    border: 1px solid;
    border-collapse: collapse;
    padding: 5px;
  }
  .sorting {
    cursor: pointer
  }
</style>