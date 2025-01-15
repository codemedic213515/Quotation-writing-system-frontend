import React from 'react';
import { Form, Input,  message } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../widgets/layout/auth-layout'

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
          <h1 className="text-2xl font-bold text-white">Register</h1>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label={<span className="text-white">User ID</span>}
            name="userId"
            rules={[{ required: true, message: 'Please input your User ID!' }]}
          >
            <Input className="bg-white/20 border-white/30 text-white placeholder-white/50" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Name</span>}
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input className="bg-white/20 border-white/30 text-white placeholder-white/50" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input className="bg-white/20 border-white/30 text-white placeholder-white/50" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className="bg-white/20 border-white/30 text-white placeholder-white/50" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Confirm Password</span>}
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
            <Input.Password className="bg-white/20 border-white/30 text-white placeholder-white/50" />
          </Form.Item>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
