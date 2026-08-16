import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ComposeOption } from 'echarts/core';
import type { BarSeriesOption } from 'echarts/charts';
import type { GridComponentOption, TitleComponentOption, TooltipComponentOption } from 'echarts/components';

// Register only the necessary modules
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

// Combine option types tightly to avoid bundle leaks
type EChartsCombinedOption = ComposeOption<
    TitleComponentOption | TooltipComponentOption | GridComponentOption | BarSeriesOption
>;

export const OptimizedChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize the custom instance
        const chartInstance = echarts.init(chartRef.current);

        const option: EChartsCombinedOption = {
            title: { text: 'Optimized Bar Chart' },
            tooltip: {},
            xAxis: { data: ['A', 'B', 'C'] },
            yAxis: {},
            series: [{ type: 'bar', data: [10, 20, 30] }],
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
