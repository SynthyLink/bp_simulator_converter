import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { LineChart  } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ComposeOption } from 'echarts/core';
import type { LineSeriesOption } from 'echarts/charts';
import type { GridComponentOption, TitleComponentOption, TooltipComponentOption } from 'echarts/components';
//import { BarChart, LineChart } from 'recharts';
import { DataT } from './DataT';

// Register only the necessary modules
echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

// Combine option types tightly to avoid bundle leaks
type EChartsCombinedOption = ComposeOption<
    TitleComponentOption | TooltipComponentOption | GridComponentOption | LineSeriesOption
    >;

let data = new DataT

//series: [{ type: 'bar', data: [10, 20, 30] }],

//let data = new DataT
export const OptimizedChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize the custom instance
        const chartInstance = echarts.init(chartRef.current);

        const option: EChartsCombinedOption =
        {
            legend: {
                left: 'center',
                    bottom: 'bottom'
            },
            xAxis: {
                type: 'category',
                data: data.getData(),
                },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'line series 1',
                    type: 'line',
              //      smooth: true,
                    data: [28.5, 70.5, 108.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                    symbol: 'none',
                  //  symbolSize: 10,
                  //  symbol: 'square',
                    emphasis: {
                        focus: 'series',
                      //  lineStyle: {
                       //     width: 5
                       // }
                    }
                },
                {
                    name: 'line series 2',
                    type: 'line',
         //           smooth: true,
                    data: [226.9, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5],
                  //  symbolSize: 10,
                    // symbol: 'circle',
                    symbol: 'none',
                    emphasis: {
                        focus: 'series'
                    }
                }
            ]
        };

        chartInstance.setOption(option);

        // Handle responsiveness
        const handleResize = () => chartInstance.resize();
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};