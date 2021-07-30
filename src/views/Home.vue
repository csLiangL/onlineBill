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

        <div id="tobill" @click="btnClickHandler">记一笔</div>


        <div class=" record">
            <div class="date">
                <span class="bigger">26日 </span>
                <span class="grey">7.2021 周一</span>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
        </div>
        <div class="record">
            <div class="date">
                <span class="bigger">26日 </span>
                <span class="grey">7.2021 周一</span>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
        </div>
        <div class="record">
            <div class="date">
                <span class="bigger">26日 </span>
                <span class="grey">7.2021 周一</span>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                </div>
                <div class="item-note">
                    <span class="bigger">吃饭</span>
                    <br>
                    <span class="grey">13:09 现金</span>
                </div>
                <div class="item-num">
                    <span>30.00</span>
                </div>
            </div>
        </div>
        <tab-bar></tab-bar>
    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
    import BillBarItem from "components/content/bill/BillNumber.vue"
    import { Swiper, SwiperItem } from "components/common/swiper/index.js"
    export default {
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
                // bills: [
                //     {
                //         time: 
                //     }
                // ]
            }
        },
        components: {
            TabBar,
            Swiper,
            SwiperItem,
            BillBarItem
        },
        methods: {
            // "去记账"按钮
            btnClickHandler() {
                this.$router.push("/bill")
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
        padding: 10px 0;
        border-bottom: 1px solid #f6f6f6;
    }

    .item .item-icon {
        flex: 1;
        text-align: center;
    }

    .item .item-note {
        flex: 2;
    }

    .item .item-num {
        flex: 5;
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
        font-weight: 500;
    }

    .grey {
        font-size: 12px;
        color: #aaaaaa;
    }
</style>