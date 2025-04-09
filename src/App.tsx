import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme, ThemeProvider } from './context/ThemeContext';
import { getThemeConfig } from './themes/theme';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import BigDataAnalysis from './pages/Analysis';
import VisualizationPlatform from './pages/VisualizationPlatform';
import DatabaseManagement from './pages/DatabaseManagement';
import DataGovernance from './pages/DataGovernance';
import Settings from './pages/Settings';
// --- 新增：导入数据集成平台页面 ---
import DataIntegrationPlatform from './pages/DataIntegrationPlatform'; 

const AppContent = () => {
  const { themeMode } = useTheme();
  const themeConfig = getThemeConfig(themeMode);

  return (
    <ConfigProvider theme={themeConfig}>
      <Router>
        <Routes>
          {/* 使用 MainLayout 作为所有主要页面的布局 */}
          <Route path="/" element={<MainLayout />}>
            {/* 默认首页/欢迎页 */}
            <Route index element={<Welcome />} /> 
            <Route path="welcome" element={<Welcome />} /> 

            {/* 各功能页面路由 */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analysis" element={<BigDataAnalysis />} />
            <Route path="visualization" element={<VisualizationPlatform />} />
            <Route path="database" element={<DatabaseManagement />} />
            <Route path="governance" element={<DataGovernance />} />
            {/* --- 新增：添加数据集成平台路由 --- */}
            <Route path="integration" element={<DataIntegrationPlatform />} /> 
            <Route path="settings" element={<Settings />} />
            
            {/* 未匹配路由重定向到首页 */}
            <Route path="*" element={<Navigate to="/" replace />} /> 
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

function App() {
  return (
    // 全局包裹 ThemeProvider 以提供主题上下文
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;