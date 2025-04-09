import { theme } from 'antd';

export type ThemeMode = 'light' | 'dark';

// 简洁现代的亮色主题
export const lightTheme = {
  // 主色调
  colorPrimary: '#2A6AFF', // 更鲜明的蓝色
  colorSuccess: '#00C9A7', // 清新的绿松石色
  colorWarning: '#FFC542', // 明亮的黄色
  colorError: '#FF6B6B',   // 柔和的红色
  colorInfo: '#2A6AFF',    // 与主色相同
  
  // 背景和文本
  colorBgBase: '#F8FAFC',  // 更柔和的背景色
  colorTextBase: '#1E293B', // 较深的文字颜色，提高可读性
  
  // 其他全局样式
  borderRadius: 8,         // 更大的圆角
  wireframe: false,        // 无线框模式，更现代
  
  // 字体和边框
  fontSize: 14,
  controlHeight: 36,       // 更高的控件，更现代
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', // 轻微阴影增加层次感
  
  // 额外的自定义令牌
  colorBgContainer: '#FFFFFF',
  colorBgElevated: '#FFFFFF',
  colorBorder: '#E2E8F0',
  colorSplit: '#E2E8F0',
};

// 高级大气的暗色主题
export const darkTheme = {
  // 主色调
  colorPrimary: '#5B8AF9',  // 稍亮的蓝色，暗色背景更易辨识
  colorSuccess: '#18D2BA',  // 明亮的青绿色
  colorWarning: '#FFD662',  // 稍亮的黄色
  colorError: '#FF7A7A',    // 稍亮的红色
  colorInfo: '#5B8AF9',     // 与主色相同
  
  // 背景和文本
  colorBgBase: '#0F172A',   // 深蓝黑色，高级感
  colorTextBase: '#E2E8F0', // 柔和的白色文本，降低亮度刺激
  
  // 其他全局样式
  borderRadius: 8,
  wireframe: false,
  
  // 字体和边框
  fontSize: 14,
  controlHeight: 36,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)', // 更强的阴影
  
  // 额外的自定义令牌
  colorBgContainer: '#1E293B', // 容器背景色，比基础稍亮
  colorBgElevated: '#1E293B',  // 悬浮元素背景
  colorBorder: '#334155',      // 边框颜色
  colorSplit: '#334155',       // 分割线颜色
};

// 扩展主题配置，添加自定义组件样式
export const getThemeConfig = (mode: ThemeMode) => {
  const themeConfig = mode === 'light' ? lightTheme : darkTheme;
  
  return {
    algorithm: mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: themeConfig,
    components: {
      Card: {
        colorBgContainer: themeConfig.colorBgContainer,
        boxShadow: themeConfig.boxShadow,
      },
      Button: {
        controlHeight: themeConfig.controlHeight,
        borderRadius: themeConfig.borderRadius,
      },
      Menu: {
        colorItemBg: mode === 'light' ? '#FFFFFF' : '#1E293B',
        colorSubItemBg: mode === 'light' ? '#FFFFFF' : '#1E293B',
        colorItemText: themeConfig.colorTextBase,
        colorItemTextSelected: mode === 'light' ? '#2A6AFF' : '#5B8AF9',
        colorItemBgSelected: mode === 'light' ? '#F1F5F9' : '#334155',
        colorItemBgHover: mode === 'light' ? '#F1F5F9' : '#334155',
        colorItemTextHover: mode === 'light' ? '#2A6AFF' : '#5B8AF9',
      },
      Table: {
        colorBgContainer: themeConfig.colorBgContainer,
        borderRadius: themeConfig.borderRadius,
      },
      Layout: {
        colorBgHeader: mode === 'light' ? '#FFFFFF' : '#1E293B',
        colorBgBody: themeConfig.colorBgBase,
        colorBgTrigger: mode === 'light' ? '#FFFFFF' : '#1E293B',
        colorBgSider: mode === 'light' ? '#FFFFFF' : '#1E293B',
      },
    },
  };
};