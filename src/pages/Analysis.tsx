import React, { useState } from 'react';
import { Card, Space, Table, Tag, Radio, DatePicker, Typography, Row, Col, Tabs, Button, Select, Input, Divider, Tooltip, Badge, Statistic, Progress, Dropdown } from 'antd';
import type { TableColumnsType } from 'antd';
import {
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  RadarChartOutlined,
  RiseOutlined,
  FallOutlined,
  CloudDownloadOutlined,
  ReloadOutlined,
  FilterOutlined,
  SettingOutlined,
  GithubOutlined,
  QuestionCircleOutlined,
  DatabaseOutlined,
  FundProjectionScreenOutlined,
  ApartmentOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
  SearchOutlined,
  DownOutlined,
  CloudServerOutlined,
  CodeSandboxOutlined,
  NodeIndexOutlined,
  FormatPainterOutlined,
  ApiOutlined,
  ClusterOutlined,
  HddOutlined,
  ArrowUpOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../context/ThemeContext';
import ModernCard from '../components/ModernCard';
import ModernChart from '../components/ModernChart';

const { RangePicker } = DatePicker;

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableColumnsType<DataItem> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === '失败') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>查看详情</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const data: DataItem[] = [
  {
    key: '1',
    name: '数据分析模块',
    age: 32,
    address: '上海市浦东新区',
    tags: ['成功', '活跃'],
  },
  {
    key: '2',
    name: '用户管理模块',
    age: 42,
    address: '北京市朝阳区',
    tags: ['失败'],
  },
  {
    key: '3',
    name: '订单处理模块',
    age: 32,
    address: '广州市天河区',
    tags: ['成功', '处理中'],
  },
];

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// 自定义样式组件
const ActionButton = styled(Button)`
  border-radius: 6px;
  margin-right: 8px;
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

const StyledBadge = styled(Badge)<{ $type: string; $isDark: boolean }>`
  .ant-badge-status-dot {
    width: 8px;
    height: 8px;
  }
  .ant-badge-status-text {
    color: ${props => {
      if (props.$isDark) {
        if (props.$type === 'success') return '#18D2BA';
        if (props.$type === 'warning') return '#FFD662';
        if (props.$type === 'error') return '#FF7A7A';
        return '#5B8AF9';
      } else {
        if (props.$type === 'success') return '#00C9A7';
        if (props.$type === 'warning') return '#FFC542';
        if (props.$type === 'error') return '#FF6B6B';
        return '#2A6AFF';
      }
    }};
  }
