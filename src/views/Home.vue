<template>
    <div id="home">
        <swiper>
            <swiper-item v-for="item in banners">
                <a :href="item.link">
                    <img :src="item.img" alt="">
                </a>
            </swiper-item>
        </swiper>

        <!-- <button @click="btnClickHandler">去记账</button> -->
        <div id="month">
            <div class="large text">本月</div>
            <div class="text">预算结余</div>
            <div class="large money">20.00</div>

            <span class="text">收入 </span>
            <span class="money">22000.00</span>
            <span class="text"> | 支出 </span><span class="money">980.00</span>

        </div>

        <div class="record" v-for="(bill, bidx) in bills">
            <div class="date">
                <!-- <span class="bigger">{{dp.getDate(bill.date)}}日 </span> -->
                <!-- <span class="grey">{{dp.getMonth(bill.date)}}.{{dp.getYear(bill.date)}} {{dp.getDay(bill.date)}}</span> -->
                <span class="bigger">{{new Date(bill.date).getDate()}}日 </span>
                <span class="grey">{{new Date(bill.date).getMonth() +1}}.{{new Date(bill.date).getFullYear()}}
                    周{{day(bill.date)}}</span>
            </div>
            <van-swipe-cell ref="swipecell" v-for="(item, iidx) in bill.lists">
                <div class="item" @click="billClickHander(item)">
                    <div class="item-icon">
                        <img src="~assets/img/edit.svg" alt="">
                    </div>
                    <div class="item-note">
                        <div class="bigger">{{item.category.split(" ")[2]}}</div>
                        <div class="grey">{{item.note}}</div>
                        <div class="grey">
                            {{item.time.split(" ")[1].split(":")[0]}}:{{item.time.split(" ")[1].split(":")[1]}}
                            {{item.account.split(" ")[2]}}</div>
                    </div>
                    <div class="item-num">
                        <span :class="{'inColor':item.isOut==='false'}">{{parseFloat(item.num).toFixed(2)}}</span>
                    </div>
                </div>
                <template #right>
                    <button class="delbtn" @click="delClickHandler(item)">删 除</button>
                </template>
            </van-swipe-cell>
        </div>

        <tab-bar></tab-bar>
        <div id="tobill" @click.prevent="btnClickHandler">记一笔</div>

        <!-- 消息的展示 -->
        <div v-if="this.$store.state.msg" class="alert">
            <span>{{this.$store.state.msg}}</span>
        </div>
    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    import BillBarItem from "components/content/bill/BillNumber.vue"
    import { Swiper, SwiperItem } from "components/common/swiper/index.js"
    import { SwipeCell, Dialog } from "vant"
    import { baseRequest, getBillsRequest } from "../network/request.js"

    export default {
        data() {
            return {
                // dp: dateProcess,
                banners: [
                    {
                        link: "https://pic.rmb.bdstatic.com/95d2e950343cd9054deb0cd3662bd9fd.jpeg",
                        img: "https://pic.rmb.bdstatic.com/95d2e950343cd9054deb0cd3662bd9fd.jpeg"
                    },
                    {
                        link: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.fanyitie.com%2Fwp-content%2Fuploads%2F2018%2F05%2F23%2F17%2F20%2Fae4akmrma3t.jpg&refer=http%3A%2F%2Fwww.fanyitie.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630244506&t=06e7f462e1e823532488468ed0deb090",
                        img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.fanyitie.com%2Fwp-content%2Fuploads%2F2018%2F05%2F23%2F17%2F20%2Fae4akmrma3t.jpg&refer=http%3A%2F%2Fwww.fanyitie.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630244506&t=06e7f462e1e823532488468ed0deb090"
                    },
                    {
                        link: "https://img2.baidu.com/it/u=2450890606,3980909177&fm=26&fmt=auto&gp=0.jpg",
                        img: "https://img2.baidu.com/it/u=2450890606,3980909177&fm=26&fmt=auto&gp=0.jpg"
                    },
                    {
                        link: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fenc.gaosouyi.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20150130%2F1422603989279511.jpg&refer=http%3A%2F%2Fenc.gaosouyi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630244705&t=3fbdcba1174ffbf9d7df5ba4f0e542f2",
                        img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fenc.gaosouyi.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20150130%2F1422603989279511.jpg&refer=http%3A%2F%2Fenc.gaosouyi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630244705&t=3fbdcba1174ffbf9d7df5ba4f0e542f2"
                    }
                ],
                bills: ""
            }
        },

        computed: {
            day() {
                return (date) => {
                    switch (new Date(date).getDay()) {
                        case 0:
                            return "日"
                        case 1:
                            return "一";
                        case 2:
                            return "二";
                        case 3:
                            return "三";
                        case 4:
                            return "四";
                        case 5:
                            return "五";
                        case 6:
                            return "六";
                    }
                }
            }
        },
        components: {
            TabBar,
            Swiper,
            SwiperItem,
            BillBarItem,
            [SwipeCell.name]: SwipeCell,
            [Dialog.name]: Dialog,
        },
        inject: ['reload'],
        created() {
            // 获得首页数据
            getBillsRequest({
                url: "/getBills",
                params: {
                    userid: "1"
                }
            }).then(res => {
                this.bills = res;
                console.log("home:", this.bills)
            })
        },



        methods: {

            // "去记账"按钮
            btnClickHandler() {
                this.$router.push("/billing")
            },

            // 关闭滑动前：记录点击位置，若是点击了删除，则弹出弹窗。
            // position 为关闭时点击的位置
            // instance 为对应的 SwipeCell 实例
            delClickHandler(item) {
                this.$dialog.confirm({
                    message: '确定删除该笔账单吗？',
                }).then((confirm) => {          // 点击确认
                    // 1.删除本地的数据
                    // this.bills[bidx].lists.splice(iidx, 1);
                    // if (this.bills[bidx].lists.length == 0) {
                    //     this.bills.splice(bidx, 1)
                    // }
                    // 删除数据库中的数据, 并重新刷新页面
                    baseRequest({
                        url: "/delBill",
                        params: {
                            "_id": item._id,
                        }
                    }).then(res => {
                        this.$store.dispatch("setMsg", { msg: "删除成功！" })
                        this.reload();
                    })
                }).catch((cancel) => {         // 点击取消
                    console.log(cancel)
                });
            },

            billClickHander(item) {
                // console.log("item:", item)
                // let year = this.getYear(item.time);
                // let month = parseInt(this.getMonth(item.time));
                // let dt = this.getDate(item.time);
                // let hour = this.getHour(item.time);
                // let minute = this.getMinute(item.time)
                // let rawdata = { ...item };
                // rawdata.time = new Date(year, month - 1, dt, hour, minute)
                // console.log("home:", rawdata)
                console.log("home向editing传递", item)
                this.$router.push({ path: "/editing", query: item })
            }
        }
    }

