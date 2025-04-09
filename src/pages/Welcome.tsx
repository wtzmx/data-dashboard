import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card, // Card is used by CarouselCard and potentially others, keep it for now unless explicitly unused.
  Row,
  Col,
  Avatar,
  Space,
  Button,
  Divider,
  List,
  // Tag, // Removed unused component
  Carousel,
  // Statistic, // Removed unused component
  Badge,
  message,
  // Tooltip, // Removed unused component
  Progress
} from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  MailOutlined,
  SettingOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  BulbOutlined,
  RightOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  RadarChartOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import ModernCard from '../components/ModernCard';

const { Title, Text, Paragraph } = Typography;

// 添加动画效果 (Keep as is)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// 背景和页面容器 (Keep as is)
const PageContainer = styled.div<{ $isDark: boolean }>`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: ${props => props.$isDark ? 'rgba(91, 138, 249, 0.05)' : 'rgba(42, 106, 255, 0.05)'};
    z-index: 0;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: ${props => props.$isDark ? 'rgba(24, 210, 186, 0.03)' : 'rgba(0, 201, 167, 0.03)'};
    z-index: 0;
  }
`;

const MainContent = styled.div`
  position: relative;
  z-index: 1;
`;

// Removed unused WelcomeHeader definition
// const WelcomeHeader = styled.div`
//   text-align: center;
//   margin-bottom: 40px;
//   animation: ${fadeIn} 0.8s ease-out;
//
//   .welcome-subtitle {
//     max-width: 700px;
//     margin: 0 auto;
//   }
// `;

const HeroSection = styled.div<{ $isDark: boolean }>`
  position: relative;
  background: ${props => props.$isDark
    ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)'
    : 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)'};
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 24px;
  overflow: hidden;
  box-shadow: ${props => props.$isDark
    ? '0 8px 16px rgba(0, 0, 0, 0.3)'
    : '0 8px 16px rgba(0, 0, 0, 0.05)'};

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 50%;
  }

  .hero-title {
    margin-bottom: 24px;
    font-size: 32px;
    color: ${props => props.$isDark ? '#FFFFFF' : '#1E293B'};
  }

  .hero-description {
    margin-bottom: 32px;
    font-size: 16px;
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
  }

  .hero-image {
    position: absolute;
    right: 0;
    top: 0;
    width: 40%;
    height: 100%;
    background-image: url('https://plus.unsplash.com/premium_photo-1661508749867-92a220cbfd2c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: cover;
    background-position: center;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    opacity: ${props => props.$isDark ? 0.7 : 0.9};
    z-index: 1;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 100%;
      background: ${props => props.$isDark
        ? 'linear-gradient(90deg, #1E293B 0%, rgba(30, 41, 59, 0) 100%)'
        : 'linear-gradient(90deg, #F0F9FF 0%, rgba(240, 249, 255, 0) 100%)'};
    }
  }

  .hero-actions {
    display: flex;
    gap: 16px;
  }
`;

const InfoCard = styled(ModernCard)<{ $isDark: boolean }>`
  margin-bottom: 24px;
  animation: ${fadeIn} 0.8s ease-out;

  .ant-card-body {
    padding: 20px;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .user-meta {
    flex: 1;
  }

  .user-actions {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
    gap: 8px;
  }

  .login-info {
    margin-top: 8px;
    display: flex;
    align-items: center;
    color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.6)' : 'rgba(30, 41, 59, 0.6)'};
  }

  .role-badge {
    background: ${props => props.$isDark ? '#334155' : '#F1F5F9'};
    color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 8px;
  }

  .user-avatar {
    background: ${props => props.$isDark ? 'linear-gradient(135deg, #5B8AF9 0%, #18D2BA 100%)' : 'linear-gradient(135deg, #2A6AFF 0%, #00C9A7 100%)'};
    box-shadow: ${props => props.$isDark ? '0 4px 12px rgba(91, 138, 249, 0.5)' : '0 4px 12px rgba(42, 106, 255, 0.3)'};
  }

  .stats-row {
    display: flex;
    margin-top: 16px;
    gap: 16px;

    .stat-item {
      flex: 1;
      text-align: center;
      padding: 8px;
      background: ${props => props.$isDark ? 'rgba(30, 41, 59, 0.3)' : 'rgba(240, 249, 255, 0.5)'};
      border-radius: 8px;

      .stat-value {
        font-size: 20px;
        font-weight: 600;
        color: ${props => props.$isDark ? '#FFFFFF' : '#1E293B'};
      }

      .stat-label {
        font-size: 12px;
        color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
      }
    }
  }
`;

