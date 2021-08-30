<template>
    <div id="loading" v-show="isShow">
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
                this.bus.$on("Loading", flag => {
                    this.isShow = flag;
                })
            }
        },
    }
</script>

<style>
    #loading {
        position: absolute;
        display: flex;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: rgba(200, 200, 200, 0.3);
        text-align: center;
        margin: auto;
        justify-content: center;
        align-items: center;
    }
</style>