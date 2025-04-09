import React, { useState } from 'react';
import { Row, Col, Statistic, Typography, Space, Badge, Divider, Input, Button, Table, Tabs, Select } from 'antd';
import { 
  DatabaseOutlined, 
  TableOutlined, 
  BarChartOutlined, 
  SyncOutlined, 
  ClockCircleOutlined,
  WarningOutlined,
  CodeOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  ApiOutlined,
  ReloadOutlined,
  LockOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import ModernCard from '../components/ModernCard';
import ModernChart from '../components/ModernChart';
import { useTheme } from '../context/ThemeContext';
import * as echarts from 'echarts';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

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

const SQLEditorCard = styled(ModernCard)<{ $isDark: boolean }>`
  .sql-editor {
    width: 100%;
    min-height: 200px;
    margin-bottom: 16px;
    font-family: 'Courier New', Courier, monospace;
    background-color: ${props => props.$isDark ? '#1E293B' : '#F8FAFC'};
    color: ${props => props.$isDark ? '#E2E8F0' : '#1E293B'};
    border: 1px solid ${props => props.$isDark ? '#334155' : '#E2E8F0'};
    border-radius: 6px;
    padding: 12px;
    resize: vertical;
  }

  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .result-container {
    margin-top: 16px;
  }
`;

const TableStructureTree = styled.div<{ $isDark: boolean }>`
  padding: 16px;
  
  .tree-node {
    padding: 8px 0;
    border-bottom: 1px solid ${props => props.$isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.8)'};
  }
  
  .table-icon {
    color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
    margin-right: 8px;
  }
  
  .column-icon {
    color: ${props => props.$isDark ? '#18D2BA' : '#00C9A7'};
    margin-right: 8px;
    margin-left: 24px;
  }

  .pk-icon {
    color: ${props => props.$isDark ? '#FFD662' : '#FFC542'};
    margin-left: 8px;
  }

  .fk-icon {
    color: ${props => props.$isDark ? '#FF7A7A' : '#FF6B6B'};
    margin-left: 8px;
  }
`;

const DatabaseManagement: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const [activeTab, setActiveTab] = useState('1');
  const [selectedDatabase, setSelectedDatabase] = useState('product_db');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM customers LIMIT 10;');

  // 折线图配置 - 数据库性能趋势
  const lineChartOption = {
    title: {
      text: '数据库性能趋势',
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
      data: ['CPU使用率', '内存使用', '磁盘I/O', '活跃连接数'],
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
      data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
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
        name: 'CPU使用率',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [28, 32, 45, 56, 40, 35, 30]
      },
      {
        name: '内存使用',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [45, 48, 52, 58, 60, 65, 62]
      },
      {
        name: '磁盘I/O',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [15, 25, 40, 35, 30, 22, 18]
      },
      {
        name: '活跃连接数',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        lineStyle: {
          width: 3
        },
        data: [120, 145, 175, 185, 160, 150, 140]
      }
    ]
  };

  // 饼图配置 - 表空间占用分布
  const pieChartOption = {
    title: {
      text: '表空间占用分布',
      textStyle: {
        fontSize: 16,
        fontWeight: 500
      },
      left: 10,
      top: 5
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}MB ({d}%)'
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
        name: '表空间',
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
          { value: 1048, name: 'customers' },
          { value: 735, name: 'orders' },
          { value: 580, name: 'products' },
          { value: 484, name: 'inventory' },
          { value: 380, name: 'suppliers' }
        ]
      }
    ]
  };

  // 柱状图配置 - 查询性能排行
  const barChartOption = {
    title: {
      text: '慢查询排行榜',
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
      max: 12,
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
      data: ['查询订单详情', '客户购买记录', '商品搜索', '订单统计', '库存查询'],
      axisLine: {
        lineStyle: {
          color: isDark ? '#475569' : '#CBD5E1'
        }
      }
    },
    series: [
      {
        name: '平均执行时间(秒)',
        type: 'bar',
        data: [9.5, 7.8, 5.2, 4.3, 3.8]
      }
    ]
  };

  // 数据库关系图
  const databaseStructureOption = {
    tooltip: {},
    legend: [
      {
        data: ['表', '关系'],
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
        name: '数据库结构',
        type: 'graph',
        layout: 'force',
        data: [
          { 
            id: '0',
            name: 'customers', 
            symbolSize: 45, 
            value: 27, 
            category: 0,
            itemStyle: { color: '#2A6AFF' }
          },
          { 
            id: '1',
            name: 'orders', 
            symbolSize: 40, 
            value: 22, 
            category: 0,
            itemStyle: { color: '#5B8AF9' }
          },
          { 
            id: '2',
            name: 'order_items', 
            symbolSize: 35, 
            value: 15, 
            category: 0,
            itemStyle: { color: '#00C9A7' }
          },
          { 
            id: '3',
            name: 'products', 
            symbolSize: 40, 
            value: 20, 
            category: 0,
            itemStyle: { color: '#18D2BA' }
          },
          { 
            id: '4',
            name: 'categories', 
            symbolSize: 30, 
            value: 10, 
            category: 0,
            itemStyle: { color: '#00C9A7' }
          },
          { 
            id: '5',
            name: 'inventory', 
            symbolSize: 35, 
            value: 18, 
            category: 0,
            itemStyle: { color: '#FFC542' }
          },
          { 
            id: '6',
            name: 'suppliers', 
            symbolSize: 30, 
            value: 15, 
            category: 0,
            itemStyle: { color: '#FFD662' }
          },
          { 
            id: '7',
            name: 'user_activity', 
            symbolSize: 30, 
            value: 12, 
            category: 0,
            itemStyle: { color: '#FFC542' }
          },
        ],
        links: [
          { source: '0', target: '1' },
          { source: '1', target: '2' },
          { source: '2', target: '3' },
          { source: '3', target: '4' },
          { source: '3', target: '5' },
          { source: '5', target: '6' },
          { source: '0', target: '7' },
          { source: '3', target: '1' },
        ],
        categories: [
          { name: '表' },
          { name: '关系' }
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

  // 查询结果表格列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '注册日期',
      dataIndex: 'registeredDate',
      key: 'registeredDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  // 模拟查询结果数据
  const queryResultData = [
    {
      key: '1',
      id: 1001,
      name: '张三',
      email: 'zhangsan@example.com',
      registeredDate: '2022-05-12',
      status: '活跃',
    },
    {
      key: '2',
      id: 1002,
      name: '李四',
      email: 'lisi@example.com',
      registeredDate: '2022-06-23',
      status: '活跃',
    },
    {
      key: '3',
      id: 1003,
      name: '王五',
      email: 'wangwu@example.com',
      registeredDate: '2022-07-15',
      status: '非活跃',
    },
    {
      key: '4',
      id: 1004,
      name: '赵六',
      email: 'zhaoliu@example.com',
      registeredDate: '2022-08-30',
      status: '活跃',
    },
    {
      key: '5',
      id: 1005,
      name: '孙七',
      email: 'sunqi@example.com',
      registeredDate: '2022-09-18',
      status: '待验证',
    },
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Title level={3} style={{ margin: '0 0 16px 0' }}>数据库管理</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="info" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">数据库总数</Text>
              <Badge status="processing" />
            </StatHeader>
            <Statistic
              value={12}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <DatabaseOutlined style={{ marginRight: 8 }} />
              <Text type="secondary">线上: 5 / 测试: 7</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="success" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">数据表数量</Text>
              <Badge status="success" />
            </StatHeader>
            <Statistic
              value={248}
              precision={0}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <TableOutlined style={{ color: '#00C9A7', marginRight: 8 }} />
              <Text type="secondary">本月新增 15 张表</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="error" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">慢查询数</Text>
              <Badge status="error" />
            </StatHeader>
            <Statistic
              value={23}
              precision={0}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <WarningOutlined style={{ color: '#FF6B6B', marginRight: 8 }} />
              <Text type="secondary">较昨日增加 3 个</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="warning" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">当前连接数</Text>
              <Badge status="warning" />
            </StatHeader>
            <Statistic
              value={156}
              valueStyle={{ fontSize: 28 }}
            />
            <div className="indicator">
              <SyncOutlined style={{ color: '#FFC542', marginRight: 8 }} />
              <Text type="secondary">最大连接数: 500</Text>
            </div>
          </StyledStatisticCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <ModernCard hoverable>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="数据库性能" key="1">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <ModernCard title="性能监控" hoverable>
                      <ModernChart option={lineChartOption} height={350} />
                    </ModernCard>
                  </Col>
                  <Col xs={24} md={12}>
                    <ModernCard title="表空间占用" hoverable>
                      <ModernChart option={pieChartOption} height={350} />
                    </ModernCard>
                  </Col>
                </Row>
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                  <Col xs={24}>
                    <ModernCard title="慢查询分析" hoverable>
                      <ModernChart option={barChartOption} height={350} />
                    </ModernCard>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="数据库结构" key="2">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={16}>
                    <ModernCard title="数据库关系图" hoverable>
                      <ModernChart option={databaseStructureOption} height={500} />
                    </ModernCard>
                  </Col>
                  <Col xs={24} md={8}>
                    <ModernCard title="表结构详情" hoverable>
                      <Select 
                        defaultValue={selectedDatabase} 
                        style={{ width: '100%', marginBottom: '16px' }} 
                        onChange={setSelectedDatabase}
                      >
                        <Option value="product_db">产品数据库</Option>
                        <Option value="user_db">用户数据库</Option>
                        <Option value="order_db">订单数据库</Option>
                      </Select>
                      <TableStructureTree $isDark={isDark}>
                        <div className="tree-node">
                          <DatabaseOutlined className="table-icon" />
                          <strong>customers</strong>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="table-icon" />
                          <strong>id</strong>
                          <LockOutlined className="pk-icon" title="主键" />
                          <Text type="secondary" style={{ marginLeft: '8px' }}>INT</Text>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="column-icon" />
                          <Text>name</Text>
                          <Text type="secondary" style={{ marginLeft: '8px' }}>VARCHAR(100)</Text>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="column-icon" />
                          <Text>email</Text>
                          <Text type="secondary" style={{ marginLeft: '8px' }}>VARCHAR(100)</Text>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="column-icon" />
                          <Text>registered_date</Text>
                          <Text type="secondary" style={{ marginLeft: '8px' }}>DATE</Text>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="column-icon" />
                          <Text>status</Text>
                          <Text type="secondary" style={{ marginLeft: '8px' }}>VARCHAR(20)</Text>
                        </div>
                        <div className="tree-node">
                          <DatabaseOutlined className="table-icon" />
                          <strong>orders</strong>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="table-icon" />
                          <strong>id</strong>
                          <LockOutlined className="pk-icon" title="主键" />
                          <Text type="secondary" style={{ marginLeft: '8px' }}>INT</Text>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="column-icon" />
                          <Text>customer_id</Text>
                          <ApiOutlined className="fk-icon" title="外键" />
                          <Text type="secondary" style={{ marginLeft: '8px' }}>INT</Text>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="column-icon" />
                          <Text>order_date</Text>
                          <Text type="secondary" style={{ marginLeft: '8px' }}>DATETIME</Text>
                        </div>
                        <div className="tree-node">
                          <TableOutlined className="column-icon" />
                          <Text>total_amount</Text>
                          <Text type="secondary" style={{ marginLeft: '8px' }}>DECIMAL(10,2)</Text>
                        </div>
                      </TableStructureTree>
                    </ModernCard>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="SQL查询工具" key="3">
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <SQLEditorCard $isDark={isDark} hoverable>
                      <div className="editor-toolbar">
                        <div>
                          <Select 
                            defaultValue={selectedDatabase} 
                            style={{ width: 200, marginRight: 16 }} 
                            onChange={setSelectedDatabase}
                          >
                            <Option value="product_db">产品数据库</Option>
                            <Option value="user_db">用户数据库</Option>
                            <Option value="order_db">订单数据库</Option>
                          </Select>
                          <Button type="primary" icon={<SearchOutlined />}>执行查询</Button>
                          <Button style={{ marginLeft: 8 }} icon={<ReloadOutlined />}>重置</Button>
                        </div>
                        <div>
                          <Button icon={<CodeOutlined />}>格式化</Button>
                          <Button style={{ marginLeft: 8 }} icon={<CheckCircleOutlined />}>保存查询</Button>
                        </div>
                      </div>
                      <TextArea 
                        className="sql-editor" 
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        placeholder="输入SQL查询..." 
                        rows={8}
                      />
                      <div className="result-container">
                        <Divider orientation="left">查询结果</Divider>
                        <Space style={{ marginBottom: 16 }}>
                          <Text type="secondary">
                            <ClockCircleOutlined style={{ marginRight: 8 }} />
                            查询耗时: 0.32秒
                          </Text>
                          <Text type="secondary">
                            <DatabaseOutlined style={{ marginRight: 8 }} />
                            结果行数: 5
                          </Text>
                        </Space>
                        <Table 
                          columns={columns} 
                          dataSource={queryResultData} 
                          bordered 
                          size="middle"
                          pagination={{ pageSize: 10 }}
                          scroll={{ x: 'max-content' }}
                        />
                      </div>
                    </SQLEditorCard>
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
            <Title level={4}>数据库管理工具</Title>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <BarChartOutlined style={{ fontSize: '32px', color: isDark ? '#5B8AF9' : '#2A6AFF' }} />
                  <div style={{ marginTop: '8px' }}>性能监控</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <SearchOutlined style={{ fontSize: '32px', color: isDark ? '#18D2BA' : '#00C9A7' }} />
                  <div style={{ marginTop: '8px' }}>SQL分析器</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <SyncOutlined style={{ fontSize: '32px', color: isDark ? '#FFD662' : '#FFC542' }} />
                  <div style={{ marginTop: '8px' }}>数据同步</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <LockOutlined style={{ fontSize: '32px', color: isDark ? '#FF7A7A' : '#FF6B6B' }} />
                  <div style={{ marginTop: '8px' }}>权限管理</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <DatabaseOutlined style={{ fontSize: '32px', color: isDark ? '#9D8AEA' : '#865CD6' }} />
                  <div style={{ marginTop: '8px' }}>备份恢复</div>
                </div>
              </Col>
              <Col xs={24} sm={8} md={6} lg={4}>
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <TableOutlined style={{ fontSize: '32px', color: isDark ? '#FFA26B' : '#FF8C42' }} />
                  <div style={{ marginTop: '8px' }}>表结构设计</div>
                </div>
              </Col>
            </Row>
          </ModernCard>
        </Col>
      </Row>
    </Space>
  );
};

export default DatabaseManagement; 