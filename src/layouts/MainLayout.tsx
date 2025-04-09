import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, theme, Typography, Avatar, Divider } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  BulbOutlined,
  UserOutlined,
  HomeOutlined,
  FundViewOutlined,
  DatabaseOutlined,
  SafetyCertificateOutlined,
  SwapOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';
import styled from 'styled-components';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface ThemeProps {
  isDark: boolean;
}

// 侧边栏宽度定义
const SIDER_WIDTH_EXPANDED = 250;
const SIDER_WIDTH_COLLAPSED = 80;

// Styled Components (移除未使用的 StyledLayout)
// const StyledLayout = styled(Layout)<{ theme: ThemeProps }>` // <--- 移除这行
//   min-height: 100vh;                                       // <--- 移除这行
// `;                                                           // <--- 移除这行

const StyledSiderWrapper = styled.div<{ $isDark: boolean; $collapsed: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 10;
  background-color: ${props => props.$isDark ? '#1E293B' : '#FFFFFF'};
  box-shadow: ${props => props.$isDark ? '1px 0 8px rgba(0, 0, 0, 0.4)' : '1px 0 8px rgba(0, 0, 0, 0.05)'};
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.2s;
  width: ${props => props.$collapsed ? SIDER_WIDTH_COLLAPSED : SIDER_WIDTH_EXPANDED}px;

  .ant-layout-sider {
    background-color: transparent !important;
    height: 100%;
  }

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ant-layout-sider-trigger {
    display: none;
  }
`;

// --- 修改：调整 StyledLogo 样式以容纳图片和文字 ---
const StyledLogo = styled.div<{ theme: ThemeProps }>`
  /* height: 64px; // 可以根据需要调整或移除固定高度 */
  padding: 16px; // 使用内边距替代 margin
  margin-bottom: 8px; // 与菜单的间距
  display: flex;
  flex-direction: column; // 垂直排列
  align-items: center; // 水平居中
  justify-content: center; // 垂直居中（如果需要固定高度）
  color: ${props => props.theme.isDark ? '#E2E8F0' : '#1E293B'};
  transition: all 0.3s ease;
  flex-shrink: 0;

  img { // 给图片设置样式
    height: 40px; // 设置 logo 高度
    margin-bottom: 12px; // 图片和文字之间的间距
  }

  span { // 给文字设置样式
    font-size: 18px; // 调整文字大小
    font-weight: 600;
    text-align: center; // 文字居中
    line-height: 1.2; // 调整行高
    display: block; // 确保文字块级显示
  }
`;

const StyledHeader = styled(Header)<{ theme: ThemeProps }>`
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${props => props.theme.isDark ? '0 2px 8px rgba(0, 0, 0, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  transition: background-color 0.3s ease;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledContent = styled(Content)<{ theme: ThemeProps }>`
  margin: 24px;
  padding: 24px;
  background: ${props => props.theme.isDark ? '#1E293B' : '#FFFFFF'};
  border-radius: 12px;
  box-shadow: ${props => props.theme.isDark ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 0, 0, 0.05)'};
  transition: background-color 0.3s ease;
  overflow: auto;
`;

const UserInfo = styled.div<{ theme: ThemeProps }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const MenuFooter = styled.div`
  margin-top: auto;
  padding: 16px;
  text-align: center;
  flex-shrink: 0;
`;

const StyledMenu = styled(Menu)<{ $isDark: boolean }>`
  background-color: transparent !important;
  color: ${props => props.$isDark ? '#E2E8F0' : '#1E293B'};
  border-right: none !important;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;

  .ant-menu-item {
    color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.85)' : 'rgba(30, 41, 59, 0.85)'};
    margin: 8px 12px;
    border-radius: 6px;
    height: 45px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: ${props => props.$isDark ? '#334155' : '#F1F5F9'};
      color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
    }

    &.ant-menu-item-selected {
      background-color: ${props => props.$isDark ? '#334155' : '#F1F5F9'};
      color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
      font-weight: 500;

      &:after {
        display: none;
      }
    }
  }

  .ant-menu-item-icon {
    color: ${props => props.$isDark ? 'rgba(226, 232, 240, 0.85)' : 'rgba(30, 41, 59, 0.85)'};
    margin-right: 10px;
    font-size: 18px;
  }

  .ant-menu-item-selected .ant-menu-item-icon {
    color: ${props => props.$isDark ? '#5B8AF9' : '#2A6AFF'};
  }

  &.ant-menu-inline-collapsed {
    .ant-menu-item {
      padding: 0 calc(50% - 16px) !important;
    }
    /* 折叠时隐藏文字标题 */
    .logo-text {
       display: none;
    }
  }
