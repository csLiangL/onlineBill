<template>
    <div id="home" v-cloak>
        <swiper>
            <swiper-item v-for="item in banners">
                <a :href="item.link">
                    <img :src="item.img" alt="">
                </a>
            </swiper-item>
        </swiper>

        <div id="month">
            <div>
                <span class="large">{{new Date().getMonth()+1}}</span>
                <span class="grey"> 月 · 预算结余</span>
            </div>
            <div class="largest money">{{rest}}</div>
            <span class="grey">收入 </span>
            <span class="money">{{inCount}}</span>
            <span class="grey"> | 支出 </span><span class="money">{{outCount}}</span>
        </div>

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="records">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset="-100">
                    <div class="record" v-for="(bill, bidx) in billsIters">
                        <div class="date">
                            <span class="bigger">{{bill.date.split("/")[2]}}日 </span>
                            <span class="grey">{{bill.date.split("/")[1]}}.{{bill.date.split("/")[0]}}
                                周{{day(bill.date)}}</span>
                        </div>
                        <van-swipe-cell ref="swipecell" v-for="(item, iidx) in bill.lists" right-width="60">
                            <div class="item" @click="billClickHander(item, bidx, iidx)"
                                :class="{'item-active': currX==bidx && currY==iidx}">
                                <div class="item-icon">
                                    <img src="~assets/img/edit.svg" alt="">
                                </div>
                                <div class="item-note">
                                    <div class="bigger">{{item.category.split(" ")[2]}}</div>
                                    <div class="grey">{{item.note}}</div>
                                    <div class="grey">
                                        {{item.time.split(" ")[1].split(":")[0]}}:{{item.time.split("
                                        ")[1].split(":")[1]}}
                                        {{item.account.split(" ")[2]}}</div>
                                </div>
                                <div class="item-num">
                                    <span
                                        :class="{'inColor':item.isOut==='false'}">{{parseFloat(item.num).toFixed(2)}}</span>
                                </div>
                            </div>
                            <template #right>
                                <button class="delbtn" @click="delClickHandler(item)">删 除</button>
                            </template>
                        </van-swipe-cell>
                    </div>
                </van-list>
            </div>
        </van-pull-refresh>

        <!-- <tab-bar></tab-bar> -->
        <div class="tobill" @click.prevent="btnClickHandler" :class="{'bill-active': billClicked}">记一笔</div>

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
    import { SwipeCell, Dialog, List, PullRefresh } from "vant"
    import { baseRequest } from "../network/request.js"

    export default {

        components: {
            TabBar,
            Swiper,
            SwiperItem,
            BillBarItem,
            [SwipeCell.name]: SwipeCell,
            [Dialog.name]: Dialog,
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
        },

        data() {
            return {
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
                bills: [],      // 服务器请求的账单数据
                outCount: parseFloat(0).toFixed(2),
                inCount: parseFloat(0).toFixed(2),

                // 记录当前点击的是哪笔账单
                currX: -1,
                currY: -1,
                billClicked: false,
                currPage: 0,

                // 上拉加载
                loading: false,
                finished: false,

                // 下拉刷新
                isLoading: false,
            }
        },

        computed: {
            // 对bills按日期分类，便于在template中迭代。
            billsIters() {
                let dateBills = new Map();
                this.bills.forEach(obj => {
                    let date = obj.time.split(" ")[0];
                    if (dateBills.has(date)) {
                        dateBills.get(date).push(obj);
                    } else {
                        dateBills.set(date, [obj]);
                    }
                })

                let res = [];
                for (let date of dateBills.keys()) {
                    res.push({ "date": date, "lists": dateBills.get(date) });
                }
                console.log(res);
                return res;
            },

            // 预算结余
            rest() {
                let res = (parseFloat(this.$store.state.budget) - this.outCount).toFixed(2);
                this.$store.commit("setRest", { "rest": res });
                return res;
            },

            // 计算周一、周二...
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

        // inject: ['reload'],

        created() {
            this.getOutIn();
            // 滚动条<100自动触发onLoad, 去服务端获取数据。
        },

        methods: {

            // 获得账单数据
            getBills() {
                baseRequest({
                    url: "/getBills",
                    params: {
                        "userid": "1",
                        "page": this.currPage + 1,
                    }
                }).then(res => {
                    if (res.data.length == 0) {
                        this.finished = true;
                    } else {
                        this.bills.push(...res.data);
                        this.currPage++;
                    }
                    this.loading = false;           // 自动结束 上拉加载 的状态。
                })

            },

            // 获得本月收入支出数据
            getOutIn() {
                baseRequest({
                    url: "/getOutIn",
                    params: {
                        "isMonth": "true",
                        "userid": "1",
                        "time": new Date().getFullYear() + "/" + (new Date().getMonth() + 1)
                    }
                }).then(res => {
                    this.inCount = parseFloat(res.data.in.reduce((pre, curr) => {
                        pre += curr;
                        return pre;
                    }, 0)).toFixed(2);

                    this.outCount = parseFloat(res.data.out.reduce((pre, curr) => {
                        pre += curr;
                        return pre;
                    }, 0)).toFixed(2);
                })
            },

            // "去记账"按钮
            btnClickHandler() {
                this.billClicked = true;
                setTimeout(() => {
                    this.billClicked = false;
                    this.$router.push("/billing")
                }, 200);
            },

            // 关闭滑动前：记录点击位置，若是点击了删除，则弹出弹窗。
            // position 为关闭时点击的位置
            // instance 为对应的 SwipeCell 实例
            delClickHandler(item) {
                this.$dialog.confirm({
                    message: '确定删除该笔账单吗？',
                }).then((confirm) => {          // 点击确认
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

            // 点击账单进行编辑。
            billClickHander(item, bidx, iidx) {
                this.currX = bidx;
                this.currY = iidx;

                setTimeout(() => {
                    this.currX = -1;
                    this.currY = -1;
                    this.$router.push({ path: "/editing", query: item })
                }, 200);
            },

            // 上拉加载
            onLoad() {
                // 加载数据
                this.getBills();
            },

            // 下拉刷新
            onRefresh() {
                // this.reload();
                this.$parent.reload();
                this.isLoading = false;
            }
        }
    }

</script>

<style>
    #home {
        background-color: #f6f6f6;
        box-sizing: border-box;
    }

    [v-cloak] {
        display: none;
    }

    #month {
        position: absolute;
        left: 0;
        top: 0;
        height: 150px;
        background-color: transparent;
        margin-top: 30px;
        margin-left: 10px;
        color: #fff;
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

    #month .largest {
        font-size: 36px;
        margin-bottom: 10px;
    }

    .tobill {
        position: fixed;
        bottom: 60px;
        left: 50%;
        margin-left: -60px;
        width: 120px;
        height: 36px;
        line-height: 36px;
        border-radius: 18px;
        background-color: #DAA520;
        text-align: center;
        color: #fff;
    }

    .bill-active {
        background-color: #eed188;
    }

    .records {
        margin-bottom: 100px;
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
        padding: 8px 0;
        border-bottom: 1px solid #f6f6f6;
    }

    .item-active {
        background-color: #f6f6f6;
    }

    .item .item-icon {
        flex: 1;
        text-align: center;
    }

    .item .item-note {
        flex: 5;
        word-break: break-all;
    }

    .item .item-num {
        flex: 2;
        color: #04BE02;
    }

    .item .item-num span {
        float: right;
        margin-right: 10px;
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
        color: #aaa;
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
        padding: 0 14px;
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