// Keep other styled components (ModuleCard, NewsCarousel, etc.) as they are...
const ModuleCard = styled(ModernCard)<{ $isDark: boolean; $color?: string; onClick?: () => void }>`
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${props => props.$isDark
      ? '0 12px 20px rgba(0, 0, 0, 0.4)'
      : '0 12px 20px rgba(0, 0, 0, 0.1)'};

    .module-icon {
      animation: ${floatAnimation} 2s ease-in-out infinite;
    }

    .module-image {
      transform: scale(1.1);
    }
  }

  .module-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 120px;
    opacity: 0.05;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;
    z-index: 0;
  }

  .module-content {
    position: relative;
    z-index: 1;
  }

  .module-icon-container {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    background: ${props => {
      if (props.$color === 'blue') {
        return props.$isDark
          ? 'linear-gradient(135deg, #5B8AF9 0%, #334155 100%)'
          : 'linear-gradient(135deg, #2A6AFF 0%, #BBD6FF 100%)';
      } else if (props.$color === 'green') {
        return props.$isDark
          ? 'linear-gradient(135deg, #18D2BA 0%, #334155 100%)'
          : 'linear-gradient(135deg, #00C9A7 0%, #B5F2EA 100%)';
      } else if (props.$color === 'yellow') {
        return props.$isDark
          ? 'linear-gradient(135deg, #FFD662 0%, #334155 100%)'
          : 'linear-gradient(135deg, #FFC542 0%, #FFEFC2 100%)';
      } else if (props.$color === 'red') {
        return props.$isDark
          ? 'linear-gradient(135deg, #FF7A7A 0%, #334155 100%)'
          : 'linear-gradient(135deg, #FF6B6B 0%, #FFCACA 100%)';
      } else if (props.$color === 'purple') {
        return props.$isDark
          ? 'linear-gradient(135deg, #9D8AEA 0%, #334155 100%)'
          : 'linear-gradient(135deg, #865CD6 0%, #D8CFFF 100%)';
      } else if (props.$color === 'orange') {
        return props.$isDark
          ? 'linear-gradient(135deg, #FFA26B 0%, #334155 100%)'
          : 'linear-gradient(135deg, #FF8C42 0%, #FFD8BC 100%)';
      } else {
        return props.$isDark
          ? 'linear-gradient(135deg, #5B8AF9 0%, #334155 100%)'
          : 'linear-gradient(135deg, #2A6AFF 0%, #BBD6FF 100%)';
      }
    }};
    box-shadow: ${props => props.$isDark ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.1)'};
  }

  .module-icon {
    font-size: 26px;
    color: white;
    transition: all 0.3s;
  }

  .module-title {
    margin-bottom: 8px;
    font-weight: 600;
  }

  .module-description {
    margin-bottom: 16px;
    color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.7)' : 'rgba(30, 41, 59, 0.7)'};
  }

  .module-actions {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .module-stat {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
    display: flex;
    justify-content: space-between;

    .stat-value {
      font-weight: bold;
      font-size: 14px;
      color: ${props => props.$isDark ? 'white' : '#1E293B'};
    }

    .stat-label {
      color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.6)' : 'rgba(30, 41, 59, 0.6)'};
      font-size: 12px;
    }
  }
`;

const NewsCarousel = styled(Carousel)`
  animation: ${fadeIn} 0.8s ease-out;
  margin-bottom: 24px;

  .slick-dots li button {
    background: var(--dot-color, #2A6AFF);
  }

  .slick-dots li.slick-active button {
    background: var(--dot-color, #2A6AFF);
  }

  .slick-dots {
    bottom: -5px;
  }

  &.theme-dark {
    --dot-color: #5B8AF9;
  }

  &.theme-light {
    --dot-color: #2A6AFF;
  }
`;

