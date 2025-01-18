import React, { useContext } from 'react';
import { Form, Input, Checkbox, message, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/widgets/layout/auth-layout';
import { AuthContext } from '@/widgets/layout/auth-layout';

export function SignIn() {
  const { login } = useContext(AuthContext); // Correct usage of useContext
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values.name, values.password);
      message.success('Login successful!');
      navigate('/');
    } catch (error) {
      message.error('Login failed!');
    }
  };

  return (
    <AuthLayout>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/img/background.webp')` }}
      >
        <div className="flex w-full max-w-[900px] bg-[#00000080] backdrop-blur-sm border border-[#707070] rounded-lg shadow-2xl overflow-hidden">
          <div className="w-1/2 p-8 flex items-center justify-center border border-[#707070] bg-[#00000066]">
            <Image
              src="/img/logo.webp"
              alt="Logo"
              width={150}
              height={120}
              className="w-32 h-32"
              preview={false}
            />
          </div>
          <div className="w-1/2 bg-white/10 backdrop-blur-md p-8 rounded-r-lg">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">ログイン</h1>
              </div>

              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  label={<span className="text-white">名前</span>}
                  name="name"
                  rules={[
                    { required: true, message: 'Please input your User ID!' },
                  ]}
                >
                  <Input className="bg-white text-black" allowClear />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white">パスワード</span>}
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password
                    className="bg-white border-white/30 text-black"
                    allowClear
                  />
                </Form.Item>

                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-white ">
                      ログイン状態を保存する
                    </Checkbox>
                  </Form.Item>
                </Form.Item>

                <div className="flex justify-between space-x-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    ログイン
                  </button>
                  <button
                    onClick={() => navigate('/auth/sign-up')}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-center"
                  >
                    新規登録
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignIn;
