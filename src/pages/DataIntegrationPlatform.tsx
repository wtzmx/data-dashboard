// src/pages/DataIntegrationPlatform.tsx

import React from 'react'; // Removed unused useState
import {
  Row,
  Col,
  Statistic,
  Typography,
  Space,
  Badge,
  // Divider, // Removed unused component
  // Card, // Removed unused component
  // Tabs, // Removed unused component
  Table,
  Tag,
  List,
  Avatar,
  Steps,
  // Tooltip, // Removed unused component
} from 'antd';
import {
  DatabaseOutlined,
  ApiOutlined,
  FileTextOutlined,
  CloudServerOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  NodeIndexOutlined,
  // SwapOutlined, // Removed unused icon
  FilterOutlined,
  CloudUploadOutlined,
  ClusterOutlined,
  DashboardOutlined,
  // ApartmentOutlined, // Removed unused icon
  // HddOutlined // Removed unused icon
} from '@ant-design/icons';
import styled from 'styled-components';
import ModernCard from '../components/ModernCard'; // Assuming this exists
import ModernChart from '../components/ModernChart'; // Assuming this exists
import { useTheme } from '../context/ThemeContext'; // Assuming this exists
// import * as echarts from 'echarts'; // Removed unused import

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

// Re-using the StyledStatisticCard and StatHeader from the previous example (Keep as is)
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
    color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.85)' : 'rgba(30, 41, 59, 0.85)'};
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
    switch (props.$type) {
      case 'success':
        return `
          background: ${props.$isDark
            ? 'linear-gradient(135deg, rgba(24, 210, 186, 0.05) 0%, rgba(24, 210, 186, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(0, 201, 167, 0.05) 0%, rgba(0, 201, 167, 0.1) 100%)'};
          .ant-statistic-content-value { color: ${props.$isDark ? '#18D2BA' : '#00C9A7'}; }
        `;
      case 'warning':
        return `
          background: ${props.$isDark
            ? 'linear-gradient(135deg, rgba(255, 214, 98, 0.05) 0%, rgba(255, 214, 98, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255, 197, 66, 0.05) 0%, rgba(255, 197, 66, 0.1) 100%)'};
          .ant-statistic-content-value { color: ${props.$isDark ? '#FFD662' : '#FFC542'}; }
        `;
      case 'error':
        return `
          background: ${props.$isDark
            ? 'linear-gradient(135deg, rgba(255, 122, 122, 0.05) 0%, rgba(255, 122, 122, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(255, 107, 107, 0.1) 100%)'};
          .ant-statistic-content-value { color: ${props.$isDark ? '#FF7A7A' : '#FF6B6B'}; }
        `;
      case 'info':
      default:
        return `
          background: ${props.$isDark
            ? 'linear-gradient(135deg, rgba(91, 138, 249, 0.05) 0%, rgba(91, 138, 249, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(42, 106, 255, 0.05) 0%, rgba(42, 106, 255, 0.1) 100%)'};
          .ant-statistic-content-value { color: ${props.$isDark ? '#5B8AF9' : '#2A6AFF'}; }
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

const SourceListCard = styled(ModernCard)<{ $isDark: boolean }>`
  .ant-list-item {
    padding: 12px 0;
    border-bottom: 1px solid ${props => props.$isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.8)'};
    transition: background-color 0.3s ease;
    &:hover {
      background-color: ${props => props.$isDark ? 'rgba(51, 65, 85, 0.2)' : 'rgba(241, 245, 249, 0.7)'};
    }
  }
  .ant-list-item:last-child {
    border-bottom: none;
  }
  .ant-list-item-meta-title {
    margin-bottom: 2px !important;
  }
  .ant-list-item-meta-description {
    font-size: 12px;
  }
`;

const EtlPipelineCard = styled(ModernCard)<{ $isDark: boolean }>`
  .ant-steps-item-icon .ant-steps-icon {
    font-size: 18px; // Slightly larger icons
  }
  .ant-steps-item-title {
    font-weight: 500;
  }
`;


const DataIntegrationPlatform: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';

  // --- Chart Options ---

  // Line Chart: Data Processed Volume
  const lineChartOption = {
    title: {
      text: '数据处理量趋势 (TB)',
      textStyle: { fontSize: 16, fontWeight: 500 },
      left: 10, top: 5,
    },
    // Merged tooltip properties
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: isDark ? '#334155' : '#E2E8F0',
      textStyle: { color: isDark ? '#E2E8F0' : '#1E293B' }
    },
    legend: { data: ['实时处理', '批量处理'], right: 10, top: 5 },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true, top: 60 },
    xAxis: {
      type: 'category', boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: { lineStyle: { color: isDark ? '#475569' : '#CBD5E1' } }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: isDark ? 'rgba(51, 65, 85, 0.2)' : 'rgba(226, 232, 240, 0.5)' } }
    },
    series: [
      { name: '实时处理', type: 'line', smooth: true, symbolSize: 6, data: [1.2, 1.5, 1.8, 1.6, 1.9, 2.2, 2.5] },
      { name: '批量处理', type: 'line', smooth: true, symbolSize: 6, data: [5.5, 5.8, 6.2, 7.0, 6.5, 7.5, 8.0] }
    ]
    // Removed duplicate tooltip definition
  };

  // Pie Chart: ETL Job Status Distribution
  const pieChartOption = {
    title: {
      text: 'ETL 任务状态分布',
      textStyle: { fontSize: 16, fontWeight: 500 },
      left: 10, top: 5
    },
    // Merged tooltip properties
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: isDark ? '#334155' : '#E2E8F0',
      textStyle: { color: isDark ? '#E2E8F0' : '#1E293B' }
    },
    legend: {
      orient: 'vertical', right: 10, top: 'center',
      icon: 'circle', itemWidth: 10, itemHeight: 10, itemGap: 15
    },
    series: [
      {
        name: '任务状态', type: 'pie', radius: ['45%', '75%'], center: ['40%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 5, borderColor: isDark ? '#1E293B' : '#FFFFFF', borderWidth: 2 },
        label: { show: false },
        emphasis: { scale: true, scaleSize: 12, label: { show: true, fontSize: '14', fontWeight: 'bold' } },
        labelLine: { show: false },
        data: [
          { value: 385, name: '成功', itemStyle: { color: isDark ? '#18D2BA' : '#00C9A7' } },
          { value: 42, name: '失败', itemStyle: { color: isDark ? '#FF7A7A' : '#FF6B6B' } },
          { value: 58, name: '运行中', itemStyle: { color: isDark ? '#5B8AF9' : '#2A6AFF' } },
          { value: 15, name: '待调度', itemStyle: { color: isDark ? '#FFD662' : '#FFC542' } }
        ]
      }
    ]
    // Removed duplicate tooltip definition
  };

  // --- Static Data (Keep as is) ---

  // Data Sources List
  const sourceData = [
    { type: 'Database', name: 'MySQL - 用户中心库', icon: <DatabaseOutlined style={{ color: '#00758F' }} />, description: '主从集群, 版本 8.0' },
    { type: 'Database', name: 'PostgreSQL - 订单库', icon: <DatabaseOutlined style={{ color: '#336791' }} />, description: '高可用集群, 版本 14' },
    { type: 'API', name: '第三方天气服务 API', icon: <ApiOutlined style={{ color: '#FF8C42' }} />, description: 'RESTful JSON API, QPS 限制 100' },
    { type: 'File', name: '日志文件 (S3 Bucket)', icon: <FileTextOutlined style={{ color: '#5AAB61' }} />, description: '每日增量 Parquet 文件' },
    { type: 'Database', name: 'MongoDB - 活动数据', icon: <DatabaseOutlined style={{ color: '#4DB33D' }} />, description: '分片集群, 版本 6.0' },
    { type: 'CloudService', name: 'Salesforce CRM', icon: <CloudServerOutlined style={{ color: '#00A1E0' }} />, description: '通过官方 Connector 连接' },
  ];

  // ETL Job Table
  const jobColumns = [
    { title: '任务名称', dataIndex: 'name', key: 'name', width: 250 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 100 },
    {
      title: '状态', dataIndex: 'status', key: 'status', width: 100,
      render: (status: string) => {
        let color = 'default';
        let icon = <QuestionCircleOutlined />;
        if (status === '成功') { color = 'success'; icon = <CheckCircleOutlined />; }
        else if (status === '运行中') { color = 'processing'; icon = <SyncOutlined spin />; }
        else if (status === '失败') { color = 'error'; icon = <CloseCircleOutlined />; }
        return <Tag icon={icon} color={color}>{status}</Tag>;
      }
    },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime', width: 160 },
    { title: '耗时', dataIndex: 'duration', key: 'duration', width: 100 },
    { title: '处理量', dataIndex: 'volume', key: 'volume', width: 120 },
  ];

  const jobData = [
    { key: '1', name: '用户数据同步 (MySQL -> Hive)', type: '批量', status: '成功', startTime: '2023-10-26 02:00:00', duration: '15 min', volume: '1.2 GB' },
    { key: '2', name: '订单实时流处理 (Kafka -> PG)', type: '实时', status: '运行中', startTime: 'N/A', duration: 'N/A', volume: '~5 MB/min' },
    { key: '3', name: '日志文件解析 (S3 -> Elasticsearch)', type: '批量', status: '成功', startTime: '2023-10-26 03:00:00', duration: '25 min', volume: '8.5 GB' },
    { key: '4', name: '天气数据拉取 (API -> Redis)', type: '定时', status: '失败', startTime: '2023-10-26 10:00:00', duration: '2 min', volume: '5 MB' },
    { key: '5', name: '活动数据聚合 (MongoDB -> MySQL)', type: '批量', status: '成功', startTime: '2023-10-26 04:00:00', duration: '8 min', volume: '300 MB' },
    { key: '6', name: 'CRM 数据同步 (Salesforce -> Data Warehouse)', type: '批量', status: '运行中', startTime: '2023-10-26 09:30:00', duration: '45 min (est.)', volume: '2.1 GB' },
  ];

  // --- JSX (Keep as is) ---
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Title level={3} style={{ margin: '0 0 16px 0' }}>数据集成平台</Title>

      {/* --- Summary Statistics --- */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="info" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">连接源总数</Text>
              <Badge status="processing" />
            </StatHeader>
            <Statistic value={sourceData.length} valueStyle={{ fontSize: 28 }} />
            <div className="indicator">
              <ClusterOutlined style={{ marginRight: 8 }} />
              <Text type="secondary">本周新增 2 个</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="success" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">活跃 ETL 任务</Text>
              <Badge status="success" />
            </StatHeader>
            <Statistic value={jobData.filter(j => j.status === '运行中' || j.status === '成功').length} valueStyle={{ fontSize: 28 }} />
            <div className="indicator">
              <SyncOutlined style={{ color: '#00C9A7', marginRight: 8 }} />
              <Text type="secondary">24h 内执行 {jobData.length} 次</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type={pieChartOption.series[0].data[1].value > 0 ? 'error' : 'success'} $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">任务成功率 (近24h)</Text>
              <Badge status={pieChartOption.series[0].data[1].value > 0 ? 'error' : 'success'} />
            </StatHeader>
            <Statistic
              value={(pieChartOption.series[0].data[0].value / (pieChartOption.series[0].data[0].value + pieChartOption.series[0].data[1].value)) * 100}
              precision={1}
              valueStyle={{ fontSize: 28 }}
              suffix="%"
            />
            <div className="indicator">
              {pieChartOption.series[0].data[1].value > 0
                ? <CloseCircleOutlined style={{ color: '#FF6B6B', marginRight: 8 }} />
                : <CheckCircleOutlined style={{ color: '#00C9A7', marginRight: 8 }} />
              }
              <Text type="secondary">{pieChartOption.series[0].data[1].value} 个失败任务</Text>
            </div>
          </StyledStatisticCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledStatisticCard hoverable $type="warning" $isDark={isDark}>
            <StatHeader $isDark={isDark}>
              <Text className="title">今日处理数据量</Text>
              <Badge status="warning" />
            </StatHeader>
            <Statistic value={10.5} precision={1} valueStyle={{ fontSize: 28 }} suffix="TB" />
            <div className="indicator">
              <DashboardOutlined style={{ color: '#FFC542', marginRight: 8 }} />
              <Text type="secondary">较昨日 +15%</Text>
            </div>
          </StyledStatisticCard>
        </Col>
      </Row>

      {/* --- Data Sources & ETL Pipeline Example --- */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <SourceListCard title="已连接数据源" hoverable $isDark={isDark}>
            <List
              itemLayout="horizontal"
              dataSource={sourceData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar size="large" icon={item.icon} style={{ backgroundColor: 'transparent' }} />}
                    title={<Text strong>{item.name}</Text>}
                    description={item.description}
                  />
                  <Tag color="blue">{item.type}</Tag>
                </List.Item>
              )}
            />
          </SourceListCard>
        </Col>
        <Col xs={24} md={16}>
          <EtlPipelineCard title="典型 ETL 流程示例：用户日志分析" hoverable $isDark={isDark}>
            <Steps current={4} size="small" style={{ marginTop: 20, marginBottom: 10 }}>
              <Step title="提取 (Extract)" icon={<NodeIndexOutlined />} description="从 S3 拉取日志文件" />
              <Step title="转换 (Transform)" icon={<FilterOutlined />} description="清洗、格式化、关联用户信息" />
              <Step title="加载 (Load)" icon={<CloudUploadOutlined />} description="加载到 Elasticsearch 集群" />
              <Step title="调度 (Schedule)" icon={<SyncOutlined />} description="每日凌晨 3 点执行" />
              <Step status="finish" title="完成" icon={<CheckCircleOutlined />} description="生成分析报告" />
            </Steps>
            <Paragraph type="secondary" style={{ marginTop: 20 }}>
              这是一个标准的批量处理ETL流程，用于将原始日志数据转化为可供分析的结构化数据。
            </Paragraph>
          </EtlPipelineCard>
        </Col>
      </Row>

      {/* --- Charts --- */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <ModernCard title="数据处理量趋势" hoverable>
            <ModernChart option={lineChartOption} height={350} />
          </ModernCard>
        </Col>
        <Col xs={24} md={12}>
          <ModernCard title="ETL 任务状态分布" hoverable>
            <ModernChart option={pieChartOption} height={350} />
          </ModernCard>
        </Col>
      </Row>

      {/* --- ETL Job List --- */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <ModernCard title="ETL 任务监控" hoverable>
            <Table
              columns={jobColumns}
              dataSource={jobData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 800 }} // Enable horizontal scroll on smaller screens
            />
          </ModernCard>
        </Col>
      </Row>

    </Space>
  );
};

export default DataIntegrationPlatform;