import React, { useState } from 'react';
import { Row, Col, Statistic, Typography, Space, Badge, Divider, Card, Tabs, Table, Progress, Tag } from 'antd';
import { 
  SafetyCertificateOutlined, 
  FileSearchOutlined, 
  ApartmentOutlined, 
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PartitionOutlined,
  SolutionOutlined,
  TeamOutlined,
  TagsOutlined,
  AuditOutlined,
  ExceptionOutlined,
  SyncOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import ModernCard from '../components/ModernCard';
import ModernChart from '../components/ModernChart';
import { useTheme } from '../context/ThemeContext';
import * as echarts from 'echarts';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

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

const QualityTaskCard = styled(ModernCard)<{ $isDark: boolean }>`
  .quality-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid ${props => props.$isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.8)'};
  }
  
  .quality-item:last-child {
    border-bottom: none;
  }
  
  .quality-title {
    display: flex;
    align-items: center;
  }
  
  .quality-icon {
    margin-right: 12px;
    font-size: 16px;
  }
  
  .task-status {
    display: flex;
    align-items: center;
  }
  
  .status-tag {
    margin-left: 8px;
  }
`;

const DataGovernance: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const [activeTab, setActiveTab] = useState('1');

  // 折线图配置 - 数据质量趋势
  const lineChartOption = {
    title: {
      text: '数据质量趋势',
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
      data: ['完整性', '准确性', '一致性', '及时性'],
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
      max: 100,
      splitLine: {
        lineStyle: {
          color: isDark ? 'rgba(51, 65, 85, 0.2)' : 'rgba(226, 232, 240, 0.5)'
        }
      }
    },
    series: [
      {
        name: '完整性',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [82, 85, 86, 88, 90, 91, 92]
      },
      {
        name: '准确性',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [78, 80, 82, 84, 85, 86, 88]
      },
      {
        name: '一致性',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [75, 76, 78, 82, 84, 85, 86]
      },
      {
        name: '及时性',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [85, 86, 88, 89, 90, 92, 94]
      }
    ]
  };

  // 饼图配置 - 元数据分布
  const pieChartOption = {
    title: {
      text: '元数据分布',
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
        name: '元数据类型',
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
          { value: 735, name: '数据接口' },
          { value: 580, name: '数据资产' },
          { value: 484, name: '字典数据' },
          { value: 380, name: '规则定义' }
        ]
      }
    ]
  };

  // 雷达图配置 - 数据标准评估
  const radarChartOption = {
    color: ['#2A6AFF', '#00C9A7', '#FFC542', '#FF6B6B'],
    title: {
      text: '数据标准评估',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      top: 5,
      left: 10
    },
    legend: {
      data: ['当前水平', '目标水平'],
      right: 10,
      top: 5
    },
    radar: [
      {
        indicator: [
          { text: '命名标准', max: 100 },
          { text: '数据规范', max: 100 },
          { text: '标准落地', max: 100 },
          { text: '标准执行度', max: 100 },
          { text: '标准覆盖率', max: 100 }
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
            value: [85, 80, 78, 82, 76],
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
            value: [95, 96, 90, 92, 95],
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

  // 治理任务列表数据
  const taskColumns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '负责部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = 'blue';
        if (priority === '高') {
          color = 'red';
        } else if (priority === '中') {
          color = 'orange';
        }
        return <Tag color={color}>{priority}</Tag>;
      }
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => <Progress percent={progress} size="small" />
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        let icon = <CheckCircleOutlined />;
        if (status === '待启动') {
          color = 'default';
          icon = <ClockCircleOutlined />;
        } else if (status === '进行中') {
          color = 'processing';
          icon = <SyncOutlined spin />;
        } else if (status === '已暂停') {
          color = 'warning';
          icon = <ExceptionOutlined />;
        }
        return <Tag icon={icon} color={color}>{status}</Tag>;
      }
    }
  ];

  const taskData = [
    {
      key: '1',
      name: '客户数据质量整改',
      department: '数据质量部',
      priority: '高',
      startDate: '2023-07-15',
      progress: 85,
      status: '进行中',
    },
    {
      key: '2',
      name: '主数据标准实施',
      department: '数据标准部',
      priority: '高',
      startDate: '2023-08-01',
      progress: 65,
      status: '进行中',
    },
    {
      key: '3',
      name: '元数据管理平台上线',
      department: '数据治理办公室',
      priority: '中',
      startDate: '2023-09-10',
      progress: 40,
      status: '进行中',
    },
    {
      key: '4',
      name: '数据安全风险评估',
      department: '数据安全部',
      priority: '中',
      startDate: '2023-10-01',
      progress: 20,
      status: '进行中',
    },
    {
      key: '5',
      name: '数据生命周期管理',
      department: '技术架构部',
      priority: '低',
      startDate: '2023-11-15',
      progress: 0,
      status: '待启动',
    },
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Title level={3} style={{ margin: '0 0 16px 0' }}>数据治理中心</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="info" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">数据标准数</Text>
              <Badge status="processing" />
            </StatHeader>
            <Statistic
              value={356}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <ApartmentOutlined style={{ marginRight: 8 }} />
              <Text type="secondary">本季度新增 42 项</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="success" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">数据质量分</Text>
              <Badge status="success" />
            </StatHeader>
            <Statistic
              value={87.5}
              precision={1}
              valueStyle={{ fontSize: 28 }}
              suffix="%"
            />
            <div className="indicator">
              <SafetyCertificateOutlined style={{ color: '#00C9A7', marginRight: 8 }} />
              <Text type="secondary">较上月提升 2.3%</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="error" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">问题数据总量</Text>
              <Badge status="error" />
            </StatHeader>
            <Statistic
              value={438}
              precision={0}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <AlertOutlined style={{ color: '#FF6B6B', marginRight: 8 }} />
              <Text type="secondary">较上月减少 127 条</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="warning" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">元数据覆盖率</Text>
              <Badge status="warning" />
            </StatHeader>
            <Statistic
              value={76.2}
              precision={1}
              valueStyle={{ fontSize: 28 }}
              suffix="%"
            />
            <div className="indicator">
              <FileSearchOutlined style={{ color: '#FFC542', marginRight: 8 }} />
              <Text type="secondary">目标 95%</Text>
            </div>
          </StyledStatisticCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <ModernCard hoverable>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="数据治理概览" key="1">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <ModernCard title="数据质量趋势" hoverable>
                      <ModernChart option={lineChartOption} height={350} />
                    </ModernCard>
                  </Col>
                  <Col xs={24} md={12}>
                    <ModernCard title="元数据分布" hoverable>
                      <ModernChart option={pieChartOption} height={350} />
                    </ModernCard>
                  </Col>
                </Row>
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                  <Col xs={24} md={12}>
                    <ModernCard title="数据标准评估" hoverable>
                      <ModernChart option={radarChartOption} height={350} />
                    </ModernCard>
                  </Col>
                  <Col xs={24} md={12}>
                    <QualityTaskCard title="数据质量检查任务" hoverable $isDark={isDark}>
                      <div className="quality-item">
                        <div className="quality-title">
                          <CheckCircleOutlined className="quality-icon" style={{ color: '#00C9A7' }} />
                          <div>
                            <Text strong>客户数据完整性检查</Text>
                            <div><Text type="secondary">每日自动执行，检查客户信息完整性</Text></div>
                          </div>
                        </div>
                        <div className="task-status">
                          <Progress type="circle" percent={100} width={40} />
                          <Tag color="success" className="status-tag">已完成</Tag>
                        </div>
                      </div>
                      <div className="quality-item">
                        <div className="quality-title">
                          <CheckCircleOutlined className="quality-icon" style={{ color: '#00C9A7' }} />
                          <div>
                            <Text strong>订单数据一致性检查</Text>
                            <div><Text type="secondary">每日自动执行，校验订单数据与支付数据一致性</Text></div>
                          </div>
                        </div>
                        <div className="task-status">
                          <Progress type="circle" percent={100} width={40} />
                          <Tag color="success" className="status-tag">已完成</Tag>
                        </div>
                      </div>
                      <div className="quality-item">
                        <div className="quality-title">
                          <ClockCircleOutlined className="quality-icon" style={{ color: '#5B8AF9' }} />
                          <div>
                            <Text strong>产品数据准确性检查</Text>
                            <div><Text type="secondary">每周一执行，验证产品数据与实际库存一致性</Text></div>
                          </div>
                        </div>
                        <div className="task-status">
                          <Progress type="circle" percent={85} width={40} />
                          <Tag color="processing" className="status-tag">进行中</Tag>
                        </div>
                      </div>
                      <div className="quality-item">
                        <div className="quality-title">
                          <AlertOutlined className="quality-icon" style={{ color: '#FF6B6B' }} />
                          <div>
                            <Text strong>供应商数据检查</Text>
                            <div><Text type="secondary">每月执行，检查供应商资质与合同有效性</Text></div>
                          </div>
                        </div>
                        <div className="task-status">
                          <Progress type="circle" percent={35} width={40} />
                          <Tag color="warning" className="status-tag">异常</Tag>
                        </div>
                      </div>
                      <div className="quality-item">
                        <div className="quality-title">
                          <ClockCircleOutlined className="quality-icon" style={{ color: '#FFC542' }} />
                          <div>
                            <Text strong>用户行为数据清洗</Text>
                            <div><Text type="secondary">每周日执行，清洗无效用户行为数据</Text></div>
                          </div>
                        </div>
                        <div className="task-status">
                          <Progress type="circle" percent={0} width={40} />
                          <Tag color="default" className="status-tag">待执行</Tag>
                        </div>
                      </div>
                    </QualityTaskCard>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="治理任务" key="2">
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <ModernCard title="数据治理任务列表" hoverable>
                      <Table 
                        columns={taskColumns} 
                        dataSource={taskData} 
                        pagination={{ pageSize: 10 }}
                      />
                    </ModernCard>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="数据标准" key="3">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={8}>
                    <ModernCard title="数据标准体系" hoverable>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Card size="small">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TagsOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#2A6AFF' }} />
                            <div>
                              <Text strong>命名标准</Text>
                              <div><Text type="secondary">统一数据库、表、字段命名规范</Text></div>
                            </div>
                          </div>
                        </Card>
                        <Card size="small">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <PartitionOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#00C9A7' }} />
                            <div>
                              <Text strong>数据分类分级</Text>
                              <div><Text type="secondary">数据分类与安全级别划分标准</Text></div>
                            </div>
                          </div>
                        </Card>
                        <Card size="small">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ApartmentOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#FFC542' }} />
                            <div>
                              <Text strong>主数据标准</Text>
                              <div><Text type="secondary">客户、产品等主数据定义标准</Text></div>
                            </div>
                          </div>
                        </Card>
                        <Card size="small">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AuditOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#FF6B6B' }} />
                            <div>
                              <Text strong>数据质量标准</Text>
                              <div><Text type="secondary">数据完整性、准确性、一致性规范</Text></div>
                            </div>
                          </div>
                        </Card>
                        <Card size="small">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SolutionOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#865CD6' }} />
                            <div>
                              <Text strong>元数据标准</Text>
                              <div><Text type="secondary">元数据采集与管理规范</Text></div>
                            </div>
                          </div>
                        </Card>
                      </Space>
                    </ModernCard>
                  </Col>
                  <Col xs={24} md={16}>
                    <ModernCard title="标准执行情况" hoverable>
                      <Table 
                        columns={[
                          {
                            title: '标准名称',
                            dataIndex: 'name',
                            key: 'name',
                          },
                          {
                            title: '发布日期',
                            dataIndex: 'publishDate',
                            key: 'publishDate',
                          },
                          {
                            title: '责任部门',
                            dataIndex: 'department',
                            key: 'department',
                          },
                          {
                            title: '执行率',
                            dataIndex: 'implementRate',
                            key: 'implementRate',
                            render: (rate: number) => {
                              let color = 'green';
                              if (rate < 60) {
                                color = 'red';
                              } else if (rate < 80) {
                                color = 'orange';
                              }
                              return <Progress percent={rate} size="small" strokeColor={color} />;
                            }
                          },
                          {
                            title: '状态',
                            dataIndex: 'status',
                            key: 'status',
                            render: (status: string) => {
                              let color = 'green';
                              if (status === '待执行') {
                                color = 'default';
                              } else if (status === '执行中') {
                                color = 'processing';
                              }
                              return <Tag color={color}>{status}</Tag>;
                            }
                          }
                        ]} 
                        dataSource={[
                          {
                            key: '1',
                            name: '客户主数据标准V2.0',
                            publishDate: '2023-01-10',
                            department: '数据标准部',
                            implementRate: 92,
                            status: '已完成',
                          },
                          {
                            key: '2',
                            name: '产品数据命名规范',
                            publishDate: '2023-03-15',
                            department: '产品部',
                            implementRate: 85,
                            status: '执行中',
                          },
                          {
                            key: '3',
                            name: '交易数据质量标准',
                            publishDate: '2023-05-20',
                            department: '业务运营部',
                            implementRate: 78,
                            status: '执行中',
                          },
                          {
                            key: '4',
                            name: '供应链数据标准',
                            publishDate: '2023-07-05',
                            department: '供应链部',
                            implementRate: 65,
                            status: '执行中',
                          },
                          {
                            key: '5',
                            name: '数据安全分级标准',
                            publishDate: '2023-09-18',
                            department: '信息安全部',
                            implementRate: 50,
                            status: '执行中',
                          },
                          {
                            key: '6',
                            name: '元数据管理规范',
                            publishDate: '2023-11-01',
                            department: '技术架构部',
                            implementRate: 30,
                            status: '执行中',
                          },
                        ]} 
                        pagination={{ pageSize: 6 }}
                      />
                    </ModernCard>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
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
                  <SafetyCertificateOutlined style={{ fontSize: '32px', color: isDark ? '#5B8AF9' : '#2A6AFF' }} />
                  <div style={{ marginTop: '8px' }}>数据质量监控</div>
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
                  <ApartmentOutlined style={{ fontSize: '32px', color: isDark ? '#FFD662' : '#FFC542' }} />
                  <div style={{ marginTop: '8px' }}>标准管理</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <TagsOutlined style={{ fontSize: '32px', color: isDark ? '#FF7A7A' : '#FF6B6B' }} />
                  <div style={{ marginTop: '8px' }}>数据分类分级</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <TeamOutlined style={{ fontSize: '32px', color: isDark ? '#9D8AEA' : '#865CD6' }} />
                  <div style={{ marginTop: '8px' }}>数据责任制</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <SolutionOutlined style={{ fontSize: '32px', color: isDark ? '#FFA26B' : '#FF8C42' }} />
                  <div style={{ marginTop: '8px' }}>数据生命周期</div>
                </div>
              </Col>
            </Row>
          </ModernCard>
        </Col>
      </Row>
    </Space>
  );
};

export default DataGovernance; 