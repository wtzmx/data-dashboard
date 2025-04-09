import React from 'react';
import { Card, Form, Input, Button, Switch, Select, Space, Divider, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('设置已保存');
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <h1>系统设置</h1>
      
      <Card title="常规设置">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            systemName: '数据管理仪表盘',
            language: 'zh_CN',
            recordsPerPage: 10,
            enableNotifications: true,
            dataRefreshInterval: 5,
          }}
        >
          <Form.Item
            name="systemName"
            label="系统名称"
            rules={[{ required: true, message: '请输入系统名称' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item name="language" label="系统语言" rules={[{ required: true }]}>
            <Select>
              <Option value="zh_CN">简体中文</Option>
              <Option value="en_US">English (US)</Option>
              <Option value="ja_JP">日本語</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="recordsPerPage" label="每页记录数" rules={[{ required: true }]}>
            <Select>
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={50}>50</Option>
              <Option value={100}>100</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="enableNotifications" label="启用通知" valuePropName="checked">
            <Switch />
          </Form.Item>
          
          <Form.Item name="dataRefreshInterval" label="数据刷新间隔（分钟）" rules={[{ required: true }]}>
            <Select>
              <Option value={1}>1</Option>
              <Option value={5}>5</Option>
              <Option value={10}>10</Option>
              <Option value={30}>30</Option>
              <Option value={60}>60</Option>
            </Select>
          </Form.Item>
          
          <Divider />
          
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
      <Card title="个人信息">
        <Form
          layout="vertical"
          initialValues={{
            userName: '管理员',
            email: 'admin@example.com',
          }}
        >
          <Form.Item
            name="userName"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="currentPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password />
          </Form.Item>
          
          <Form.Item
            name="newPassword"
            label="新密码"
          >
            <Input.Password />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['newPassword']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不匹配'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          
          <Divider />
          
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              更新信息
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default Settings;