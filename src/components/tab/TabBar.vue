<template>
    <div class="tab-bar">
        <tab-bar-item path='/home'>
            <img slot="item-icon" src="~assets/img/home.svg" alt="">
            <div slot="item-text">主页</div>
        </tab-bar-item>
        <tab-bar-item path='/charts'>
            <img slot="item-icon" src="~assets/img/charts.svg" alt="">
            <div slot="item-text">图表</div>
        </tab-bar-item>
        <tab-bar-item path='/settings'>
            <img slot="item-icon" src="~assets/img/settings.svg" alt="">
            <div slot="item-text">设置</div>
        </tab-bar-item>
    </div>
</template>
<script>
    import TabBarItem from "./TabBarItem.vue"
    export default {
        components:{
            TabBarItem
        }
    }
</script>
<style>
    .tab-bar {
        display: flex;
        justify-content: space-around;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>