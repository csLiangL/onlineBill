<template>
    <!-- 上部导航栏在一个项目中可能有多个 -->
    <div class="nav-bar">
        <div class="left" @click="navLeftClickHandler">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            fromPath: String
        },
        methods: {
            navLeftClickHandler() {
                this.$router.push(this.fromPath)
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
</style>