`;

const FilterPanel = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(243, 244, 246, 0.7)'};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

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

const ModelCard = styled(ModernCard)<{ $isDark: boolean }>`
  height: 100%;
  
  .ant-card-body {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .model-icon {
    font-size: 24px;
    margin-bottom: 12px;
  }
  
  .model-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .model-stats {
    margin-top: auto;
    padding-top: 12px;
  }
`;

const BigDataAnalysis: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const [activeTab, setActiveTab] = useState('1');
  // 自定义分析模型数据
  const analysisModels = [
    { key: '1', name: '用户行为预测', type: '机器学习', description: '基于历史行为数据预测用户未来行为趋势', icon: <RiseOutlined style={{ color: '#2A6AFF' }} /> },
    { key: '2', name: '异常检测模型', type: '深度学习', description: '检测数据中的异常值和模式', icon: <ThunderboltOutlined style={{ color: '#FF6B6B' }} /> },
    { key: '3', name: '推荐引擎', type: '机器学习', description: '基于用户兴趣和历史行为推荐相关内容', icon: <AppstoreOutlined style={{ color: '#00C9A7' }} /> },
    { key: '4', name: '大规模图数据处理', type: 'Spark+Hadoop', description: '分布式处理TB级图结构数据，支持图计算和图挖掘', icon: <ClusterOutlined style={{ color: '#FFC542' }} /> },
    { key: '5', name: '实时流处理平台', type: 'Flink+Kafka', description: '处理高速数据流，支持实时统计、事件检测和复杂事件处理', icon: <NodeIndexOutlined style={{ color: '#865CD6' }} /> },
    { key: '6', name: 'OLAP数据分析引擎', type: 'ClickHouse+Doris', description: '支持在TB和PB级数据上的交互式多维分析和快速查询', icon: <HddOutlined style={{ color: '#FF9A45' }} /> },
    { key: '7', name: '自然语言处理', type: 'NLP', description: '分析文本内容中的情感倾向、实体识别和文本分类', icon: <FundProjectionScreenOutlined style={{ color: '#FF9A45' }} /> },
    { key: '8', name: '时间序列分析', type: '时间序列', description: '基于历史数据预测未来趋势和模式，支持异常检测', icon: <LineChartOutlined style={{ color: '#FFD662' }} /> },
    { key: '9', name: '代码自动生成器', type: '自动生成', description: '自动生成SQL查询代码和分析脚本，以及各种框架的ETL代码', icon: <CodeSandboxOutlined style={{ color: '#5B8AF9' }} /> },
  ];

  // 散点图配置
  const scatterOption = {
    title: {
      text: '多维度用户行为分析',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    xAxis: {},
    yAxis: {},
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return `年龄: ${params.data[0]}<br/>使用时长: ${params.data[1]}分钟<br/>活跃度: ${params.data[2]}`;
      }
    },
    series: [
      {
        symbolSize: function (data: number[]) {
          return Math.sqrt(data[2]) * 5;
        },
        data: [
          [10.0, 8.04, 9.01],
          [8.0, 6.95, 7.7],
          [13.0, 7.58, 12.6],
          [9.0, 8.81, 8.8],
          [11.0, 8.33, 10.5],
          [14.0, 9.96, 13.8],
          [6.0, 7.24, 6.3],
          [4.0, 4.26, 4.0],
          [12.0, 10.84, 11.9],
          [7.0, 4.82, 6.1],
          [5.0, 5.68, 5.2]
        ],
        type: 'scatter'
      }
    ]
  };

  // 添加漏斗图配置
  const funnelOption = {
    title: {
      text: '用户行为转化漏斗',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    legend: {
      data: ['展示', '点击', '访问', '咨询', '下单'],
      top: 'bottom'
    },
    series: [
      {
        name: '漏斗',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: isDark ? '#1E293B' : '#FFFFFF',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 14
          }
        },
        data: [
          { value: 100, name: '展示' },
          { value: 80, name: '点击' },
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '下单' }
        ]
      }
    ]
  };

  // 添加雷达图配置
  const radarOption = {
    title: {
      text: '多维度数据质量评分',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: ['当前项目', '行业平均', '标杆项目'],
      right: 10,
      top: 5
    },
    radar: {
      indicator: [
        { name: '完整性', max: 100 },
        { name: '一致性', max: 100 },
        { name: '准确性', max: 100 },
        { name: '时效性', max: 100 },
        { name: '有效性', max: 100 }
      ],
      radius: '60%',
      splitNumber: 5,
      axisName: {
        color: isDark ? '#CBD5E1' : '#475569'
      },
      splitArea: {
        areaStyle: {
          color: isDark 
          ? ['rgba(51, 65, 85, 0.02)', 'rgba(51, 65, 85, 0.05)', 'rgba(51, 65, 85, 0.08)', 'rgba(51, 65, 85, 0.1)']
          : ['rgba(240, 249, 255, 0.5)', 'rgba(224, 242, 254, 0.5)', 'rgba(186, 230, 253, 0.5)', 'rgba(125, 211, 252, 0.5)']
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [85, 78, 92, 80, 88],
            name: '当前项目',
            symbol: 'circle',
            symbolSize: 8,
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
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
            value: [70, 72, 78, 75, 68],
            name: '行业平均',
            symbol: 'rect',
            symbolSize: 6,
            lineStyle: {
              type: 'dashed'
            }
          },
          {
            value: [95, 92, 97, 90, 94],
            name: '标杆项目',
            symbol: 'diamond',
            symbolSize: 8,
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
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

  // 添加箱线图配置
  const boxplotOption = {
    title: {
      text: '各部门数据质量分布',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: ['研发部', '销售部', '财务部', '市场部', '客服部'],
      boundaryGap: true,
      nameGap: 30,
      axisLabel: {
        formatter: '{value}'
      },
      splitArea: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '数据质量分数',
      min: 40,
      max: 100,
      splitArea: {
        show: true
      }
    },
    series: [
      {
        name: '箱线图',
        type: 'boxplot',
        datasetIndex: 1,
        tooltip: {
          formatter: function(param) {
            return [
              param.name + '：',
              '最大值: ' + param.data[5],
              '上四分位: ' + param.data[4],
              '中位数: ' + param.data[3],
              '下四分位: ' + param.data[2],
              '最小值: ' + param.data[1]
            ].join('<br/>'); 
          }
        },
        data: [
          [65, 72, 85, 95, 98],
          [55, 68, 75, 85, 90],
          [60, 70, 80, 88, 95],
          [50, 65, 77, 89, 95],
          [45, 60, 75, 84, 90]
        ],
        itemStyle: {
          borderColor: function(seriesIndex) {
            const colors = isDark 
              ? ['#5B8AF9', '#18D2BA', '#FFD662', '#FF7A7A', '#9D8AEA'] 
              : ['#2A6AFF', '#00C9A7', '#FFC542', '#FF6B6B', '#865CD6'];
            return colors[seriesIndex.dataIndex % colors.length];
          }
        }
      }
    ]
  };
  
  // 热力图选项
  const heatmapOption = {
    title: {
      text: '平台访问热力分布',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'],
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: ['周六', '周五', '周四', '周三', '周二', '周一', '周日'],
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%'
    },
    series: [
      {
        name: '访问量',
        type: 'heatmap',
        data: [
          // 生成随机数据
          ...Array.from({ length: 7 }, (_, i) => 
            Array.from({ length: 24 }, (_, j) => [j, i, Math.round(Math.random() * 10)])
          ).flat()
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <div style={{ marginBottom: '24px' }}>
        <Row align="middle" gutter={[24, 0]}>
          <Col>
            <Title level={3} style={{ margin: 0 }}>大数据分析中心</Title>
          </Col>
          <Col>
            <Space>
              <Tag color="blue" icon={<CloudServerOutlined />}>分布式处理</Tag>
              <Tag color="green" icon={<ThunderboltOutlined />}>实时计算</Tag>
              <Tag color="purple" icon={<ApiOutlined />}>算法库</Tag>
              <Tag color="orange" icon={<FileSearchOutlined />}>数据挖掘</Tag>
            </Space>
          </Col>
        </Row>
        <Paragraph type="secondary" style={{ marginTop: '8px' }}>
          企业级分布式大数据处理平台，集成数据存储、计算、查询与分析能力，支持PB级数据实时处理与复杂分析模型应用。
        </Paragraph>
      </div>
      
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <FilterPanel $isDark={isDark}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={5}>
                <Input
                  placeholder="搜索分析模型或数据源"
                  prefix={<SearchOutlined />}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xs={24} md={5}>
                <Select 
                  placeholder="选择数据源" 
                  style={{ width: '100%' }}
                  defaultValue="all"
                >
                  <Option value="all">全部数据源</Option>
                  <Option value="user">用户行为数据</Option>
                  <Option value="sales">销售数据</Option>
                  <Option value="market">市场数据</Option>
                  <Option value="financial">财务数据</Option>
                </Select>
              </Col>
              <Col xs={24} md={5}>
                <Select 
                  placeholder="选择时间范围" 
                  style={{ width: '100%' }}
                  defaultValue="30d"
                >
                  <Option value="7d">近7天</Option>
                  <Option value="30d">近30天</Option>
                  <Option value="90d">近90天</Option>
                  <Option value="365d">近1年</Option>
                  <Option value="custom">自定义范围</Option>
                </Select>
              </Col>
              <Col xs={24} md={5}>
                <DatePicker.RangePicker style={{ width: '100%' }} />
              </Col>
              <Col xs={24} md={4} style={{ textAlign: 'right' }}>
                <Space>
                  <ActionButton type="primary" icon={<FilterOutlined />}>应用筛选</ActionButton>
                  <ActionButton icon={<ReloadOutlined />}>重置</ActionButton>
                </Space>
              </Col>
            </Row>
          </FilterPanel>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="info" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">数据总量</Text>
              <Badge status="processing" />
            </StatHeader>
            <Statistic
              value={2586}
              suffix="GB"
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <DatabaseOutlined style={{ color: isDark ? '#5B8AF9' : '#2A6AFF', marginRight: 8 }} />
              <Text type="secondary">已使用85%存储空间</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="success" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">活跃模型</Text>
              <Badge status="success" />
            </StatHeader>
            <Statistic
              value={18}
              suffix="个"
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <ArrowUpOutlined style={{ color: '#00C9A7', marginRight: 8 }} />
              <Text type="secondary">较上月增长3个</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="warning" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">计算耗时</Text>
              <Badge status="warning" />
            </StatHeader>
            <Statistic
              value={1.85}
              suffix="秒/查询"
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <ThunderboltOutlined style={{ color: '#FFC542', marginRight: 8 }} />
              <Text type="secondary">峰值时间3.2秒</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="error" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">每日API调用</Text>
              <Badge status="error" />
            </StatHeader>
            <Statistic
              value={152673}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <LineChartOutlined style={{ color: '#FF6B6B', marginRight: 8 }} />
              <Text type="secondary">实时监控中</Text>
            </div>
          </StyledStatisticCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ModernCard hoverable>
            <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
              <TabPane tab="可视化分析" key="1">
                <div style={{ padding: '16px 0' }}>
                  <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Row gutter={[24, 24]}>
                      <Col xs={24} md={12}>
                        <ModernCard hoverable>
                          <ModernChart option={scatterOption} height={350} />
                        </ModernCard>
                      </Col>
                      <Col xs={24} md={12}>
                        <ModernCard hoverable>
                          <ModernChart option={funnelOption} height={350} />
                        </ModernCard>
                      </Col>
                    </Row>
                    
                    <Row gutter={[24, 24]}>
                      <Col xs={24} md={12}>
                        <ModernCard hoverable>
                          <ModernChart option={radarOption} height={350} />
                        </ModernCard>
                      </Col>
                      <Col xs={24} md={12}>
                        <ModernCard hoverable>
                          <ModernChart option={boxplotOption} height={350} />
                        </ModernCard>
                      </Col>
                    </Row>
                    
                    <Row gutter={[24, 24]}>
                      <Col span={24}>
                        <ModernCard hoverable>
                          <ModernChart option={heatmapOption} height={350} />
                        </ModernCard>
                      </Col>
                    </Row>
                  </Space>
                </div>
              </TabPane>
              
              <TabPane tab="分析模型管理" key="2">
                <div style={{ padding: '16px 0' }}>
                  <Row gutter={[24, 24]}>
                    <Col span={24}>
                      <Space style={{ marginBottom: 16 }}>
                        <Button type="primary" icon={<AppstoreOutlined />}>创建新模型</Button>
                        <Button icon={<SettingOutlined />}>批量管理</Button>
                        <Button icon={<CloudDownloadOutlined />}>导出列表</Button>
                      </Space>
                      <Divider style={{ margin: '16px 0' }} />
                    </Col>
                  </Row>
                  
                  <Row gutter={[24, 24]}>
                    {analysisModels.map(model => (
                      <Col xs={24} sm={12} md={8} key={model.key}>
                        <ModelCard hoverable $isDark={isDark}>
                          <div className="model-icon">{model.icon}</div>
                          <div className="model-title">{model.name}</div>
                          <Tag color={isDark ? 'rgba(91, 138, 249, 0.2)' : 'rgba(42, 106, 255, 0.1)'} style={{ marginBottom: 8 }}>
                            {model.type}
                          </Tag>
                          <Text type="secondary">{model.description}</Text>
                          
                          <div className="model-stats">
                            <Divider style={{ margin: '12px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Space>
                                <Badge status="success" />
                                <Text type="secondary">运行状态: <Text strong>正常</Text></Text>
                              </Space>
                              <Dropdown menu={{ items: [
                                { key: '1', label: '运行模型' },
                                { key: '2', label: '编辑参数' },
                                { key: '3', label: '查看结果' },
                                { key: '4', label: '导出模型' },
                                { key: '5', label: '删除模型' }
                              ] }} trigger={['click']}>
                                <Button size="small" type="text" icon={<SettingOutlined />}></Button>
                              </Dropdown>
                            </div>
                            <div style={{ marginTop: 8 }}>
                              <Text type="secondary">最近运行: 3小时前 | 平均响应: 1.2秒</Text>
                            </div>
                          </div>
                        </ModelCard>
                      </Col>
                    ))}
                  </Row>
                </div>
              </TabPane>
              
              <TabPane tab="数据集成" key="3">
                <div style={{ padding: '16px 0' }}>
                  <ModernCard title="数据连接与分布式计算集群" hoverable extra={<Button type="link" icon={<SearchOutlined />}>查看集群状态</Button>}>
                    <Row gutter={[24, 24]}>
                      <Col xs={24} md={8}>
                        <Card title="数据来源" bordered={false}>
                          <div style={{ marginBottom: 16 }}>
                            <StyledBadge status="success" text="MySQL数据库" $type="success" $isDark={isDark} />
                            <div style={{ marginTop: 8 }}>
                              <Text type="secondary">172.18.0.15:3306</Text>
                              <div>
                                <Tag color="green">已连接</Tag>
                                <Tag color="blue">主数据源</Tag>
                              </div>
                            </div>
                          </div>
                          <div style={{ marginBottom: 16 }}>
                            <StyledBadge status="success" text="PostgreSQL" $type="success" $isDark={isDark} />
                            <div style={{ marginTop: 8 }}>
                              <Text type="secondary">172.18.0.22:5432</Text>
                              <div>
                                <Tag color="green">已连接</Tag>
                              </div>
                            </div>
                          </div>
                          <div>
                            <StyledBadge status="error" text="MongoDB" $type="error" $isDark={isDark} />
                            <div style={{ marginTop: 8 }}>
                              <Text type="secondary">172.18.0.30:27017</Text>
                              <div>
                                <Tag color="red">连接失败</Tag>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                      <Col xs={24} md={8}>
                        <Card title="数据同步状态" bordered={false}>
                          <div style={{ marginBottom: 16 }}>
                            <Text>用户数据</Text>
                            <Progress percent={100} size="small" status="success" />
                          </div>
                          <div style={{ marginBottom: 16 }}>
                            <Text>订单数据</Text>
                            <Progress percent={100} size="small" status="success" />
                          </div>
                          <div style={{ marginBottom: 16 }}>
                            <Text>产品数据</Text>
                            <Progress percent={75} size="small" status="active" />
                          </div>
                          <div>
                            <Text>日志数据</Text>
                            <Progress percent={45} size="small" status="exception" />
                          </div>
                        </Card>
                      </Col>
                      <Col xs={24} md={8}>
                        <Card title="同步日志" bordered={false}>
                          <div style={{ height: 180, overflowY: 'auto' }}>
                            <div style={{ marginBottom: 8 }}>
                              <Text type="secondary">[2023-06-15 08:30:22]</Text>
                              <div>用户数据同步完成，共同步 12,458 条记录</div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              <Text type="secondary">[2023-06-15 08:25:17]</Text>
                              <div>订单数据同步完成，共同步 5,872 条记录</div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              <Text type="secondary">[2023-06-15 08:15:02]</Text>
                              <div>产品数据同步进行中，已完成 75%</div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              <Text type="secondary">[2023-06-15 08:10:45]</Text>
                              <div>日志数据同步遇到错误：连接超时</div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                              <Text type="secondary">[2023-06-15 08:00:00]</Text>
                              <div>开始每日数据同步任务</div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </ModernCard>
                  
                  <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                    <Col span={24}>
                      <ModernCard title="大数据生态体系" hoverable>
                        <Row gutter={[24, 24]}>
                          <Col xs={24} md={8}>
                            <Card title="数据源层" bordered={false}>
                              <Space direction="vertical" style={{ width: '100%' }}>
                                <Badge status="processing" text="支持接入超过50种数据源类型" />
                                <div style={{ marginTop: 8 }}>
                                  <Tag color="blue">结构化数据库</Tag>
                                  <Tag color="blue">NoSQL</Tag>
                                  <Tag color="blue">全文索引</Tag>
                                  <Tag color="blue">日志文件</Tag>
                                  <Tag color="blue">API</Tag>
                                </div>
                              </Space>
                            </Card>
                          </Col>
                          <Col xs={24} md={8}>
                            <Card title="存储计算层" bordered={false}>
                              <Space direction="vertical" style={{ width: '100%' }}>
                                <Badge status="processing" text="高性能并行计算与存储引擎" />
                                <div style={{ marginTop: 8 }}>
                                  <Tag color="green">HDFS</Tag>
                                  <Tag color="green">Spark</Tag>
                                  <Tag color="green">Flink</Tag>
                                  <Tag color="green">Hive</Tag>
                                  <Tag color="green">Hadoop</Tag>
                                </div>
                              </Space>
                            </Card>
                          </Col>
                          <Col xs={24} md={8}>
                            <Card title="应用服务层" bordered={false}>
                              <Space direction="vertical" style={{ width: '100%' }}>
                                <Badge status="processing" text="面向业务的分析能力与服务接口" />
                                <div style={{ marginTop: 8 }}>
                                  <Tag color="purple">分析API</Tag>
                                  <Tag color="purple">可视化</Tag>
                                  <Tag color="purple">机器学习</Tag>
                                  <Tag color="purple">算法库</Tag>
                                  <Tag color="purple">数据收集</Tag>
                                </div>
                              </Space>
                            </Card>
                          </Col>
                        </Row>
                      </ModernCard>
                    </Col>
                  </Row>
                </div>
              </TabPane>
              
              <TabPane tab="数据详情" key="4">
                <div style={{ padding: '16px 0' }}>
                  <ModernCard hoverable title="数据处理查询结果" extra={<Space>
                      <Button type="primary" size="small" icon={<CloudDownloadOutlined />}>导出</Button>
                      <Button size="small" icon={<ReloadOutlined />}>刷新</Button>
                    </Space>}>
                    
                    <Row gutter={[24, 24]} style={{ marginBottom: 16 }}>
                      <Col span={24}>
                        <Input.TextArea 
                          placeholder="在此处输入SQL查询或自然语言描述您的分析需求" 
                          autoSize={{ minRows: 3, maxRows: 6 }}
                          value="SELECT department, AVG(processing_time) as avg_time, COUNT(*) as total FROM data_analysis_records WHERE status = 'success' GROUP BY department ORDER BY avg_time DESC;"
                        />
                        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                          <Space>
                            <Button type="primary">执行查询</Button>
                            <Button>开始新查询</Button>
                          </Space>
                          <Text type="secondary">上次查询时间: 2023-06-15 15:30:22 | 耗时: 1.2秒</Text>
                        </div>
                      </Col>
                    </Row>
                    
                    <Table 
                      columns={columns} 
                      dataSource={data} 
                      pagination={{ pageSize: 10 }}
                      bordered
                    />
                    
                    <div style={{ marginTop: 16, background: isDark ? 'rgba(30, 41, 59, 0.2)' : 'rgba(243, 244, 246, 0.5)', padding: 12, borderRadius: 8 }}>
                      <Title level={5}>智能推荐</Title>
                      <ul style={{ paddingLeft: 20 }}>
                        <li>
                          <Text>可以添加<Text code>WHERE processing_time &gt; 30</Text>条件来筛选耗时长的处理记录</Text>
                        </li>
                        <li>
                          <Text>尝试按<Text code>success_rate</Text>字段进行排序可能会发现更有价值的洞见</Text>
                        </li>
                        <li>
                          <Text>对该数据应用<Text code>trend_analysis()</Text>函数可以发现季度性模式</Text>
                        </li>
                      </ul>
                    </div>
                  </ModernCard>
                </div>
              </TabPane>
            </Tabs>
          </ModernCard>
        </Col>
      </Row>
    </Space>
  );
};

export default BigDataAnalysis;