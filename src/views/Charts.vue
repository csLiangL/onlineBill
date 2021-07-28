<template>
    <div>
        <h1>Charts页面</h1>
        <router-link to="/charts/line">line</router-link>
        <router-link to="/charts/pie">pie</router-link>
        <router-view />
        <tab-bar></tab-bar>
    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    export default {
        components: {
            TabBar
        }
    }
</script>