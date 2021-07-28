<template>
    <div class="bill">
        <nav-bar fromPath="/home">
            <img slot="left" src="~assets/img/return.svg">
            <span slot="center">记一笔</span>
            <div slot="right">
                <img slot="right" src="~assets/img/submit.svg">
            </div>
        </nav-bar>
        <!-- <span @click='billoutHandle'>支出</span>
        <span @click='billoutHandle1'>收入</span> -->
        <router-link to="/bill/billout">支出</router-link>
        <router-link to="/bill/billin">收入</router-link>
        <router-view />
        <!-- <bill-bar></bill-bar> -->
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
        // methods: {
        //     billoutHandle() {
        //         console.log('2')
        //         this.$router.push({ path: '/bill/billin' })
        //     },
        //     billoutHandle1() {
        //         console.log('1')
        //         this.$router.push({ path: '/bill/billout' })
        //     }
        // }
    }
</script>