const CarouselCard = styled(Card)<{ $isDark: boolean; $type?: 'info' | 'warning' | 'update' }>`
  margin: 10px;
  border-radius: 12px;
  overflow: hidden;
  height: 220px;
  border: none;
  box-shadow: ${props => props.$isDark ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.05)'};

  .ant-card-body {
    padding: 24px;
    height: 100%;
    background: ${props => {
      if (props.$type === 'warning') {
        return props.$isDark
          ? 'linear-gradient(135deg, rgba(255, 214, 98, 0.1) 0%, rgba(30, 41, 59, 1) 100%)'
          : 'linear-gradient(135deg, rgba(255, 197, 66, 0.1) 0%, rgba(255, 255, 255, 1) 100%)';
      } else if (props.$type === 'update') {
        return props.$isDark
          ? 'linear-gradient(135deg, rgba(24, 210, 186, 0.1) 0%, rgba(30, 41, 59, 1) 100%)'
          : 'linear-gradient(135deg, rgba(0, 201, 167, 0.1) 0%, rgba(255, 255, 255, 1) 100%)';
      } else {
        return props.$isDark
          ? 'linear-gradient(135deg, rgba(91, 138, 249, 0.1) 0%, rgba(30, 41, 59, 1) 100%)'
          : 'linear-gradient(135deg, rgba(42, 106, 255, 0.1) 0%, rgba(255, 255, 255, 1) 100%)';
      }
    }};
    position: relative;
    overflow: hidden;
  }

  .news-badge {
    position: absolute;
    top: 24px;
    right: 24px;
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 500;

    background: ${props => {
      if (props.$type === 'warning') {
        return props.$isDark ? 'rgba(255, 214, 98, 0.2)' : 'rgba(255, 197, 66, 0.2)';
      } else if (props.$type === 'update') {
        return props.$isDark ? 'rgba(24, 210, 186, 0.2)' : 'rgba(0, 201, 167, 0.2)';
      } else {
        return props.$isDark ? 'rgba(91, 138, 249, 0.2)' : 'rgba(42, 106, 255, 0.2)';
      }
    }};

    color: ${props => {
      if (props.$type === 'warning') {
        return props.$isDark ? '#FFD662' : '#FFC542';
      } else if (props.$type === 'update') {
        return props.$isDark ? '#18D2BA' : '#00C9A7';
      } else {
        return props.$isDark ? '#5B8AF9' : '#2A6AFF';
      }
    }};
  }

  .news-image {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 120px;
    height: 120px;
    opacity: 0.1;
    background-size: cover;
    background-position: center;
  }

  .news-title {
    font-weight: 600;
    margin-bottom: 12px;
    font-size: 20px;
    padding-right: 60px;
  }

  .news-date {
    display: flex;
    align-items: center;
    color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.6)' : 'rgba(30, 41, 59, 0.6)'};
    font-size: 13px;
    margin-bottom: 16px;

    .date-icon {
      margin-right: 8px;
    }
  }

  .news-actions {
    margin-top: 24px;
  }
`;

const TipsCard = styled(ModernCard)<{ $isDark: boolean }>`
  height: 100%;
  animation: ${fadeIn} 1s ease-out;

  .ant-card-body {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .tip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .tip-item {
    display: flex;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};

    &:last-child {
      border-bottom: none;
    }

    .tip-icon-container {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      flex-shrink: 0;
      background: ${props => props.$isDark
        ? 'rgba(255, 214, 98, 0.15)'
        : 'rgba(255, 197, 66, 0.15)'};
    }

    .tip-icon {
      color: ${props => props.$isDark ? '#FFD662' : '#FFC542'};
      font-size: 18px;
    }

    .tip-content {
      flex: 1;
    }

    .tip-title {
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .tips-footer {
    margin-top: auto;
    text-align: center;
    padding-top: 16px;
  }
`;

