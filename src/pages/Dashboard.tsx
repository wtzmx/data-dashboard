import React from 'react';
import { Row, Col, Statistic, Typography, Space, Badge, Divider } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  AppstoreOutlined, 
  SafetyCertificateOutlined,
  DatabaseOutlined,
  AimOutlined,
  // CloudServerOutlined,
  SearchOutlined,
  FileSearchOutlined,
  PartitionOutlined,
  ApiOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import ModernCard from '../components/ModernCard';
import ModernChart from '../components/ModernChart';
import { useTheme } from '../context/ThemeContext';
import * as echarts from 'echarts';

const { Title, Text } = Typography;

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

// 新增网络图组件样式
const NetworkGraphCard = styled(ModernCard)<{ $isDark: boolean }>`
  height: 400px;
  position: relative;
  overflow: hidden;

  .graph-title {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 10;
  }

  .graph-legend {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    padding: 10px;
    background: ${props => props.$isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
    border-radius: 6px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 8px;
  }
`;

const Dashboard: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  // 折线图配置 - 数据资产增长趋势
  const lineChartOption = {
    title: {
      text: '数据资产增长趋势',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: isDark ? '#334155' : '#E2E8F0',
      textStyle: {
        color: isDark ? '#E2E8F0' : '#1E293B'
      }
    },
    legend: {
      data: ['结构化数据', '非结构化数据', '半结构化数据'],
      right: 10,
      top: 5
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      top: 50
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisLine: {
        lineStyle: {
          color: isDark ? '#475569' : '#CBD5E1'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: isDark ? 'rgba(51, 65, 85, 0.2)' : 'rgba(226, 232, 240, 0.5)'
        }
      }
    },
    series: [
      {
        name: '结构化数据',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [320, 402, 501, 634, 790, 930, 1120]
      },
      {
        name: '非结构化数据',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [220, 282, 391, 494, 590, 790, 950]
      },
      {
        name: '半结构化数据',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [150, 212, 301, 424, 530, 630, 730]
      }
    ]
  };

  // 饼图配置 - 数据资产类型分布
  const pieChartOption = {
    title: {
      text: '数据资产类型分布',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      left: 10,
      top: 5
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 15
    },
    series: [
      {
        name: '资产类型',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: isDark ? '#1E293B' : '#FFFFFF',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          scale: true,
          scaleSize: 12,
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '业务数据表' },
          { value: 735, name: '分析模型' },
          { value: 580, name: '外部数据源' },
          { value: 484, name: '文档资产' },
          { value: 380, name: '元数据' }
        ]
      }
    ]
  };

  // 柱状图配置 - 数据质量评分
  const barChartOption = {
    title: {
      text: '各部门数据质量评分',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      right: 10,
      top: 5
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 50,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLine: {
        show: true,
        lineStyle: {
          color: isDark ? '#475569' : '#CBD5E1'
        }
      },
      splitLine: {
        lineStyle: {
          color: isDark ? 'rgba(51, 65, 85, 0.2)' : 'rgba(226, 232, 240, 0.5)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['财务部门', '销售部门', '市场部门', '研发部门', '人力资源部'],
      axisLine: {
        lineStyle: {
          color: isDark ? '#475569' : '#CBD5E1'
        }
      }
    },
    series: [
      {
        name: '完整性',
        type: 'bar',
        stack: 'total',
        data: [95, 87, 82, 93, 89]
      },
      {
        name: '准确性',
        type: 'bar',
        stack: 'total',
        data: [0, 0, 0, 0, 0]
      },
      {
        name: '一致性',
        type: 'bar',
        stack: 'total',
        data: [0, 0, 0, 0, 0]
      }
    ]
  };

  // 新增: 数据血缘关系网络图
  const networkGraphOption = {
    tooltip: {},
    legend: [
      {
        data: ['数据源', '分析模型', '业务报表', '数据仓库', '数据集市'],
        right: 10,
        top: 10,
        textStyle: {
          color: isDark ? '#E2E8F0' : '#1E293B'
        },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 15
      }
    ],
    series: [
      {
        name: '数据血缘关系',
        type: 'graph',
        layout: 'force',
        data: [
          { 
            id: '0',
            name: '客户数据库', 
            symbolSize: 40, 
            value: 27, 
            category: 0,
            itemStyle: { color: '#2A6AFF' }
          },
          { 
            id: '1',
            name: '订单系统', 
            symbolSize: 35, 
            value: 22, 
            category: 0,
            itemStyle: { color: '#5B8AF9' }
          },
          { 
            id: '2',
            name: '用户分析表', 
            symbolSize: 30, 
            value: 15, 
            category: 1,
            itemStyle: { color: '#00C9A7' }
          },
          { 
            id: '3',
            name: '销售预测模型', 
            symbolSize: 30, 
            value: 15, 
            category: 1,
            itemStyle: { color: '#18D2BA' }
          },
          { 
            id: '4',
            name: '客户行为分析', 
            symbolSize: 25, 
            value: 10, 
            category: 1,
            itemStyle: { color: '#00C9A7' }
          },
          { 
            id: '5',
            name: '经营报表', 
            symbolSize: 25, 
            value: 10, 
            category: 2,
            itemStyle: { color: '#FFC542' }
          },
          { 
            id: '6',
            name: '管理决策报告', 
            symbolSize: 25, 
            value: 10, 
            category: 2,
            itemStyle: { color: '#FFD662' }
          },
          { 
            id: '7',
            name: '市场分析报告', 
            symbolSize: 25, 
            value: 10, 
            category: 2,
            itemStyle: { color: '#FFC542' }
          },
          // 新增数据节点
          { 
            id: '8',
            name: 'ODS层', 
            symbolSize: 40, 
            value: 25, 
            category: 3,
            itemStyle: { color: '#9D8AEA' }
          },
          { 
            id: '9',
            name: 'DWD层', 
            symbolSize: 35, 
            value: 20, 
            category: 3,
            itemStyle: { color: '#865CD6' }
          },
          { 
            id: '10',
            name: 'DWS层', 
            symbolSize: 35, 
            value: 20, 
            category: 3,
            itemStyle: { color: '#9D8AEA' }
          },
          { 
            id: '11',
            name: '产品分析集市', 
            symbolSize: 30, 
            value: 15, 
            category: 4,
            itemStyle: { color: '#FFA26B' }
          },
          { 
            id: '12',
            name: '用户画像集市', 
            symbolSize: 30, 
            value: 15, 
            category: 4,
            itemStyle: { color: '#FF8C42' }
          },
          { 
            id: '13',
            name: '供应链系统', 
            symbolSize: 35, 
            value: 22, 
            category: 0,
            itemStyle: { color: '#2A6AFF' }
          },
          { 
            id: '14',
            name: '物流分析模型', 
            symbolSize: 30, 
            value: 15, 
            category: 1,
            itemStyle: { color: '#18D2BA' }
          },
          { 
            id: '15',
            name: '库存预警报表', 
            symbolSize: 25, 
            value: 10, 
            category: 2,
            itemStyle: { color: '#FFD662' }
          }
        ],
        links: [
          { source: '0', target: '2' },
          { source: '0', target: '4' },
          { source: '1', target: '3' },
          { source: '1', target: '5' },
          { source: '2', target: '6' },
          { source: '3', target: '6' },
          { source: '4', target: '7' },
          { source: '1', target: '7' },
          // 新增连接关系
          { source: '0', target: '8' },
          { source: '1', target: '8' },
          { source: '13', target: '8' },
          { source: '8', target: '9' },
          { source: '9', target: '10' },
          { source: '10', target: '11' },
          { source: '10', target: '12' },
          { source: '2', target: '12' },
          { source: '13', target: '14' },
          { source: '14', target: '15' },
          { source: '10', target: '3' },
          { source: '12', target: '7' },
          { source: '11', target: '5' }
        ],
        categories: [
          { name: '数据源' },
          { name: '分析模型' },
          { name: '业务报表' },
          { name: '数据仓库' },
          { name: '数据集市' }
        ],
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: isDark ? '#E2E8F0' : '#1E293B'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 2
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 4
          }
        },
        force: {
          repulsion: 220,
          edgeLength: 120,
          gravity: 0.1
        }
      }
    ]
  };

  // 新增: 堆叠面积图配置
  const stackedAreaChartOption = {
    title: {
      text: '数据调用量趋势分析',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: isDark ? '#334155' : '#6a7985'
        }
      }
    },
    legend: {
      data: ['基础数据', '业务数据', '外部数据', '分析模型', '元数据'],
      right: 10,
      top: 5
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      top: 50
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        axisLine: {
          lineStyle: {
            color: isDark ? '#475569' : '#CBD5E1'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: isDark ? 'rgba(51, 65, 85, 0.2)' : 'rgba(226, 232, 240, 0.5)'
          }
        }
      }
    ],
    series: [
      {
        name: '基础数据',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 190, 230, 310]
      },
      {
        name: '业务数据',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 410]
      },
      {
        name: '外部数据',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 230, 310]
      },
      {
        name: '分析模型',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 290, 230, 320]
      },
      {
        name: '元数据',
        type: 'line',
        stack: '总量',
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 832, 901, 934, 1290, 1330, 1420]
      }
    ]
  };

  // 新增: 雷达图配置
  const radarChartOption = {
    color: ['#2A6AFF', '#00C9A7', '#FFC542', '#FF6B6B'],
    title: {
      text: '数据能力评估',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    legend: {
      data: ['当前水平', '行业平均', '目标水平'],
      right: 10,
      top: 5
    },
    radar: [
      {
        indicator: [
          { text: '数据质量', max: 100 },
          { text: '数据安全', max: 100 },
          { text: '数据治理', max: 100 },
          { text: '数据服务', max: 100 },
          { text: '数据架构', max: 100 }
        ],
        center: ['50%', '50%'],
        radius: 130,
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        axisName: {
          formatter: '{value}',
          color: isDark ? '#E2E8F0' : '#1E293B'
        },
        splitArea: {
          areaStyle: {
            color: isDark 
              ? ['rgba(91, 138, 249, 0.05)', 'rgba(91, 138, 249, 0.1)', 'rgba(91, 138, 249, 0.15)', 'rgba(91, 138, 249, 0.2)']
              : ['rgba(42, 106, 255, 0.05)', 'rgba(42, 106, 255, 0.1)', 'rgba(42, 106, 255, 0.15)', 'rgba(42, 106, 255, 0.2)'],
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: isDark ? 'rgba(71, 85, 105, 0.8)' : 'rgba(203, 213, 225, 0.8)'
          }
        },
        splitLine: {
          lineStyle: {
            color: isDark ? 'rgba(71, 85, 105, 0.8)' : 'rgba(203, 213, 225, 0.8)'
          }
        }
      }
    ],
    series: [
      {
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [
          {
            value: [85, 90, 78, 82, 75],
            name: '当前水平',
            symbol: 'circle',
            symbolSize: 8,
            areaStyle: {
              color: isDark 
                ? new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: 'rgba(91, 138, 249, 0.1)',
                    offset: 0
                  },
                  {
                    color: 'rgba(91, 138, 249, 0.6)',
                    offset: 1
                  }
                ])
                : new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: 'rgba(42, 106, 255, 0.1)',
                    offset: 0
                  },
                  {
                    color: 'rgba(42, 106, 255, 0.6)',
                    offset: 1
                  }
                ])
            }
          },
          {
            value: [70, 75, 65, 73, 68],
            name: '行业平均',
            symbol: 'rect',
            symbolSize: 8,
            lineStyle: {
              type: 'dashed'
            }
          },
          {
            value: [95, 95, 90, 88, 92],
            name: '目标水平',
            areaStyle: {
              color: isDark 
                ? new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: 'rgba(0, 201, 167, 0.1)',
                    offset: 0
                  },
                  {
                    color: 'rgba(0, 201, 167, 0.6)',
                    offset: 1
                  }
                ])
                : new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                  {
                    color: 'rgba(0, 201, 167, 0.1)',
                    offset: 0
                  },
                  {
                    color: 'rgba(0, 201, 167, 0.6)',
                    offset: 1
                  }
                ])
            }
          }
        ]
      }
    ]
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Title level={3} style={{ margin: '0 0 16px 0' }}>数据资源门户</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="info" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">数据资产总量</Text>
              <Badge status="processing" />
            </StatHeader>
            <Statistic
              value={3856}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <DatabaseOutlined style={{ marginRight: 8 }} />
              <Text type="secondary">本月新增 265 条</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="success" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">数据模型</Text>
              <Badge status="success" />
            </StatHeader>
            <Statistic
              value={248}
              precision={0}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <ArrowUpOutlined style={{ color: '#00C9A7', marginRight: 8 }} />
              <Text type="secondary">较上月增长 15.2%</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="error" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">质量异常</Text>
              <Badge status="error" />
            </StatHeader>
            <Statistic
              value={23}
              precision={0}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <ArrowDownOutlined style={{ color: '#FF6B6B', marginRight: 8 }} />
              <Text type="secondary">较上月下降 8.5%</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="warning" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">数据表总数</Text>
              <Badge status="warning" />
            </StatHeader>
            <Statistic
              value={1465}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <AppstoreOutlined style={{ color: '#FFC542', marginRight: 8 }} />
              <Text type="secondary">含37个外部数据源</Text>
            </div>
          </StyledStatisticCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <ModernCard title="数据资产增长分析" hoverable>
            <ModernChart option={lineChartOption} height={350} />
          </ModernCard>
        </Col>
        <Col xs={24} md={12}>
          <ModernCard title="资产类型分布" hoverable>
            <ModernChart option={pieChartOption} height={350} />
          </ModernCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <NetworkGraphCard $isDark={isDark} hoverable>
            <div className="graph-title">
              <Title level={4}>数据血缘关系图</Title>
            </div>
            <ModernChart option={networkGraphOption} height={360} />
          </NetworkGraphCard>
        </Col>
        <Col xs={24} md={12}>
          <ModernCard title="数据质量评分" hoverable>
            <ModernChart option={barChartOption} height={360} />
          </ModernCard>
        </Col>
      </Row>

      {/* 新增堆叠面积图 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <ModernCard title="数据调用量趋势" hoverable>
            <ModernChart option={stackedAreaChartOption} height={350} />
          </ModernCard>
        </Col>
        <Col xs={24} md={12}>
          <ModernCard title="数据能力评估雷达图" hoverable>
            <ModernChart option={radarChartOption} height={350} />
          </ModernCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ModernCard hoverable>
            <Title level={4}>数据治理工具</Title>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <SearchOutlined style={{ fontSize: '32px', color: isDark ? '#5B8AF9' : '#2A6AFF' }} />
                  <div style={{ marginTop: '8px' }}>数据目录搜索</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <FileSearchOutlined style={{ fontSize: '32px', color: isDark ? '#18D2BA' : '#00C9A7' }} />
                  <div style={{ marginTop: '8px' }}>元数据管理</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <AimOutlined style={{ fontSize: '32px', color: isDark ? '#FFD662' : '#FFC542' }} />
                  <div style={{ marginTop: '8px' }}>数据质量监控</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <SafetyCertificateOutlined style={{ fontSize: '32px', color: isDark ? '#FF7A7A' : '#FF6B6B' }} />
                  <div style={{ marginTop: '8px' }}>访问权限管理</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <PartitionOutlined style={{ fontSize: '32px', color: isDark ? '#9D8AEA' : '#865CD6' }} />
                  <div style={{ marginTop: '8px' }}>数据分类分级</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <ApiOutlined style={{ fontSize: '32px', color: isDark ? '#FFA26B' : '#FF8C42' }} />
                  <div style={{ marginTop: '8px' }}>API管理</div>
                </div>
              </Col>
            </Row>
          </ModernCard>
        </Col>
      </Row>
    </Space>
  );
};

export default Dashboard;