<template>
    <div class="bill">
        <nav-bar fromPath="/home">
            <img slot="left" src="~assets/img/return.svg">
            <span slot="center">记一笔</span>
            <img slot="right" src="~assets/img/submit.svg">
        </nav-bar>
        <bill-bar></bill-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/nav/NavBar.vue"
    import BillBar from "components/content/bill/BillBar.vue"
    export default {
        name: "bill",
        components: {
            NavBar,
            BillBar
        },
    }
</script>