const RecentCard = styled(ModernCard)<{ $isDark: boolean }>`
  height: 100%;
  animation: ${fadeIn} 0.9s ease-out;

  .ant-card-body {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .recent-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .recent-list {
    flex: 1;

    .ant-list-item {
      padding: 12px 0;
      border-bottom: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};

      &:last-child {
        border-bottom: none;
      }
    }

    .recent-icon-container {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      flex-shrink: 0;

      &.type-model {
        background: ${props => props.$isDark
          ? 'rgba(91, 138, 249, 0.15)'
          : 'rgba(42, 106, 255, 0.15)'};

        .recent-icon {
          color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
        }
      }

      &.type-dashboard {
        background: ${props => props.$isDark
          ? 'rgba(24, 210, 186, 0.15)'
          : 'rgba(0, 201, 167, 0.15)'};

        .recent-icon {
          color: ${props => props.$isDark ? '#18D2BA' : '#00C9A7'};
        }
      }

      &.type-dataset {
        background: ${props => props.$isDark
          ? 'rgba(255, 214, 98, 0.15)'
          : 'rgba(255, 197, 66, 0.15)'};

        .recent-icon {
          color: ${props => props.$isDark ? '#FFD662' : '#FFC542'};
        }
      }

      &.type-map {
        background: ${props => props.$isDark
          ? 'rgba(157, 138, 234, 0.15)'
          : 'rgba(134, 92, 214, 0.15)'};

        .recent-icon {
          color: ${props => props.$isDark ? '#9D8AEA' : '#865CD6'};
        }
      }
    }

    .recent-icon {
      font-size: 18px;
    }

    .recent-info {
      flex: 1;

      .recent-title {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .recent-meta {
        color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.6)' : 'rgba(30, 41, 59, 0.6)'};
        font-size: 12px;
        display: flex;
        align-items: center;

        .recent-tag {
          padding: 1px 6px;
          border-radius: 4px;
          margin-right: 8px;
          font-size: 11px;

          &.type-model {
            background: ${props => props.$isDark ? 'rgba(91, 138, 249, 0.15)' : 'rgba(42, 106, 255, 0.15)'};
            color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
          }

          &.type-dashboard {
            background: ${props => props.$isDark ? 'rgba(24, 210, 186, 0.15)' : 'rgba(0, 201, 167, 0.15)'};
            color: ${props => props.$isDark ? '#18D2BA' : '#00C9A7'};
          }

          &.type-dataset {
            background: ${props => props.$isDark ? 'rgba(255, 214, 98, 0.15)' : 'rgba(255, 197, 66, 0.15)'};
            color: ${props => props.$isDark ? '#FFD662' : '#FFC542'};
          }

          &.type-map {
            background: ${props => props.$isDark ? 'rgba(157, 138, 234, 0.15)' : 'rgba(134, 92, 214, 0.15)'};
            color: ${props => props.$isDark ? '#9D8AEA' : '#865CD6'};
          }
        }
      }
    }
  }

  .recent-footer {
    text-align: center;
    margin-top: 16px;
  }
`;

const SupportCard = styled(ModernCard)<{ $isDark: boolean }>`
  animation: ${fadeIn} 1.1s ease-out;

  .support-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-3px);
    }

    .support-icon-container {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      flex-shrink: 0;
      background: ${props => props.$isDark
        ? 'rgba(91, 138, 249, 0.15)'
        : 'rgba(42, 106, 255, 0.15)'};
    }

    .support-icon {
      font-size: 20px;
      color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
    }

    .support-content {
      flex: 1;
    }

    .support-action {
      color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
    }
  }
`;

