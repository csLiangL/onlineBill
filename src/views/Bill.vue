<template>
    <div class="bill">
        <nav-bar fromPath="/home">
            <img slot="left" src="~assets/img/return.svg">
            <span slot="center">记一笔</span>
            <img slot="right" src="~assets/img/submit.svg">
        </nav-bar>
        <h1>这里是记账页面</h1>
    </div>
</template>

<script>
    import NavBar from "components/common/nav/NavBar.vue"
    export default {
        components: {
            NavBar
        }
    }
</script>