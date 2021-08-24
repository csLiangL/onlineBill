<template>
    <div class="bar-container" ref="bar_chart">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                chartInstance: null,
                // allData: null,    // 服务器返回的数据
            }
        },

        mounted() {
            this.initChart();
            this.getData();
        },

        methods: {
            initChart() {
                this.chartInstance = this.$echarts.init(this.$refs.bar_chart);
                console.log("initChart", this.chartInstance)
            },
            getData() {
                this.updateChart();
            },
            updateChart() {
                console.log("updateChart")
                const option = {
                    tooltip: {
                        trigger: 'item'
                    },

                    visualMap: {
                        show: false,
                        min: 0,
                        max: 1000,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ["40%", "70%"],
                            center: ['50%', '50%'],
                            data: [
                                { value: 235, name: '生活用品' },
                                { value: 100, name: '交通' },
                                { value: 274, name: '衣服' },
                                { value: 800, name: '吃饭' }
                            ].sort(function (a, b) { return a.value - b.value; }),
                            // roseType: 'area',
                            label: {
                                color: 'rgba(0, 0, 0, 0.5)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(0, 0, 0, 0.5)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            },
                            itemStyle: {
                                // color: '#c23531',
                                // shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },

                            // animationType: 'scale',
                            // animationEasing: 'elasticOut',
                            // animationDelay: function (idx) {
                            //     return Math.random() * 200;
                            // }
                        }
                    ]
                };
                this.chartInstance.setOption(option);
            }

        }
    }
</script>

<style>
    .bar-container {
        width: 100%;
        height: 300px;
    }
</style>