// 示例数据 (Keep as is)
const newsData = [
  {
    title: '数商数据中心平台V2.0版本发布，全新UI与功能体验',
    date: '2023-04-05',
    content: '我们很高兴地宣布，数商数据中心平台V2.0版本已正式发布。新版本提供了全新的用户界面，增强了数据分析能力，并引入了智能推荐系统。',
    type: 'update',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
  },
  {
    title: '系统升级通知：4月20日系统将进行维护升级',
    date: '2023-04-12',
    content: '为提升系统性能，我们将于4月20日22:00-次日凌晨2:00进行系统维护升级。维护期间，平台将暂停访问。给您带来的不便，敬请谅解。',
    type: 'warning',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
  },
  {
    title: '新增数据源：企业财务与供应链数据全面接入平台',
    date: '2023-03-30',
    content: '数商数据中心现已接入企业财务与供应链数据，包括财务报表、销售数据、供应商信息等多维数据。授权用户现可通过数据资源门户进行查询与分析。',
    type: 'info',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
  }
];

const tipsData = [
  {
    title: '数据资源门户使用技巧',
    content: '使用高级搜索功能配合标签筛选，可快速定位所需的数据资产。元数据详情页中的"数据预览"功能可帮助您了解数据结构。',
    icon: <ThunderboltOutlined />
  },
  {
    title: '提升大数据分析效率的三步骤',
    content: '1. 使用预设的分析模板；2. 合理设置数据分区与缓存；3. 利用定时任务进行数据预处理。这些步骤可显著提升分析性能。',
    icon: <RadarChartOutlined />
  },
  {
    title: '数据治理最佳实践',
    content: '定期审核数据访问权限，建立数据质量监控流程，实施数据生命周期管理。良好的数据治理确保数据安全与质量。',
    icon: <BulbOutlined />
  }
];

const recentItems = [
  {
    title: '销售部门业绩评估数据分析',
    type: '数据模型',
    typeClass: 'type-model',
    icon: <BarChartOutlined />,
    time: '3小时前',
    progress: 85
  },
  {
    title: '2023年季度财务分析报告',
    type: '仪表板',
    typeClass: 'type-dashboard',
    icon: <LineChartOutlined />,
    time: '昨天',
    progress: 100
  },
  {
    title: '供应链优化数据集整合',
    type: '数据集',
    typeClass: 'type-dataset',
    icon: <DatabaseOutlined />,
    time: '2天前',
    progress: 70
  },
  {
    title: '全球市场销售分布分析',
    type: '地图分析',
    typeClass: 'type-map',
    icon: <FileSearchOutlined />,
    time: '上周',
    progress: 100
  }
];

const supportData = [
  {
    title: '数商中心帮助文档',
    description: '查阅详细的操作指南、API文档与最佳实践',
    icon: <QuestionCircleOutlined />
  },
  {
    title: '在线技术支持',
    description: '工作日 9:00-17:30 提供专业技术咨询',
    icon: <CustomerServiceOutlined />
  },
  {
    title: '联系数据中心团队',
    description: '提交需求或问题反馈给数据管理团队',
    icon: <TeamOutlined />
  }
];

const showcaseImages = [
  {
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    caption: '数据可视化仪表板',
    description: '企业经营数据实时监控与分析'
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    caption: '财务数据分析',
    description: '多维度财务指标分析与预测'
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    caption: '供应链管理平台',
    description: '全链路供应链数据监控与优化'
  }
];

