import React, { ReactNode } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

interface CustomCardProps {
  title?: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const StyledCard = styled(Card)<{ $isDark: boolean; $hoverable: boolean }>`
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: none;
  box-shadow: ${props => props.$isDark 
    ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
    : '0 4px 12px rgba(0, 0, 0, 0.05)'};
  
  ${props => props.$hoverable && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.$isDark 
        ? '0 8px 16px rgba(0, 0, 0, 0.3)' 
        : '0 8px 16px rgba(0, 0, 0, 0.1)'};
    }
  `}
  
  .ant-card-head {
    border-bottom: ${props => props.$isDark 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(0, 0, 0, 0.05)'};
    padding: 16px 20px;
    min-height: 56px;
  }
  
  .ant-card-head-title {
    font-weight: 600;
    font-size: 16px;
  }
  
  .ant-card-body {
    padding: 20px;
  }
`;

const ModernCard: React.FC<CustomCardProps> = ({ 
  children, 
  title, 
  extra, 
  hoverable = false,
  bordered = false,
  className,
  style,
}) => {
  const { themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  
  return (
    <StyledCard
      title={title}
      extra={extra}
      bordered={bordered}
      $hoverable={hoverable}
      $isDark={isDark}
      className={className}
      style={style}
    >
      {children}
    </StyledCard>
  );
};

export default ModernCard;