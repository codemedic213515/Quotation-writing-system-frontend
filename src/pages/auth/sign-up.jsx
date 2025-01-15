import React from 'react';
import { Form, Input,  message } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/widgets/layout/auth-layout'

export function SignUp() {
 const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      console.log('Registration values:', values);
      message.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      message.error('Registration failed!');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">新規登録</h1>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label={<span className="text-white">ユーザー ID</span>}
            name="userId"
            rules={[{ required: true, message: 'Please input your User ID!' }]}
          >
            <Input className="bg-white/20 border-white/30 text-white " />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">名前</span>}
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input className="bg-white/20 border-white/30 text-white " />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">メール</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input className="bg-white/20 border-white/30 text-white " />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">パスワード</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className="bg-white/20 border-white/30 text-white " />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">パスワードを認証する</span>}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password className="bg-white/20 border-white/30 text-white " />
          </Form.Item>
<div className='right-0'>

          <button
            type="submit"
            className="w-1/2  px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            新規登録
          </button>
  </div>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
