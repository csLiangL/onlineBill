<template>
    <div>
        <swiper>
            <swiper-item v-for="item in banners">
                <a :href="item.link">
                    <img :src="item.img" alt="">
                </a>
            </swiper-item>
        </swiper>
        <button @click="btnClickHandler">去记账</button>
        <tab-bar></tab-bar>
    </div>
</template>
<script>
    import TabBar from "components/common/tab/TabBar.vue"
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
            }
        },
        components: {
            TabBar,
            Swiper,
            SwiperItem
        },
        methods: {
            btnClickHandler() {
                this.$router.push("/bill")
            }
        }
    }

</script>