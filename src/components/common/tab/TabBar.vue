<template>
    <div id="tab-bar">
        <tab-bar-item path='/home'>
            <img slot="item-icon" src="~assets/img/home.svg" alt="">
            <img slot="item-icon-active" src="~assets/img/home-active.svg" alt="">
            <span slot="item-text">主页</span>
        </tab-bar-item>
        <tab-bar-item path='/charts'>
            <img slot="item-icon" src="~assets/img/charts.svg" alt="">
            <img slot="item-icon-active" src="~assets/img/charts-active.svg" alt="">
            <span slot="item-text">图表</span>
        </tab-bar-item>
        <tab-bar-item path='/profile'>
            <img slot="item-icon" src="~assets/img/profile.svg" alt="">
            <img slot="item-icon-active" src="~assets/img/profile-active.svg" alt="">
            <span slot="item-text">我的</span>
        </tab-bar-item>
    </div>
</template>
<script>
    import TabBarItem from "./TabBarItem.vue"
    export default {
        components: {
            TabBarItem
        }
    }
</script>
<style>
    #tab-bar {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f6f6f6;
        box-shadow: 0 -2px 2px rgba(0, 0, 0, .1)
    }
</style>