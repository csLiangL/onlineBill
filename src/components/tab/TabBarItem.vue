<template>
    <div>
        <div class="tab-bar-item" @click="itemClickHandle">
            <slot v-if="!isActive" name="item-icon"></slot>
            <slot v-else name="item-icon-active"></slot>
            <div :class="{active: isActive}">
                <slot name="item-text"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["path"],
        computed: {
            isActive() {
                return this.$route.path == this.path;
            }
        },
        methods: {
            itemClickHandle() {
                this.$router.push(this.path)
            }
        }
    }
</script>
<style>
    .tab-bar-item {
        display: flex;
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

    .active {
        color: #04BE02;
    }
</style>