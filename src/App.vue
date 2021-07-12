<template>
  <div id="app">
    <tab-bar></tab-bar>
    <router-view />
  </div>
</template>

<script>
  import TabBar from "components/tab/TabBar.vue"
  export default {
    components: {
      TabBar
    }
  }
</script>

<style>
  @import "assets/css/normalize.css"
</style>