`;


const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { themeMode, toggleTheme } = useTheme();
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    // ... (getSelectedKey 函数保持不变) ...
    const path = location.pathname;
    if (path.includes('/dashboard')) return '1';
    if (path.includes('/analysis')) return '2';
    if (path.includes('/visualization')) return '3';
    if (path.includes('/database')) return '6';
    if (path.includes('/governance')) return '7';
    if (path.includes('/integration')) return '8';
    if (path.includes('/settings')) return '4';
    if (path.includes('/welcome')) return '5';
    if (path === '/') return '5';
    return '5';
  };

  const isDarkTheme = themeMode === 'dark';

  return (
    <Layout style={{ minHeight: '100vh' }}> {/* 使用内联样式 */}
      <StyledSiderWrapper $isDark={isDarkTheme} $collapsed={collapsed}>
        <Sider
          collapsible
          collapsed={collapsed}
          width={SIDER_WIDTH_EXPANDED}
          collapsedWidth={SIDER_WIDTH_COLLAPSED}
          style={{ background: 'transparent', transition: 'none' }}
          trigger={null}
        >
          {/* --- 修改：在 StyledLogo 内部添加 img 标签 --- */}
          <StyledLogo theme={{ isDark: isDarkTheme }}>
            <img
              src="/logo.png" // 引用 public 目录下的 logo.png
              alt="数商 Logo" // 添加 alt 文本
              // style={{ height: '40px', marginBottom: '12px' }} // 可以在这里设置样式，或者在 StyledLogo css 中设置
            />
            {/* 根据 collapsed 状态决定是否显示文字 */}
            {!collapsed && <span className="logo-text">数商数据中心管理平台</span>}
             {/* 如果折叠时也想显示缩写文字，可以取消注释下面这行 */}
             {/* {collapsed && <span className="logo-text">数商</span>} */}
          </StyledLogo>

          <StyledMenu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            $isDark={isDarkTheme}
            inlineCollapsed={collapsed}
            onClick={({ key }) => {
              // ... (onClick 函数保持不变) ...
              switch (key) {
                case '1': navigate('/dashboard'); break;
                case '2': navigate('/analysis'); break;
                case '3': navigate('/visualization'); break;
                case '4': navigate('/settings'); break;
                case '5': navigate('/welcome'); break;
                case '6': navigate('/database'); break;
                case '7': navigate('/governance'); break;
                case '8': navigate('/integration'); break;
                default: break; // 点击外部链接时不做任何导航
              }
            }}
            items={[
              // ... (items 数组保持不变，包含外部链接) ...
              { key: '5', icon: <HomeOutlined />, label: '欢迎页' },
              { key: '1', icon: <DashboardOutlined />, label: '数据资源门户' },
              { key: '6', icon: <DatabaseOutlined />, label: '数据库管理' },
              { key: '7', icon: <SafetyCertificateOutlined />, label: '数据治理中心' },
              { key: '8', icon: <SwapOutlined />, label: '数据集成平台' },
              { key: '2', icon: <BarChartOutlined />, label: '大数据分析中心' },
              {
                key: '9',
                icon: <AreaChartOutlined />,
                label: (
                  <a href="/my-external-page/index.html" target="_blank" rel="noopener noreferrer">
                    大数据数据看板
                  </a>
                ),
              },
              { key: '3', icon: <FundViewOutlined />, label: '可视化展示平台' },
              { type: 'divider' },
              { key: '4', icon: <SettingOutlined />, label: '系统设置' },
            ]}
          />

          {!collapsed && (
            <MenuFooter>
              <Divider style={{ margin: '8px 0' }} />
              <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                数据中心 V1.0.0
              </Typography.Text>
            </MenuFooter>
          )}
        </Sider>
      </StyledSiderWrapper>

      <Layout
        style={{
          marginLeft: collapsed ? SIDER_WIDTH_COLLAPSED : SIDER_WIDTH_EXPANDED,
          transition: 'margin-left 0.2s',
        }}
      >
        <StyledHeader
          style={{ background: token.colorBgContainer }}
          theme={{ isDark: isDarkTheme }}
        >
           {/* Header 内容保持不变 */}
           <HeaderLeft>
             <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 48, height: 48 }}
            />
            <Title level={4} style={{ margin: '0 0 0 16px' }}>
               {getSelectedKey() === '5' && '欢迎页'}
              {getSelectedKey() === '1' && '数据资源门户'}
              {getSelectedKey() === '2' && '大数据分析中心'}
              {getSelectedKey() === '3' && '可视化展示平台'}
              {getSelectedKey() === '4' && '系统设置'}
              {getSelectedKey() === '6' && '数据库管理'}
              {getSelectedKey() === '7' && '数据治理中心'}
              {getSelectedKey() === '8' && '数据集成平台'}
            </Title>
          </HeaderLeft>

          <HeaderRight>
            <Button
              type="primary"
              icon={<BulbOutlined />}
              onClick={toggleTheme}
              shape="circle"
              size="large"
            />
            <UserInfo theme={{ isDark: isDarkTheme }}>
              <Avatar icon={<UserOutlined />} />
              <span style={{ display: collapsed ? 'none' : 'inline', marginLeft: 8 }}>
                  <Typography.Text>管理员</Typography.Text>
              </span>
            </UserInfo>
          </HeaderRight>
        </StyledHeader>
        <StyledContent theme={{ isDark: isDarkTheme }}>
          <Outlet />
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default MainLayout;