<template>
    <div class="loading" v-show="isShow">
        <van-loading class="van-loading" size="24px" color="#04BE02">加载中...</van-loading>
    </div>
</template>

<script>
    import { Loading } from 'vant';
    export default {
        components: {
            [Loading.name]: Loading,
        },
        data() {
            return {
                isShow: false,
            }
        },
        created() {
            this.updateState();
        },

        methods: {
            updateState() {
                // 注册Loading事件。本质上是向名为Loading的事件中，加入了一个回调函数。
                // 一旦后续有人发送 名为Loading的事件，该回调函数就会被执行。
                this.$bus.$on("Loading", flag => {
                    this.isShow = flag;
                })
            }
        },
    }
</script>

<style>
    .loading {
        /* 首先用固定定位，并设置上下左右为0，撑满整个屏幕 */
        /* 再用flex布局，使得内部的块级元素水平垂直居中 */
        position: fixed;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: rgba(200, 200, 200, 0.3);
        margin: auto;
        justify-content: center;
        align-items: center;
    }
</style>