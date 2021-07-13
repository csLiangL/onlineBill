<template>
    <div>
        <h1>Home页面</h1>
        <button @click="btnClickHandler">去记账</button>
        <tab-bar></tab-bar>
    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    export default {
        components: {
            TabBar
        },
        methods: {
            btnClickHandler() {
                this.$router.push("/bill")
            }
        }
    }

</script>