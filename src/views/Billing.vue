<template>
    <div class="bill">

        <!-- 记账页返回，确定按钮 -->
        <div class="nav-bar">
            <div class="left" @click="leftClickHandler">
                <img src="~assets/img/return.svg">
            </div>
            <div class="center">
                <span>记一笔</span>
            </div>
            <div class="right" @click="rightClickHandler">
                <img src="~assets/img/submit.svg">
            </div>
        </div>

        <!-- 记账页 进出帐导航 -->
        <div class="outIn">
            <div class="out" @click="billoutClickHandle" :class="{'active': outActive}">支出</div>
            <div class="in" @click="billInClickHandle" :class="{'active': inActive}">收入</div>
        </div>
        <bill-bar v-if="outActive"></bill-bar>
        <bill-bar v-else color="red"></bill-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/nav/NavBar.vue"
    import BillBar from "components/content/bill/BillBar.vue"
    export default {
        data() {
            return {
                // 是否是支出页面
                isOut: true,
            }
        },

        name: "billing",
        components: {
            NavBar,
            BillBar
        },
        computed: {
            outActive() {
                return this.isOut;
            },
            inActive() {
                return !this.isOut;
            },
        },
        methods: {
            billoutClickHandle() {
                this.isOut = true;
            },
            billInClickHandle() {
                this.isOut = false;
            },
            leftClickHandler() {
                this.$router.push("/home");
            },
            rightClickHandler() {
                console.log("保存成功")
                this.$router.push("/home");
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
        justify-content: space-between;
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

    .outIn {
        display: flex;
        justify-content: space-around;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        box-shadow: 0 1px 0px 1px rgba(0, 0, 0, .08);
        background-color: #f6f6f6;
        /* padding-bottom: 5px; */
        margin-bottom: 10px;
    }

    .outIn .in,
    .outIn .out {
        width: 100%;
        text-align: center;
    }

    .active {
        color: #DAA520;
        background-color: #fff;
    }

    .inColor {
        color: red
    }
</style>