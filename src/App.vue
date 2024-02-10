<template>
  <div>
    <p>
      <router-link to="/" class="link">List</router-link>
      <router-link to="/create" class="link">Create</router-link>
      <router-link to="/login" class="link">Login</router-link>
    </p>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
p {
  margin-bottom: 30px;
}
.link {
  display: inline-block;
  margin-left: 5px;
}
</style>
