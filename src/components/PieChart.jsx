import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PieChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                show: false
            },
            series: [
                {
                    type: 'pie',
                    radius: ['20%', '90%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        // show: false,
                        // position: 'center'
                        show: true,
                        position: 'inside', // 'inside' or 'outside'
                        formatter: '{b}',
                        textStyle: {
                            color: 'white', // 文字颜色
                            fontSize: 17, // 文字大小
                            fontWeight: 'bold' // 文字粗细
                            // 其他样式属性...
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: '已通过' },
                        { value: 735, name: '答案错误' },
                        { value: 580, name: '运行超时' },
                        { value: 484, name: '内存超限' },
                        { value: 300, name: '编译错误' }
                    ]
                }
            ]
        };

        option && myChart.setOption(option);

        // Ensure the chart is disposed when the component is unmounted
        return () => {
            myChart.dispose();
        };
    }, []); // Run only once on mount

    return <div ref={chartRef} style={{ display: "flex", justifyContent: "center", width: '100%', aspectRatio: "1/1" }}></div>;
};

export default PieChart;
