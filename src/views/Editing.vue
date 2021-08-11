<template>
    <div class="bill">

        <!-- 记账页返回，确定按钮 -->
        <div class="nav-bar">
            <div class="left" @click="leftClickHandler">
                <img src="~assets/img/return.svg">
            </div>
            <div class="center">{{editText}}</div>
            <div class="right" @click="rightClickHandler">
                <img src="~assets/img/submit.svg">
            </div>
        </div>

        <bill-bar v-if="data.isOut"></bill-bar>
        <bill-bar v-else color="red"></bill-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/nav/NavBar.vue"
    import BillBar from "components/content/bill/BillBar.vue"
    export default {
        data() {
            return {
                data: {}
            }
        },

        mounted() {
            this.data = this.$store.state.currEdit;
            console.log("editing中的data", this.data)
        },

        computed: {

            editText() {
                return this.data.isOut ? "编辑支出" : "编辑收入";
            }
        },

        name: "billing",
        components: {
            NavBar,
            BillBar
        },
        methods: {

            leftClickHandler() {
                this.$router.push("/home")
            },
            rightClickHandler() {
                console.log("保存成功")
                this.$router.push("/home")
            }
        }
    }
</script>

<style>
    /* 上部导航高度：50px */
    .nav-bar {
        display: flex;
        height: 50px;
        line-height: 50px;
        text-align: center;
        /* justify-content: space-between; */
        background-color: #f6f6f6;
        /* box-shadow: 0 2px 2px rgba(0, 0, 0, .1) */
    }


    .nav-bar .left,
    .nav-bar .right {
        flex: 1
    }

    .nav-bar .left:active img {
        content: url("~assets/img/return-active.svg");
    }

    .nav-bar div img {
        height: 22px;
        vertical-align: middle;
    }


    .nav-bar .center {
        flex: 5;
        /* background-color: red; */
    }



    .inColor {
        color: red
    }
</style>