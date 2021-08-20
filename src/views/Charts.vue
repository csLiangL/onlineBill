<template>
    <div id="charts">
        <div class="month-year">
            <div class="month" @click="monthClickHandle" :class="{'charts-active': isMonth}">月报</div>
            <div class="year" @click="yearClickHandle" :class="{'charts-active': !isMonth}">年报</div>
        </div>

        <div class="option">
            <div class="option-time">2021年8月</div>
            <div class="option-out">支出</div>
            <div class="option-in">收入</div>
        </div>

        <div class="title">
            本月支出
        </div>


        <tab-bar></tab-bar>
    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    export default {
        components: {
            TabBar
        },
        data() {
            return {
                isMonth: true,
                isOut: true,
            }
        },
        methods: {
            monthClickHandle() {
                this.isMonth = true;
            },
            yearClickHandle() {
                this.isMonth = false;
            }
        }
    }
</script>

<style>
    #charts {
        background-color: #f6f6f6;
    }

    .month-year {
        display: flex;
        justify-content: space-around;
        height: 44px;
        line-height: 44px;
        margin-top: 20px;
        background-color: #fff;
    }

    .month,
    .year {
        font-size: 18px;
        flex: 1;
        text-align: center;
    }

    .charts-active {
        font-weight: 700;
        border-bottom: 1px solid blue;
    }

    .option {
        display: flex;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #fff;
    }

    .option .option-time {
        flex: 3;
        padding-left: -20px;
    }

    .option .option-out,
    .option .option-in {
        flex: 1;
    }

    .title {
        width: 90%;
        height: 200px;
        background-color: #fff;
        margin: 10px auto 0;
    }
</style>