</script>

<style>
    #home {
        background-color: #f6f6f6;
        box-sizing: border-box;
    }

    #month {
        position: absolute;
        left: 0;
        top: 0;
        height: 150px;
        background-color: transparent;
        padding-top: 10px;
        padding-left: 10px;
    }


    #month .text {
        font-size: 14px;
        color: #ddd;
    }

    #month .money {
        font-size: 14px;
        color: #fff;
    }

    #month .large {
        margin-top: 3px;
        font-size: 26px;
        margin-bottom: 10px;
    }

    #tobill {
        position: fixed;
        bottom: 60px;
        left: 50%;
        margin-left: -50px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 14px;
        background-color: #DAA520;
        text-align: center;
        color: #fff;
    }

    .record {
        background-color: #fff;
        margin-top: 5px;
    }

    .date {
        padding: 10px;
    }

    .item {
        display: flex;
        align-items: center;
        justify-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f6f6f6;
    }

    .item .item-icon {
        flex: 1;
        text-align: center;
    }

    .item .item-note {
        flex: 5;
    }

    .item .item-num {
        flex: 2;
        color: #04BE02;
        margin-right: 10px;
    }

    .item .item-num span {
        float: right;
    }

    .item .item-icon img {
        width: 22px;
    }

    .bigger {
        font-size: 16px;
        font-weight: 700;
    }

    .grey {
        font-size: 12px;
        color: #aaaaaa;
    }

    .item-note .bigger {
        padding: 2px;
    }

    .item-note .grey {
        padding: 3px;
    }

    .delbtn {
        height: 100%;
        width: 100%;
        border: 0;
        background-color: #ff3300;
        /* border-radius: 8px; */
        color: #eee;
        font-size: 14px;
        padding: 0 10px;
    }

    .inColor {
        color: red
    }

    .alert {
        position: fixed;
        bottom: 50%;
        width: 100%;
        text-align: center;
    }

    .alert span {
        padding: 5px;
        background-color: #222;
        color: #fff;
    }
</style>