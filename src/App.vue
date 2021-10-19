<template>
  <div id="app">

    <!-- 记账页面不要保留缓存，因为记账不需要保留记录，需要的是实时更新日期。 -->
    <!-- 被激活的路由将显示在这里, exclude中的组件名保持和.vue文件中的一致，而不是和路由一致。 -->
    <!-- <keep-alive exclude=> -->

    <!-- tab-bar放在App内，意味着只要匹配到router中的路由，就会tab-bar就会显示。 -->
    <tab-bar v-if="$route.path!=='/billing' && $route.path!=='/editing'"></tab-bar>
    <router-view v-if="isRouterAlive" />
    <loading></loading>
    <!-- </keep-alive> -->
  </div>
</template>

<script>

  import { baseRequest } from "./network/request.js"
  import Loading from "components/common/loading/Loading.vue"
  import TabBar from "components/common/tab/TabBar.vue"

  export default {
    components: {
      TabBar,
      Loading,
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },

    // provide() {
    //   return {
    //     reload: this.reload
    //   }
    // },

    created() {
      // 获得预算数据
      baseRequest({
        url: "/getBudget",
        params: {
          userid: "1"
        }
      }).then(res => {
        // let budget = res.data.budget ? res.data.budget : 1000;
        let budget = res.data.budget;
        this.$store.commit("setBudget", { "budget": budget });
      })
    },

    methods: {
      reload() {
        this.isRouterAlive = false;
        // 将回调延迟到下次DOM更新以后, 回调的 this 自动绑定到调用它的实例上。
        this.$nextTick(() => {
          this.isRouterAlive = true;
        })
      }
    }
  }
</script>

<style>
  @import "assets/css/normalize.css"
</style>