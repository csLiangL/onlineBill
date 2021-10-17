<template>
    <div class="chart-pie" ref="pie"></div>
</template>

<script>
    export default {
        props: {
            catData: {
                type: Array,
                default: () => [],
            }
        },

        data() {
            return {
                pieInstance: null,
            }
        },

        computed: {
            sortedData() {
                return this.catData.sort(function (a, b) { return a.value - b.value; });
            }
        },

        mounted() {
            this.initChart();
        },

        methods: {
            // 初始化图表
            initChart() {
                this.pieInstance = this.$echarts.init(this.$refs.pie)
            },

            // 更新图表
            updateChart() {
                const option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ["40%", "70%"],
                            center: ['50%', '50%'],
                            data: this.sortedData,
                            label: {
                                color: 'rgba(0, 0, 0, 0.5)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(0, 0, 0, 0.5)'
                                },
                                smooth: 0.2,
                                length: 8,
                                length2: 8
                            },
                            itemStyle: {
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                        }
                    ]
                }
                this.pieInstance.setOption(option);
            }
        },
        watch: {
            catData(newVal, oldVal) {
                this.updateChart();
            }
        }

    }
</script>

<style>

</style>