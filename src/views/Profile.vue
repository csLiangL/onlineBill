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
                <template #icon>
                    <img src="~assets/img/budget.svg" alt="" class="image">
                </template>
            </van-cell>
            <van-cell title="图表分析" is-link class="bar-item" url="/charts">
                <template #icon>
                    <img src="~assets/img/charts-active.svg" alt="" class="image">
                </template>
            </van-cell>

            <van-popup v-model="show" class="popup">
                <div class="popup-title">{{new Date().getMonth()+1}}月预算</div>
                <bill-number :amount="budget" @valueSend="valueSendHandler"></bill-number>
            </van-popup>
        </div>
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
            // 在App.vue中从数据库取得预算，然后存入vuex中。
            // 上面这个过程需要时间，因此等待0.2s后，再从vuex中取数据，作为初始化的数据。
            setTimeout(() => {
                this.budget = this.$store.state.budget;
            }, 200);
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
                })
            }
        }
    }
</script>

<style scoped>
    #profile {
        background-color: #f6f6f6;
    }

    .user {
        height: 100px;
        display: flex;
        align-items: center;
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
        height: 20px;
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
</style>