const moduleData = [
  {
    title: '数据资源门户',
    description: '全面展示企业数据资产，提供元数据管理、数据质量监控和血缘分析',
    color: 'blue',
    icon: <FileSearchOutlined />,
    image: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    actions: [
      { label: '浏览目录', primary: true },
      { label: '查看血缘', primary: false },
      { label: '质量报告', primary: false }
    ],
    stat: { value: '1,856', label: '数据资产' }
  },
  {
    title: '大数据分析中心',
    description: '提供交互式数据探索平台，支持自定义分析模型与算法应用',
    color: 'green',
    icon: <BarChartOutlined />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    actions: [
      { label: '新建分析', primary: true },
      { label: '算法库', primary: false },
      { label: '计算任务', primary: false }
    ],
    stat: { value: '78', label: '分析模型' }
  },
  {
    title: '可视化展示平台',
    description: '智能生成高级图表与地理空间分析，支持多样化报表定制',
    color: 'purple',
    icon: <LineChartOutlined />,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    actions: [
      { label: '创建仪表板', primary: true },
      { label: '地理分析', primary: false },
      { label: '导出报表', primary: false }
    ],
    stat: { value: '125', label: '可视化应用' }
  },
  {
    title: '数据库管理界面',
    description: '提供数据库结构可视化、性能监控与SQL查询编辑工具',
    color: 'yellow',
    icon: <DatabaseOutlined />,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    actions: [
      { label: 'SQL工作台', primary: true },
      { label: '性能监控', primary: false },
      { label: '结构设计', primary: false }
    ],
    stat: { value: '32', label: '数据源连接' }
  },
  {
    title: '数据治理中心',
    description: '实施企业级数据标准规范、访问控制策略与数据安全保障',
    color: 'red',
    icon: <SafetyCertificateOutlined />,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    actions: [
      { label: '权限管理', primary: true },
      { label: '标准规范', primary: false },
      { label: '安全审计', primary: false }
    ],
    stat: { value: '216', label: '治理规则' }
  },
  {
    title: '数据集成平台',
    description: '支持多源异构数据集成与ETL流程，实现数据无缝流转与处理',
    color: 'orange',
    icon: <RadarChartOutlined />,
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    actions: [
      { label: '创建任务', primary: true },
      { label: '数据源管理', primary: false },
      { label: '调度监控', primary: false }
    ],
    stat: { value: '168', label: '集成任务' }
  }
];


const ImageShowcase = styled.div`
  margin: 24px 0;

  .showcase-title {
    margin-bottom: 16px;
  }

  .showcase-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }

  .showcase-item {
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;

    &:hover .showcase-overlay {
      opacity: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .showcase-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: white;
    opacity: 0.8;
    transition: opacity 0.3s;
  }

  .showcase-caption {
    font-weight: 500;
    margin-bottom: 4px;
  }

  .showcase-description {
    font-size: 12px;
    opacity: 0.9;
  }
`;


