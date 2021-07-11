<template>
    <div>
        <div class="tab-bar-item" @click="itemClickHandle">
            <slot name="item-icon"></slot>
            <slot name="item-text"></slot>
        </div>
    </div>
</template>
<script>
    export default{
        props:[
            "path"
        ],
        methods:{
            itemClickHandle(){
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
    }
    .tab-bar-item img {
        height: 25px;
    }
</style>