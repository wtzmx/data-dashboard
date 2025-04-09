import React, { useState, useEffect, useRef, RefObject } from 'react';
import { Card, Row, Col, Button, Typography, Spin, Space, Divider, Statistic, Badge } from 'antd';
import { 
  FullscreenOutlined,
  FullscreenExitOutlined, 
  ReloadOutlined, 
  CloudServerOutlined, 
  DatabaseOutlined, 
  ApartmentOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  GlobalOutlined,
  ApiOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import * as echarts from 'echarts';
import { useTheme } from '../context/ThemeContext';
import ModernCard from '../components/ModernCard';

const { Title, Text } = Typography;

// 定义统计卡片样式
const StyledStatisticCard = styled(ModernCard)<{ $type?: 'success' | 'warning' | 'error' | 'info'; $isDark: boolean }>`
  height: 100%;
  
  .ant-card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ant-statistic-title {
    font-size: 16px;
    margin-bottom: 16px;
    color: ${props => {
      if (props.$isDark) {
        return 'rgba(226, 232, 240, 0.85)';
      }
      return 'rgba(30, 41, 59, 0.85)';
    }};
  }
  
  .ant-statistic-content-value {
    font-size: 28px;
    font-weight: 600;
  }
  
  .indicator {
    display: flex;
    align-items: center;
    margin-top: 8px;
    font-size: 14px;
  }
  
  ${props => {
    // 基于类型设置不同的渐变背景
    switch (props.$type) {
      case 'success':
        return `
          background: ${props.$isDark 
            ? 'linear-gradient(135deg, rgba(24, 210, 186, 0.05) 0%, rgba(24, 210, 186, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(0, 201, 167, 0.05) 0%, rgba(0, 201, 167, 0.1) 100%)'};
          .ant-statistic-content-value {
            color: ${props.$isDark ? '#18D2BA' : '#00C9A7'};
          }
        `;
      case 'warning':
        return `
          background: ${props.$isDark 
            ? 'linear-gradient(135deg, rgba(255, 214, 98, 0.05) 0%, rgba(255, 214, 98, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(255, 197, 66, 0.05) 0%, rgba(255, 197, 66, 0.1) 100%)'};
          .ant-statistic-content-value {
            color: ${props.$isDark ? '#FFD662' : '#FFC542'};
          }
        `;
      case 'error':
        return `
          background: ${props.$isDark 
            ? 'linear-gradient(135deg, rgba(255, 122, 122, 0.05) 0%, rgba(255, 122, 122, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 107, 107, 0.1) 100%)'};
          .ant-statistic-content-value {
            color: ${props.$isDark ? '#FF7A7A' : '#FF6B6B'};
          }
        `;
      case 'info':
      default:
        return `
          background: ${props.$isDark 
            ? 'linear-gradient(135deg, rgba(91, 138, 249, 0.05) 0%, rgba(91, 138, 249, 0.1) 100%)' 
            : 'linear-gradient(135deg, rgba(42, 106, 255, 0.05) 0%, rgba(42, 106, 255, 0.1) 100%)'};
          .ant-statistic-content-value {
            color: ${props.$isDark ? '#5B8AF9' : '#2A6AFF'};
          }
        `;
    }
  }}
`;

const StatHeader = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  .ant-badge-status-dot {
    width: 8px;
    height: 8px;
  }
  
  .title {
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.85)' : 'rgba(30, 41, 59, 0.85)'};
  }
`;

// 全屏容器
const FullScreenContainer = styled.div<{ $fullScreen: boolean; $isDark: boolean }>`
  width: 100%;
  height: ${props => props.$fullScreen ? '100vh' : '100%'};
  overflow: ${props => props.$fullScreen ? 'auto' : 'visible'};
  position: ${props => props.$fullScreen ? 'fixed' : 'relative'};
  top: ${props => props.$fullScreen ? '0' : 'auto'};
  left: ${props => props.$fullScreen ? '0' : 'auto'};
  z-index: ${props => props.$fullScreen ? '9999' : '1'};
  background: ${props => props.$isDark ? '#0F172A' : '#F8FAFC'};
  transition: all 0.3s ease;
  padding: ${props => props.$fullScreen ? '20px' : '0'};
`;

const PageHeader = styled.div<{ $isDark: boolean; $fullScreen: boolean }>`
  margin-bottom: 20px;
  padding-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const GaugeGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
  gap: 10px;
  width: 100%;
  height: 100%;
`;

const GaugeContainer = styled.div`
  width: 100%;
  height: 120px;
