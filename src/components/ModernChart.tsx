import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../context/ThemeContext';
import styled from 'styled-components';

interface ModernChartProps {
  option: any;
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
  height?: number | string;
  onEvents?: Record<string, Function>;
}

const ChartContainer = styled.div<{ $isDark: boolean }>`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  width: 100%;
  
  .echarts-for-react {
    height: 100% !important;
    min-height: 300px;
  }
`;

const ModernChart: React.FC<ModernChartProps> = ({
  option,
  style,
  className,
  loading = false,
  height = 350,
  onEvents,
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const chartRef = useRef<ReactECharts>(null);
  
  // 为图表设置主题颜色
  useEffect(() => {
    const defaultTheme = {
      // 全局调色盘
      color: isDark 
        ? ['#5B8AF9', '#18D2BA', '#FFD662', '#FF7A7A', '#9D8AEA', '#63E2B7', '#FFAB70', '#F476C2']
        : ['#2A6AFF', '#00C9A7', '#FFC542', '#FF6B6B', '#865CD6', '#3ECFAF', '#FF9A45', '#F25CAF'],
      
      // 背景色
      backgroundColor: 'transparent',
      
      // 文本样式
      textStyle: {
        color: isDark ? '#E2E8F0' : '#1E293B',
      },
      
      // 标题
      title: {
        textStyle: {
          color: isDark ? '#E2E8F0' : '#1E293B',
          fontWeight: 600,
        },
        subtextStyle: {
          color: isDark ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)',
        },
      },
      
      // 图例
      legend: {
        textStyle: {
          color: isDark ? '#CBD5E1' : '#475569',
        },
      },
      
      // 网格
      grid: {
        borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.8)',
      },
      
      // 类目轴
      categoryAxis: {
        axisLine: {
          lineStyle: {
            color: isDark ? '#475569' : '#CBD5E1',
          },
        },
        axisTick: {
          lineStyle: {
            color: isDark ? '#475569' : '#CBD5E1',
          },
        },
        axisLabel: {
          color: isDark ? '#CBD5E1' : '#475569',
        },
        splitLine: {
          lineStyle: {
            color: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.5)',
          },
        },
      },
      
      // 数值轴
      valueAxis: {
        axisLine: {
          lineStyle: {
            color: isDark ? '#475569' : '#CBD5E1',
          },
        },
        axisTick: {
          lineStyle: {
            color: isDark ? '#475569' : '#CBD5E1',
          },
        },
        axisLabel: {
          color: isDark ? '#CBD5E1' : '#475569',
        },
        splitLine: {
          lineStyle: {
            color: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.5)',
          },
        },
      },
      
      // 工具提示
      tooltip: {
        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: isDark ? '#334155' : '#E2E8F0',
        textStyle: {
          color: isDark ? '#E2E8F0' : '#1E293B',
        },
        axisPointer: {
          lineStyle: {
            color: isDark ? '#475569' : '#CBD5E1',
          },
          z: 1,
        },
      },
    };
    
    // 合并默认主题和用户配置
    const mergedOption = {
      ...defaultTheme,
      ...option,
    };
    
    // 如果图表已经存在则刷新它
    if (chartRef.current && chartRef.current.getEchartsInstance) {
      const chart = chartRef.current.getEchartsInstance();
      chart.setOption(mergedOption, true);
    }
  }, [option, themeMode, isDark]);

  return (
    <ChartContainer $isDark={isDark} style={style} className={className}>
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height }}
        className={className}
        showLoading={loading}
        onEvents={onEvents}
        opts={{ renderer: 'canvas' }}
      />
    </ChartContainer>
  );
};

export default ModernChart;