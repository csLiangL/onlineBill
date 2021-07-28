<template>
    <div id="home">
        <swiper>
            <swiper-item v-for="item in banners">
                <a :href="item.link">
                    <img :src="item.img" alt="">
                </a>
            </swiper-item>
        </swiper>

        <button @click="btnClickHandler">去记账</button>


        <div class="record">
            <div class="date">
                <span class="bigger">26日</span>
                <span class="grey">7.2021 周一</span>
            </div>
            <div class="item">
                <div class="item-icon">
                    <img src="~assets/img/edit.svg" alt="">
                    <div class="icon-note">
                        <span class="">吃饭</span>
                        <span class="grey">13:09 现金</span>
                    </div>
                </div>
                <div class="item-num">30.00</div>
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
                        link: "https://img95.699pic.com/photo/50047/2172.jpg_wh860.jpg!/fw/562",
                        img: "https://img95.699pic.com/photo/50047/2172.jpg_wh860.jpg!/fw/562"
                    },
                    {
                        link: "https://dpic.tiankong.com/ix/ss/QJ9127855050.jpg?x-oss-process=style/794ws",
                        img: "https://dpic.tiankong.com/ix/ss/QJ9127855050.jpg?x-oss-process=style/794ws"
                    },
                    {
                        link: "https://dpic.tiankong.com/js/8s/QJ9127855133.jpg?x-oss-process=style/794ws",
                        img: "https://dpic.tiankong.com/js/8s/QJ9127855133.jpg?x-oss-process=style/794ws"
                    },
                    {
                        link: "http://img.b2bname.com/archive201912/15775138381381.jpg",
                        img: "http://img.b2bname.com/archive201912/15775138381381.jpg"
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
    .date {
        height: 20px;
    }

    .item {
        display: flex;
        height: 50px;
        line-height: 50px;
        justify-content: space-between;
    }

    .item .item-icon {
        display: flex;
    }

    .item .item-icon img {
        width: 20px;
    }

    .item .item-icon .icon-note {
        display: flex;
        flex-flow: column nowrap;
    }
</style>