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

        <bill-bar :isOut="rawdata.isOut=='true'" :trys="trys" @getData="getDataHandler" :billData="rawdata">
        </bill-bar>
    </div>
</template>

<script>
    import BillBar from "components/content/bill/BillBar.vue"
    import { dateProcess } from "../commonFun.js"

    export default {
        data() {
            return {
                rawdata: "",
                trys: 0
            }
        },

        created() {
            this.rawdata = { ...this.$route.query };
            console.log("editing中接收到:",this.rawdata)
            // this.rawdata.time = dateProcess.toDate(this.rawdata.time)
            this.rawdata.time = new Date(this.rawdata.time)
            // console.log("editing中:", this.rawdata)

        },

        computed: {

            editText() {
                return this.rawdata.isOut == "true" ? "编辑支出" : "编辑收入";
            }
        },

        name: "editing",
        components: {
            BillBar
        },
        methods: {

            leftClickHandler() {
                this.$router.push("/home")
            },
            rightClickHandler() {
                this.trys++;
            },
            getDataHandler(data) {
                baseRequest({
                    url: "/editBill",
                    params: { ...data, "userid": "1" }
                }).then(res => {
                    this.$store.dispatch("setMsg", { msg: "保存成功！" })
                    this.$router.push("/home")
                }).catch((err) => {
                    console.log(err)
                    this.$store.dispatch("setMsg", { msg: "保存失败！请重新提交" })
                })
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