const Welcome: React.FC = () => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  // Removed unused 'loading' variable, keep setLoading as it's used in useEffect
  const [, setLoading] = useState(false);

  // 页面加载动画效果
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []); // Add setLoading to dependency array if needed, but it seems purely for effect timing

  const handleModuleClick = (module: string) => {
    message.info(`您点击了${module}模块`);
  };

  return (
    <PageContainer $isDark={isDark}>
      <MainContent>
        {/* Hero Section (Keep as is) */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <HeroSection $isDark={isDark}>
              <div className="hero-content">
                <Title className="hero-title">数商数据中心 - 企业级数据管理门户</Title>
                <Paragraph className="hero-description">
                  数商数据中心是现代化企业级数据管理门户，整合企业各类数据资源，
                  提供专业的大数据分析与可视化服务，助力企业数字化转型与业务决策。
                </Paragraph>
                <div className="hero-actions">
                  <Button type="primary" size="large" icon={<BarChartOutlined />}>
                    开始探索
                  </Button>
                  <Button size="large">平台介绍</Button>
                </div>
              </div>
              <div className="hero-image" />
            </HeroSection>
          </Col>
        </Row>

        {/* 企业级数据管理功能 (Keep as is) */}
         <div style={{ marginBottom: 24 }}>
          <Divider orientation="left" style={{ margin: '16px 0 16px' }}>
            <Space>
              <RadarChartOutlined />
              <span>企业级数据管理功能</span>
            </Space>
          </Divider>

          <Row gutter={[16, 16]}>
            {moduleData.slice(0, 3).map((module, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <ModuleCard
                  hoverable
                  $isDark={isDark}
                  $color={module.color}
                  onClick={() => handleModuleClick(module.title)}
                >
                  <div className="module-image" style={{ backgroundImage: `url(${module.image})` }} />
                  <div className="module-content">
                    <div className="module-icon-container">
                      <span className="module-icon">{module.icon}</span>
                    </div>
                    <div className="module-title">
                      <Title level={4} style={{ margin: 0 }}>{module.title}</Title>
                    </div>
                    <div className="module-description">
                      <Paragraph style={{ marginBottom: 0 }}>{module.description}</Paragraph>
                    </div>
                    <div className="module-actions">
                      {module.actions.map((action, i) => (
                        <Button
                          key={i}
                          size="small"
                          type={action.primary ? "primary" : undefined}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                    <div className="module-stat">
                      <div className="stat-value">{module.stat.value}</div>
                      <div className="stat-label">{module.stat.label}</div>
                    </div>
                  </div>
                </ModuleCard>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {moduleData.slice(3, 6).map((module, index) => (
              <Col xs={24} sm={12} md={8} key={index + 3}>
                <ModuleCard
                  hoverable
                  $isDark={isDark}
                  $color={module.color}
                  onClick={() => handleModuleClick(module.title)}
                >
                  <div className="module-image" style={{ backgroundImage: `url(${module.image})` }} />
                  <div className="module-content">
                    <div className="module-icon-container">
                      <span className="module-icon">{module.icon}</span>
                    </div>
                    <div className="module-title">
                      <Title level={4} style={{ margin: 0 }}>{module.title}</Title>
                    </div>
                    <div className="module-description">
                      <Paragraph style={{ marginBottom: 0 }}>{module.description}</Paragraph>
                    </div>
                    <div className="module-actions">
                      {module.actions.map((action, i) => (
                        <Button
                          key={i}
                          size="small"
                          type={action.primary ? "primary" : undefined}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                    <div className="module-stat">
                      <div className="stat-value">{module.stat.value}</div>
                      <div className="stat-label">{module.stat.label}</div>
                    </div>
                  </div>
                </ModuleCard>
              </Col>
            ))}
          </Row>
        </div>

        {/* 用户信息和其他卡片区域 (Keep as is) */}
        <Row gutter={[16, 16]}>
          {/* 用户信息卡片和新闻轮播 */}
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <InfoCard hoverable $isDark={isDark}>
                  <div className="user-info">
                    <Avatar size={64} className="user-avatar" icon={<UserOutlined />} />
                    <div className="user-meta">
                      <Title level={4} style={{ margin: 0 }}>企业管理员</Title>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text type="secondary">数商数据中心管理员</Text>
                        <span className="role-badge">高级分析师</span>
                      </div>
                      <div className="login-info">
                        <ClockCircleOutlined style={{ marginRight: 8 }} />
                        <Text type="secondary">上次登录: 2023-04-15 14:20:35</Text>
                      </div>
                    </div>
                    <div>
                      <Badge count={3} overflowCount={99}>
                        <Button
                          type="text"
                          icon={<MailOutlined />}
                          size="large"
                          onClick={() => message.info('您有3条未读消息')}
                        />
                      </Badge>
                    </div>
                  </div>

                  <div className="stats-row">
                    <div className="stat-item">
                      <div className="stat-value">8</div>
                      <div className="stat-label">待处理任务</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">92%</div>
                      <div className="stat-label">完成率</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">205</div>
                      <div className="stat-label">本月访问</div>
                    </div>
                  </div>

                  <Divider style={{ margin: '12px 0' }} />

                  <div className="user-actions">
                    <Button type="primary" icon={<UserOutlined />}>我的工作台</Button>
                    <Button icon={<SettingOutlined />}>个人设置</Button>
                    <Button icon={<QuestionCircleOutlined />}>使用指南</Button>
                  </div>
                </InfoCard>
              </Col>

              <Col xs={24}>
                {/* 新闻公告轮播 */}
                <NewsCarousel
                  autoplay
                  className={isDark ? 'theme-dark' : 'theme-light'}
                >
                  {newsData.map((news, index) => (
                    <div key={index}>
                      <CarouselCard $isDark={isDark} $type={news.type as any}>
                        <div className="news-badge">
                          {news.type === 'warning' ? '系统通知' : news.type === 'update' ? '功能更新' : '数据动态'}
                        </div>
                        <div className="news-date">
                          <CalendarOutlined className="date-icon" />
                          {news.date}
                        </div>
                        <div className="news-title">
                          <Text strong>{news.title}</Text>
                        </div>
                        <Paragraph style={{ marginBottom: 0 }}>{news.content}</Paragraph>
                        <div className="news-actions">
                          <Button type="link" size="small" icon={<ArrowRightOutlined />}>
                            查看详情
                          </Button>
                        </div>
                        <div
                          className="news-image"
                          style={{ backgroundImage: `url(${news.image})` }}
                        />
                      </CarouselCard>
                    </div>
                  ))}
                </NewsCarousel>
              </Col>

              <Col xs={24}>
                {/* 大图展示区 */}
                <ImageShowcase>
                  <div className="showcase-title">
                    <Title level={5} style={{ margin: 0 }}>数据应用场景</Title>
                  </div>
                  <div className="showcase-container">
                    {showcaseImages.map((image, index) => (
                      <div className="showcase-item" key={index}>
                        <img src={image.url} alt={image.caption} />
                        <div className="showcase-overlay">
                          <div className="showcase-caption">{image.caption}</div>
                          <div className="showcase-description">{image.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ImageShowcase>
              </Col>
            </Row>
          </Col>

          {/* 最近使用和小贴士 */}
          <Col xs={24} lg={8}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <RecentCard hoverable $isDark={isDark}>
                  <div className="recent-header">
                    <Title level={5} style={{ margin: 0 }}>最近访问</Title>
                    <Button type="link" size="small">查看全部</Button>
                  </div>
                  <List
                    className="recent-list"
                    itemLayout="horizontal"
                    dataSource={recentItems}
                    renderItem={(item) => (
                      <List.Item>
                        <div className={`recent-icon-container ${item.typeClass}`}>
                          {item.icon}
                        </div>
                        <div className="recent-info">
                          <div className="recent-title">{item.title}</div>
                          <div className="recent-meta">
                            <span className={`recent-tag ${item.typeClass}`}>
                              {item.type}
                            </span>
                            {item.time}
                          </div>
                          <Progress
                            percent={item.progress}
                            size="small"
                            showInfo={false}
                            strokeColor={
                              item.typeClass === 'type-model' ? '#2A6AFF' :
                              item.typeClass === 'type-dashboard' ? '#00C9A7' :
                              item.typeClass === 'type-dataset' ? '#FFC542' : '#865CD6'
                            }
                          />
                        </div>
                      </List.Item>
                    )}
                  />
                  <div className="recent-footer">
                    <Button type="link" icon={<ArrowRightOutlined />}>浏览历史记录</Button>
                  </div>
                </RecentCard>
              </Col>

              <Col xs={24}>
                <TipsCard hoverable $isDark={isDark}>
                  <div className="tip-header">
                    <Title level={5} style={{ margin: 0 }}>平台使用技巧</Title>
                    <Button type="link" size="small">更多技巧</Button>
                  </div>

                  {tipsData.map((tip, index) => (
                    <div key={index} className="tip-item">
                      <div className="tip-icon-container">
                        {tip.icon}
                      </div>
                      <div className="tip-content">
                        <div className="tip-title">{tip.title}</div>
                        <Paragraph style={{ marginBottom: 0, fontSize: 13 }}>
                          {tip.content}
                        </Paragraph>
                      </div>
                    </div>
                  ))}

                  <div className="tips-footer">
                    <Button type="link" icon={<ArrowRightOutlined />}>查看完整指南</Button>
                  </div>
                </TipsCard>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* 技术支持与帮助 (Keep as is) */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
            <SupportCard title="技术支持与帮助" hoverable $isDark={isDark}>
              <Row gutter={[24, 24]}>
                {supportData.map((support, index) => (
                  <Col xs={24} md={8} key={index}>
                    <div className="support-item">
                      <div className="support-icon-container">
                        {support.icon}
                      </div>
                      <div className="support-content">
                        <div><Text strong>{support.title}</Text></div>
                        <div><Text type="secondary">{support.description}</Text></div>
                      </div>
                      <RightOutlined className="support-action" />
                    </div>
                  </Col>
                ))}
              </Row>
            </SupportCard>
          </Col>
        </Row>
      </MainContent>
    </PageContainer>
  );
};

export default Welcome;