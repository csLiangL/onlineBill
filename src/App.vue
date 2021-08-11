<template>
  <div id="app">

    <!-- 记账页面不要保留缓存，因为记账不需要保留记录，需要的是实时更新日期。 -->
    <!-- 被激活的路由将显示在这里, exclude中的组件名保持和.vue文件中的一致，而不是和路由一致。 -->
    <!-- <keep-alive exclude=> -->
    <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>

</script>

<style>
  @import "assets/css/normalize.css"
</style>