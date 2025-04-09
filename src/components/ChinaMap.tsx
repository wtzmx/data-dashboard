import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, VisualMapComponent, GeoComponent } from 'echarts/components';
import { ScatterChart, LinesChart, EffectScatterChart } from 'echarts/charts'; // 按需引入需要的图表类型
import { CanvasRenderer } from 'echarts/renderers';
import { useTheme } from '../context/ThemeContext';

// 注册需要的 ECharts 组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  ScatterChart,
  LinesChart,
  EffectScatterChart, // 如果需要特效散点图（如 rippleEffect）
  CanvasRenderer
]);

interface ChinaMapProps {
  style?: React.CSSProperties;
  className?: string;
}

const ChinaMap: React.FC<ChinaMapProps> = ({ style, className }) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [isMapRegistered, setIsMapRegistered] = useState(false);

  // Effect for fetching and registering map data (runs once on mount)
  useEffect(() => {
    let isMounted = true; // Flag to prevent state update on unmounted component

    const registerMap = async () => {
      try {
        // 使用可靠的 GeoJSON 源，例如阿里云 DataV
        const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const chinaJson = await response.json();

        if (isMounted) {
          echarts.registerMap('china', chinaJson);
          setIsMapRegistered(true);
          console.log('China map registered successfully.');
        }
      } catch (error) {
        console.error('Failed to fetch or register China map:', error);
        // 这里可以添加一些用户反馈，比如显示错误消息
      }
    };

    registerMap();

    return () => {
      isMounted = false; // Cleanup function: set flag to false when component unmounts
    };
  }, []); // Empty dependency array ensures this runs only once

  // Effect for initializing chart and setting options (runs when map is registered or theme changes)
  useEffect(() => {
    if (chartRef.current && isMapRegistered) {
      // Initialize chart instance if it doesn't exist
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
        console.log('ECharts instance initialized.');
      }

      const option: echarts.EChartsOption = { // 使用 EChartsOption 类型提供更好的类型提示
        title: {
          text: '全国数据流动监控',
          left: 'center',
          textStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}' // ECharts 会自动处理 value[2] 作为 {c}
        },
        visualMap: {
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
          },
          textStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          }
        },
        geo: {
          map: 'china',
          roam: true,
          label: {
            // emphasis is deprecated, use select instead or configure within state>emphasis
             show: false // 不显示省份标签
          },
          itemStyle: {
            areaColor: isDark ? '#1E293B' : '#F0F9FF',
            borderColor: isDark ? '#334155' : '#CBD5E1'
          },
          emphasis: { // 配置高亮状态下的样式
             label: {
                show: false // 高亮时不显示省份标签
             },
            itemStyle: {
              areaColor: '#2a6aff'
            }
          },
          zoom: 1.2
        },
        series: [
          {
            name: '数据流量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [
              { name: '北京', value: [116.46, 39.92, 450] },
              { name: '上海', value: [121.48, 31.22, 420] },
              { name: '广州', value: [113.23, 23.16, 380] },
              { name: '深圳', value: [114.07, 22.62, 390] },
              { name: '杭州', value: [120.19, 30.26, 320] },
              { name: '南京', value: [118.78, 32.04, 280] },
              { name: '武汉', value: [114.31, 30.52, 290] },
              { name: '成都', value: [104.06, 30.67, 310] },
              { name: '重庆', value: [106.54, 29.59, 270] },
              { name: '西安', value: [108.95, 34.27, 210] },
              { name: '青岛', value: [120.33, 36.07, 190] },
              { name: '长沙', value: [112.94, 28.23, 180] },
              { name: '郑州', value: [113.65, 34.76, 170] },
              { name: '天津', value: [117.2, 39.13, 210] },
              { name: '大连', value: [121.62, 38.92, 150] }
            ],
            symbolSize: function (val: number[]) { // 添加类型 number[]
              // val 是数据项的 value 数组，例如 [116.46, 39.92, 450]
              return val[2] / 15;
            },
            // showEffectOn: 'emphasis', // effectScatter 通常直接配置 effect
            rippleEffect: { // 直接配置涟漪效果
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              formatter: '{b}',
              position: 'right',
              show: false // 常态下不显示标签
            },
            emphasis: { // 高亮状态下的标签
                label: {
                  show: true
                }
            },
            itemStyle: {
                color: '#2a6aff', // 移除非 ECharts 官方 itemStyle.normal
                shadowBlur: 10,
                shadowColor: 'rgba(42, 106, 255, 0.5)'
            },
            zlevel: 1
          },
          {
            name: '流动连线',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2,
            effect: {
              show: true,
              period: 4,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3
            },
            lineStyle: {
                // ECharts 5 中 normal 已被移除，直接在 lineStyle 下配置
                // color: function(params) { // 移除未使用的 params
                color: function() { // 修改后的函数签名
                    // 随机颜色
                    const colors = ['#2a6aff', '#00c9a7', '#ffc542', '#ff6b6b'];
                    return colors[Math.floor(Math.random() * colors.length)];
                },
                width: 1,
                curveness: 0.2
            },
            data: [
              { fromName: '北京', toName: '上海', coords: [[116.46, 39.92], [121.48, 31.22]] },
              { fromName: '北京', toName: '广州', coords: [[116.46, 39.92], [113.23, 23.16]] },
              { fromName: '北京', toName: '成都', coords: [[116.46, 39.92], [104.06, 30.67]] },
              { fromName: '上海', toName: '杭州', coords: [[121.48, 31.22], [120.19, 30.26]] },
              { fromName: '上海', toName: '武汉', coords: [[121.48, 31.22], [114.31, 30.52]] },
              { fromName: '广州', toName: '深圳', coords: [[113.23, 23.16], [114.07, 22.62]] },
              { fromName: '广州', toName: '南京', coords: [[113.23, 23.16], [118.78, 32.04]] },
              { fromName: '杭州', toName: '南京', coords: [[120.19, 30.26], [118.78, 32.04]] },
              { fromName: '武汉', toName: '重庆', coords: [[114.31, 30.52], [106.54, 29.59]] },
              { fromName: '西安', toName: '郑州', coords: [[108.95, 34.27], [113.65, 34.76]] }
            ]
          }
        ]
      };

      // Set option, use true to not merge with previous options which might cause issues on theme change
      chartInstance.current.setOption(option, true);
      console.log('ECharts option set.');

    }

    // Cleanup function for this effect
    return () => {
      // Dispose instance only when component unmounts, not just on theme change
      // The resize listener cleanup handles its own logic
    };
  }, [isDark, isMapRegistered]); // Rerun effect if theme or map registration status changes

  // Effect for handling window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup resize listener and ECharts instance on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        console.log('Disposing ECharts instance.');
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div ref={chartRef} style={{ width: '100%', height: '550px', ...style }} className={className}>
      {!isMapRegistered && <div style={{textAlign: 'center', paddingTop: '50px'}}>Loading Map...</div>} {/* Optional: Loading indicator */}
    </div>
  );
};

export default ChinaMap;