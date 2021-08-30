<template>
    <div id="profile">
        <div class="user">
            <div class="user-img">
                <img src="~assets/img/user.svg" alt="">
            </div>
            <div class="user-name">
                <div>良良</div>
                <div class="user-phone">188****3028</div>
            </div>
        </div>

        <div class="bar">
            <van-cell title="预算编辑" @click="show = true" :value="budgetShow" is-link class="bar-item">
                <template slot="icon">
                    <img src="~assets/img/budget.svg" alt="" class="image">
                </template>
            </van-cell>
            <van-cell title="图表分析" is-link class="bar-item" url="/charts">
                <template slot="icon">
                    <img src="~assets/img/charts-active.svg" alt="" class="image">
                </template>
            </van-cell>

            <van-popup v-model="show" class="popup">
                <div class="popup-title">{{new Date().getMonth()+1}}月预算</div>
                <bill-number :amount="budget" @valueSend="valueSendHandler"></bill-number>
            </van-popup>
        </div>
        <tab-bar></tab-bar>
    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    import BillNumber from "components/content/bill/BillNumber.vue"
    import { Cell, Popup } from "vant"
    import { baseRequest } from "../network/request.js"
    // import { Cell, Icon, Popup, Field, NumberKeyboard } from "vant"

    export default {
        data() {
            return {
                show: false,
                budget: "",
            }
        },
        computed: {
            budgetShow() {
                return this.budget == "" ? "" : parseFloat(this.budget).toFixed(2);
            }
        },
        created() {
            this.budget = this.$store.state.budget;
        },
        components: {
            TabBar,
            BillNumber,
            [Popup.name]: Popup,
            [Cell.name]: Cell,
        },
        methods: {
            valueSendHandler(data) {
                this.show = false;
                data = data == "" ? "0" : data;
                // 先存数据库
                baseRequest({
                    url: "/updateBudget",
                    params: {
                        userid: "1",
                        budget: data,
                    }
                }).then(res => {
                    // 数据库操作成功后
                    // 1.再改自身
                    this.budget = data;
                    // 2.再将预算状态传递到Vuex中
                    this.$store.state.budget = data;
                }).catch(err => {
                    console.log("修改失败")
                }).finally(() => {
                    setTimeout(() => {
                        this.bus.$emit("Loading", false);
                    }, 500);
                })
            }
        }
    }
</script>

<style>
    #profile {
        background-color: #f6f6f6;
    }

    .user {
        height: 100px;
        display: flex;
        align-items: center;
        /* border-bottom: 1px solid red; */
        margin-bottom: 10px;
        background-color: #DAA520;
    }

    .user .user-img {
        width: 50px;
        padding-left: 20px;
    }

    .user .user-name {
        padding-left: 20px;
        font-size: 22px;
    }

    .user .user-name .user-phone {
        font-size: 14px;
        color: #666;
        margin-top: 5px;
    }

    .user .user-img img {
        height: 50px;
    }

    .bar-item {
        margin-top: 5px;
    }


    .image {
        width: 20px;
        margin-right: 16px;
    }

    .popup {
        width: 75%;
        height: 75%;
        text-align: center;
        line-height: 30px;
        border-radius: 10px;
    }

    .popup .popup-title {
        padding-top: 20px;
        font-size: 18px;
    }

    /* .inputBudget {
        border: 0px;
        border-bottom: 1px solid #666;
    } */
</style>