`;

const FullscreenButton = styled(Button)<{ $isDark: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 18px;
  box-shadow: ${props => props.$isDark 
    ? '0 4px 12px rgba(0, 0, 0, 0.5)' 
    : '0 4px 12px rgba(0, 0, 0, 0.2)'};
  z-index: 10000;
  background: ${props => props.$isDark ? '#334155' : '#FFFFFF'};
  border: 1px solid ${props => props.$isDark ? '#475569' : '#E2E8F0'};
  
  &:hover {
    background: ${props => props.$isDark ? '#475569' : '#F8FAFC'};
    transform: scale(1.05);
  }
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionButton = styled(Button)<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 40px;
  background: ${props => props.$isDark ? '#334155' : '#2563EB'};
  color: white;
  border: none;
  margin-left: 12px;
  box-shadow: ${props => props.$isDark 
    ? '0 4px 8px rgba(0, 0, 0, 0.2)' 
    : '0 4px 8px rgba(37, 99, 235, 0.2)'};
  
  &:hover {
    background: ${props => props.$isDark ? '#475569' : '#1D4ED8'};
  }
  
  span {
    font-weight: 500;
  }
`;

const LoadingContainer = styled.div<{ $isDark: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${props => props.$isDark 
    ? '#0F172A' 
    : '#F8FAFC'};
`;

// 模拟数据中心数据
const dataCenters = [
  { name: '北京数据中心', value: 100, type: 'main', coordinate: [116.4551, 40.2539] },
  { name: '上海数据中心', value: 80, type: 'main', coordinate: [121.4648, 31.2891] },
  { name: '深圳数据中心', value: 80, type: 'main', coordinate: [114.0579, 22.5431] },
  { name: '广州数据中心', value: 70, type: 'regional', coordinate: [113.5107, 23.2196] },
  { name: '成都数据中心', value: 70, type: 'regional', coordinate: [103.9526, 30.7617] },
  { name: '武汉数据中心', value: 60, type: 'regional', coordinate: [114.3896, 30.6628] },
  { name: '西安数据中心', value: 50, type: 'regional', coordinate: [108.9402, 34.3416] },
  { name: '南京数据中心', value: 50, type: 'regional', coordinate: [118.8062, 32.0853] },
  { name: '杭州数据中心', value: 40, type: 'disaster', coordinate: [120.1551, 30.2741] },
  { name: '天津数据中心', value: 40, type: 'disaster', coordinate: [117.4219, 39.4189] }
];

// 模拟数据流动
const dataFlows = [
  { source: '北京数据中心', target: '上海数据中心', value: 85 },
  { source: '北京数据中心', target: '深圳数据中心', value: 70 },
  { source: '北京数据中心', target: '广州数据中心', value: 65 },
  { source: '上海数据中心', target: '南京数据中心', value: 55 },
  { source: '上海数据中心', target: '杭州数据中心', value: 50 },
  { source: '深圳数据中心', target: '广州数据中心', value: 60 },
  { source: '深圳数据中心', target: '武汉数据中心', value: 45 },
  { source: '广州数据中心', target: '成都数据中心', value: 40 },
  { source: '成都数据中心', target: '西安数据中心', value: 30 },
  { source: '武汉数据中心', target: '西安数据中心', value: 25 },
  { source: '北京数据中心', target: '天津数据中心', value: 75 }
];

// 模拟每月数据量统计
const monthlyDataStatistics = [
  { month: '1月', volume: 1250 },
  { month: '2月', volume: 1380 },
  { month: '3月', volume: 1520 },
  { month: '4月', volume: 1650 },
  { month: '5月', volume: 1800 },
  { month: '6月', volume: 2100 },
  { month: '7月', volume: 2350 },
  { month: '8月', volume: 2580 },
  { month: '9月', volume: 2750 },
  { month: '10月', volume: 3000 },
  { month: '11月', volume: 3250 },
  { month: '12月', volume: 3500 }
];

// 模拟每种类型的数据占比
const dataTypePercentage = [
  { type: '结构化数据', value: 45, color: '#5B8AF9' },
  { type: '非结构化数据', value: 25, color: '#00C9A7' },
  { type: '半结构化数据', value: 20, color: '#FFC542' },
  { type: '其他数据', value: 10, color: '#FF6B6B' }
];

// 模拟服务器性能指标
const serverPerformanceData = [
  { type: 'CPU使用率', value: 65 },
  { type: '内存使用率', value: 72 },
  { type: '存储使用率', value: 80 },
  { type: '网络带宽使用率', value: 55 },
  { type: '数据库负载', value: 68 }
];

// 模拟各地区访问量
const regionalAccessData = [
  { region: '华北', value: 10285 },
  { region: '华东', value: 9675 },
  { region: '华南', value: 8580 },
  { region: '西南', value: 5280 },
  { region: '西北', value: 3975 },
  { region: '东北', value: 4580 },
  { region: '华中', value: 7680 }
];

// 主组件定义
const VisualizationPlatform: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chinaGeoJson, setChinaGeoJson] = useState<any>(null);
  
  // 图表引用
  const mapChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const gaugeRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const barChartRef = useRef<HTMLDivElement>(null);
  
  // 存储Echarts实例
  const chartsRef = useRef<{ [key: string]: echarts.ECharts }>({});
  
  // 切换全屏
  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
    
    // 给图表重新调整大小的时间
    setTimeout(() => {
      Object.values(chartsRef.current).forEach(chart => {
        chart?.resize();
      });
    }, 300);
  };

  // 计算数据流向坐标
  const convertDataFlowsToCoordinates = () => {
    return dataFlows.map(flow => {
      const sourceCenter = dataCenters.find(center => center.name === flow.source);
      const targetCenter = dataCenters.find(center => center.name === flow.target);
      
      if (sourceCenter && targetCenter) {
        return {
          fromName: flow.source,
          toName: flow.target,
          coords: [sourceCenter.coordinate, targetCenter.coordinate],
          value: flow.value
        };
      }
      return null;
    }).filter(item => item !== null);
  };
  
  // 初始化图表
  useEffect(() => {
    // 获取中国地图地理数据
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(response => response.json())
      .then(data => {
        setChinaGeoJson(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('加载地图数据失败:', error);
        setLoading(false);
      });
  }, []);
  
  // 初始化并更新所有图表
  useEffect(() => {
    if (loading || !chinaGeoJson) return;
    
    // 注册地图数据
    echarts.registerMap('china', chinaGeoJson);
    
    // 初始化全国数据中心地图
    if (mapChartRef.current) {
      const chart = echarts.init(mapChartRef.current);
      chartsRef.current.map = chart;
      
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            if (params.seriesType === 'effectScatter') {
              return `${params.name}<br/>数据容量: ${params.value[2]}TB`;
            }
            if (params.seriesType === 'lines') {
              return `${params.data.fromName} 至 ${params.data.toName}<br/>数据流量: ${params.data.value}GB/s`;
            }
            return params.name;
          },
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? '#475569' : '#E2E8F0',
          textStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          }
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 20,
          textStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          },
          data: ['主数据中心', '灾备中心', '区域中心', '数据流向'],
          itemGap: 12,
          itemWidth: 15,
          itemHeight: 10
        },
        geo: {
          map: 'china',
          roam: true,
          zoom: 1.2,
          center: [104.5, 38],
          scaleLimit: {
            min: 0.8,
            max: 3
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            },
            itemStyle: {
              areaColor: isDark ? '#334155' : '#E0F2FE'
            }
          },
          itemStyle: {
            areaColor: isDark ? '#1E293B' : '#F0F9FF',
            borderColor: isDark ? '#475569' : '#93C5FD',
            borderWidth: 1
          }
        },
        series: [
          {
            name: '主数据中心',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: dataCenters
              .filter(center => center.type === 'main')
              .map(center => ({
                name: center.name,
                value: [...center.coordinate, center.value],
                itemStyle: {
                  color: '#2A6AFF'
                }
              })),
            symbolSize: (val: number[]) => val[2] / 8,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 3,
              period: 4
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true,
              color: isDark ? '#E2E8F0' : '#1E293B'
            },
            emphasis: {
              scale: true
            },
            zlevel: 2
          },
          {
            name: '灾备中心',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: dataCenters
              .filter(center => center.type === 'disaster')
              .map(center => ({
                name: center.name,
                value: [...center.coordinate, center.value],
                itemStyle: {
                  color: '#FF6B6B'
                }
              })),
            symbolSize: (val: number[]) => val[2] / 8,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 3,
              period: 4
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true,
              color: isDark ? '#E2E8F0' : '#1E293B'
            },
            emphasis: {
              scale: true
            },
            zlevel: 2
          },
          {
            name: '区域中心',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: dataCenters
              .filter(center => center.type === 'regional')
              .map(center => ({
                name: center.name,
                value: [...center.coordinate, center.value],
                itemStyle: {
                  color: '#00C9A7'
                }
              })),
            symbolSize: (val: number[]) => val[2] / 8,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 3,
              period: 4
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true,
              color: isDark ? '#E2E8F0' : '#1E293B'
            },
            emphasis: {
              scale: true
            },
            zlevel: 2
          },
          {
            name: '数据流向',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: '#fff',
              symbolSize: 3
            },
            lineStyle: {
              color: (params: any) => {
                const value = params.data.value;
                if (value > 70) return '#2A6AFF';
                if (value > 50) return '#00C9A7';
                if (value > 30) return '#FFC542';
                return '#FF6B6B';
              },
              width: (params: any) => {
                return params.data.value / 20;
              },
              curveness: 0.3,
              type: 'solid',
              opacity: 0.6
            },
            data: convertDataFlowsToCoordinates()
          }
        ]
      };
      
      chart.setOption(option);
    }
    
    // 初始化折线图
    if (lineChartRef.current) {
      const chart = echarts.init(lineChartRef.current);
      chartsRef.current.line = chart;
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? '#475569' : '#E2E8F0',
          textStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: monthlyDataStatistics.map(item => item.month),
          axisLine: {
            lineStyle: {
              color: isDark ? '#475569' : '#94A3B8'
            }
          },
          axisLabel: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          }
        },
        yAxis: {
          type: 'value',
          name: '数据量 (TB)',
          nameTextStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          },
          axisLine: {
            lineStyle: {
              color: isDark ? '#475569' : '#94A3B8'
            }
          },
          axisLabel: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          },
          splitLine: {
            lineStyle: {
              color: isDark ? 'rgba(71, 85, 105, 0.3)' : 'rgba(148, 163, 184, 0.3)'
            }
          }
        },
        series: [
          {
            name: '数据处理量',
            type: 'line',
            data: monthlyDataStatistics.map(item => item.volume),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 4,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: isDark ? '#5B8AF9' : '#2A6AFF' },
                { offset: 1, color: isDark ? '#18D2BA' : '#00C9A7' }
              ])
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: isDark ? 'rgba(91, 138, 249, 0.5)' : 'rgba(42, 106, 255, 0.5)' },
                { offset: 1, color: isDark ? 'rgba(24, 210, 186, 0.1)' : 'rgba(0, 201, 167, 0.1)' }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      };
      
      chart.setOption(option);
    }
    
    // 初始化饼图
    if (pieChartRef.current) {
      const chart = echarts.init(pieChartRef.current);
      chartsRef.current.pie = chart;
      
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? '#475569' : '#E2E8F0',
          textStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          }
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          data: dataTypePercentage.map(item => item.type),
          textStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          },
          itemGap: 12,
          itemWidth: 15,
          itemHeight: 10
        },
        series: [
          {
            name: '数据类型',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: isDark ? '#1E293B' : '#FFFFFF',
              borderWidth: 2
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: dataTypePercentage.map(item => ({
              name: item.type,
              value: item.value,
              itemStyle: {
                color: item.color
              }
            }))
          }
        ]
      };
      
      chart.setOption(option);
    }
    
    // 初始化服务器性能仪表盘 - 使用单独的容器解决重叠问题
    serverPerformanceData.forEach((item, index) => {
      const gaugeRef = gaugeRefs.current[`gauge-${index}`];
      if (gaugeRef) {
        const chart = echarts.init(gaugeRef);
        chartsRef.current[`gauge-${index}`] = chart;
        
        let color;
        if (item.value >= 80) {
          color = '#FF6B6B';
        } else if (item.value >= 60) {
          color = '#FFC542';
        } else {
          color = '#00C9A7';
        }
        
        const option = {
          tooltip: {
            formatter: '{b} : {c}%',
            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? '#475569' : '#E2E8F0',
            textStyle: {
              color: isDark ? '#E2E8F0' : '#1E293B'
            }
          },
          series: [
            {
              type: 'gauge',
              radius: '90%',
              min: 0,
              max: 100,
              startAngle: 210,
              endAngle: -30,
              progress: {
                show: true
              },
              axisLine: {
                lineStyle: {
                  width: 8,
                  color: [
                    [item.value / 100, color],
                    [1, isDark ? '#334155' : '#E2E8F0']
                  ]
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                length: 6,
                distance: -6,
                lineStyle: {
                  width: 1,
                  color: isDark ? '#475569' : '#CBD5E1'
                }
              },
              axisLabel: {
                distance: 10,
                color: isDark ? '#E2E8F0' : '#1E293B',
                fontSize: 10
              },
              anchor: {
                show: true,
                showAbove: true,
                size: 15,
                itemStyle: {
                  borderWidth: 2
                }
              },
              title: {
                show: true,
                offsetCenter: [0, '65%'],
                fontSize: 12,
                color: isDark ? '#E2E8F0' : '#1E293B'
              },
              detail: {
                valueAnimation: true,
                fontSize: 20,
                color: isDark ? '#E2E8F0' : '#1E293B',
                offsetCenter: [0, 0],
                formatter: '{value}%'
              },
              data: [
                {
                  value: item.value,
                  name: item.type
                }
              ]
            }
          ]
        };
        
        chart.setOption(option);
      }
    });
    
    // 初始化柱状图
    if (barChartRef.current) {
      const chart = echarts.init(barChartRef.current);
      chartsRef.current.bar = chart;
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? '#475569' : '#E2E8F0',
          textStyle: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: isDark ? '#475569' : '#94A3B8'
            }
          },
          axisLabel: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          },
          splitLine: {
            lineStyle: {
              color: isDark ? 'rgba(71, 85, 105, 0.3)' : 'rgba(148, 163, 184, 0.3)'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: regionalAccessData.map(item => item.region),
          axisLine: {
            lineStyle: {
              color: isDark ? '#475569' : '#94A3B8'
            }
          },
          axisLabel: {
            color: isDark ? '#E2E8F0' : '#1E293B'
          }
        },
        series: [
          {
            name: '访问量',
            type: 'bar',
            data: regionalAccessData.map(item => ({
              value: item.value,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: isDark ? '#5B8AF9' : '#2A6AFF' },
                  { offset: 1, color: isDark ? '#18D2BA' : '#00C9A7' }
                ])
              }
            })),
            label: {
              show: true,
              position: 'right',
              color: isDark ? '#E2E8F0' : '#1E293B'
            }
          }
        ]
      };
      
      chart.setOption(option);
    }
    
    // 处理窗口大小变化
    const handleResize = () => {
      Object.values(chartsRef.current).forEach(chart => {
        chart.resize();
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // 处理全屏变化
    const fullscreenChangeHandler = () => {
      setTimeout(() => {
        handleResize();
      }, 100);
    };
    
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
    document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
      
      Object.values(chartsRef.current).forEach(chart => {
        chart.dispose();
      });
    };
  }, [loading, chinaGeoJson, isDark, fullScreen]);
  
  // 刷新所有图表
  const refreshCharts = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  // 设置gauge的ref
  const setGaugeRef = (index: number) => (el: HTMLDivElement | null) => {
    gaugeRefs.current[`gauge-${index}`] = el;
  };
  
  const contentStyle = fullScreen ? 
    { padding: '24px', overflow: 'auto', height: 'calc(100vh - 80px)' } : 
    { width: '100%' };
  
  return (
    <FullScreenContainer $fullScreen={fullScreen} $isDark={isDark}>
      {loading ? (
        <LoadingContainer $isDark={isDark}>
          <Spin size="large" />
          <Text style={{ marginTop: 16, color: isDark ? '#E2E8F0' : '#1E293B' }}>
            加载数据中...
          </Text>
        </LoadingContainer>
      ) : (
        <>
          <PageHeader $isDark={isDark} $fullScreen={fullScreen}>
            <Space align="center">
              <ApartmentOutlined style={{ fontSize: 24, color: isDark ? '#60A5FA' : '#2563EB' }} />
              <Title level={3} style={{ margin: 0, color: isDark ? '#E2E8F0' : '#1E293B' }}>
                数据中心可视化平台
              </Title>
            </Space>
            <Space>
              <ActionButton 
                type="primary" 
                icon={<ReloadOutlined />} 
                onClick={refreshCharts}
                $isDark={isDark}
              >
                刷新数据
              </ActionButton>
              <ActionButton 
                type="primary" 
                icon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} 
                onClick={toggleFullScreen}
                $isDark={isDark}
              >
                {fullScreen ? '退出全屏' : '全屏显示'}
              </ActionButton>
            </Space>
          </PageHeader>
          
          <Space direction="vertical" style={contentStyle} size="large">
            {/* 顶部四个统计卡片 */}
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={6}>
                <StyledStatisticCard hoverable $type="info" $isDark={isDark}>
                  <StatHeader $isDark={isDark}>
                    <Text className="title">数据中心总数</Text>
                    <Badge status="processing" />
                  </StatHeader>
                  <Statistic
                    value={10}
                    valueStyle={{ fontSize: 28 }}
                  />
                  <div className="indicator">
                    <CloudServerOutlined style={{ marginRight: 8 }} />
                    <Text type="secondary">本月新增 1 个</Text>
                  </div>
                </StyledStatisticCard>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <StyledStatisticCard hoverable $type="success" $isDark={isDark}>
                  <StatHeader $isDark={isDark}>
                    <Text className="title">总数据流量</Text>
                    <Badge status="success" />
                  </StatHeader>
                  <Statistic
                    value={3650}
                    precision={0}
                    valueStyle={{ fontSize: 28 }}
                    suffix="TB"
                  />
                  <div className="indicator">
                    <ArrowUpOutlined style={{ color: '#00C9A7', marginRight: 8 }} />
                    <Text type="secondary">较上月增长 12.5%</Text>
                  </div>
                </StyledStatisticCard>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <StyledStatisticCard hoverable $type="error" $isDark={isDark}>
                  <StatHeader $isDark={isDark}>
                    <Text className="title">系统告警</Text>
                    <Badge status="error" />
                  </StatHeader>
                  <Statistic
                    value={15}
                    precision={0}
                    valueStyle={{ fontSize: 28 }}
                  />
                  <div className="indicator">
                    <ArrowDownOutlined style={{ color: '#FF6B6B', marginRight: 8 }} />
                    <Text type="secondary">较上月下降 5.3%</Text>
                  </div>
                </StyledStatisticCard>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <StyledStatisticCard hoverable $type="warning" $isDark={isDark}>
                  <StatHeader $isDark={isDark}>
                    <Text className="title">API调用次数</Text>
                    <Badge status="warning" />
                  </StatHeader>
                  <Statistic
                    value={56823}
                    valueStyle={{ fontSize: 28 }}
                  />
                  <div className="indicator">
                    <ApiOutlined style={{ color: '#FFC542', marginRight: 8 }} />
                    <Text type="secondary">日均 1894 次</Text>
                  </div>
                </StyledStatisticCard>
              </Col>
            </Row>

            {/* 数据中心地图 */}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ModernCard 
                  title={
                    <Space>
                      <GlobalOutlined />
                      全国数据中心网络
                    </Space>
                  }
                  hoverable
                >
                  <div style={{ height: fullScreen ? '650px' : '550px' }}>
                    <ChartContainer ref={mapChartRef} />
                  </div>
                </ModernCard>
              </Col>
            </Row>
            
            {/* 数据处理量和类型分布 */}
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <ModernCard 
                  title={
                    <Space>
                      <DatabaseOutlined />
                      数据处理量趋势
                    </Space>
                  }
                  hoverable
                >
                  <div style={{ height: fullScreen ? '400px' : '350px' }}>
                    <ChartContainer ref={lineChartRef} />
                  </div>
                </ModernCard>
              </Col>
              
              <Col xs={24} lg={12}>
                <ModernCard 
                  title={
                    <Space>
                      <DatabaseOutlined />
                      数据类型分布
                    </Space>
                  }
                  hoverable
                >
                  <div style={{ height: fullScreen ? '400px' : '350px' }}>
                    <ChartContainer ref={pieChartRef} />
                  </div>
                </ModernCard>
              </Col>
            </Row>
            
            {/* 服务器性能监控和访问量统计 */}
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <ModernCard 
                  title={
                    <Space>
                      <CloudServerOutlined />
                      服务器性能监控
                    </Space>
                  }
                  hoverable
                >
                  <div style={{ height: fullScreen ? '400px' : '350px' }}>
                    <GaugeGridContainer>
                      {serverPerformanceData.map((item, index) => (
                        <GaugeContainer 
                          key={`gauge-${index}`} 
                          ref={setGaugeRef(index)}
                        />
                      ))}
                    </GaugeGridContainer>
                  </div>
                </ModernCard>
              </Col>
              
              <Col xs={24} lg={12}>
                <ModernCard 
                  title={
                    <Space>
                      <ApartmentOutlined />
                      各地区访问量统计
                    </Space>
                  }
                  hoverable
                >
                  <div style={{ height: fullScreen ? '400px' : '350px' }}>
                    <ChartContainer ref={barChartRef} />
                  </div>
                </ModernCard>
              </Col>
            </Row>
          </Space>
        </>
      )}
    </FullScreenContainer>
  );
};

export default VisualizationPlatform;