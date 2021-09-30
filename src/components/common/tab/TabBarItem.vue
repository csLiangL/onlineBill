<template>

    <div class="tab-bar-item" @click="itemClickHandle">
        <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-icon-active"></slot>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>

</template>
<script>
    export default {
        props: {
            // 每个组件都存着自身的path, 需要与 当前路由 this.$route 比较。
            path: String,
            activeColor: {
                type: String,
                default: "#04BE02"
            }
        },
        computed: {
            isActive() {
                return this.$route.path.indexOf(this.path) != -1;
            },
            activeStyle() {
                return this.isActive ? { color: this.activeColor } : {}
            }
        },

        // tabbar变色：每次点击组件，则传入path；判断组件内的path, 与当前路由是不是相等。
        // 用isActive变量标识(放在computed中)
        methods: {
            itemClickHandle() {
                this.$router.push(this.path)
            }
        }
    }
</script>
<style>
    /* 子项flex=1，则相邻子项间没有缝隙 */
    .tab-bar-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .tab-bar-item img {
        height: 22px;
        margin-bottom: 5px;
    }
</style>