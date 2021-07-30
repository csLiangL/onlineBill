<template>
    <div class="bill">
        <nav-bar fromPath="/home">
            <img slot="left" src="~assets/img/return.svg">
            <span slot="center">记一笔</span>
            <div slot="right">
                <img slot="right" src="~assets/img/submit.svg">
            </div>
        </nav-bar>
        <div class="outIn">
            <span class="out" @click="billoutClickHandle" :class="{'active': outActive}">支出</span>
            <span class="in" @click="billInClickHandle" :class="{'active': inActive}">收入</span>
        </div>
        <router-view />
    </div>
</template>

<script>
    import NavBar from "components/common/nav/NavBar.vue"
    import BillBar from "components/content/bill/BillBar.vue"
    export default {
        data() {
            return {
                path: "/bill/billout"
            }
        },

        name: "bill",
        components: {
            NavBar,
            BillBar
        },
        computed: {
            outActive() {
                return this.path == "/bill/billout";
            },
            inActive() {
                return this.path == "/bill/billin";
            }
        },
        methods: {
            billoutClickHandle() {
                this.$router.push({ path: '/bill/billout' });
                this.path = "/bill/billout";
            },
            billInClickHandle() {
                this.$router.push({ path: '/bill/billin' })
                this.path = "/bill/billin";

            }
        }
    }
</script>

<style>
    .outIn {
        display: flex;
        justify-content: space-around;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        box-shadow: 0 1px 0px 1px rgba(0, 0, 0, .08);
        background-color: #f6f6f6;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }

    .outIn .in,
    .outIn .out {
        padding-left: 50px;
        padding-right: 50px;
    }

    .active {
        color: #DAA520;
    }
</style>