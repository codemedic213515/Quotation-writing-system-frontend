import React, { useContext } from 'react';
import { Form, Input, message, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/widgets/layout/auth-layout';
import { AuthContext } from '@/widgets/layout/auth-layout';

export function SignUp() {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const onFinish = async (values) => {
        try {
            await register(values.email, values.password, values.code, values.name);
            message.success('Registration successful!');
            navigate('/auth/sign-in');
        } catch (error) {
            message.error('Registration failed!');
        }
    };

    return (
        <AuthLayout>
               <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url('/img/background.webp')` }}
            >
                <div className="flex w-full max-w-[900px] bg-[#00000080] backdrop-blur-sm border border-[#707070] rounded-lg shadow-2xl overflow-hidden">
                    <div className="w-1/2 p-8 flex items-center justify-center border border-[#707070] bg-[#00000066] flex-col gap-10">
                        <Image
                            src="/img/logo.webp"
                            alt="Logo"
                            width={150}
                            height={120}
                            className="w-32 h-32"
                            preview={false}
                        />
                        <b className='text-white/80 text-lg'>見積書作成システム</b>
                    </div>
                    <div className="w-1/2 bg-white/10 backdrop-blur-md p-8 rounded-r-lg">
                       
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
            label={<span className="text-white">ユーザー code</span>}
            name="code"
            rules={[{ required: true, message: 'Please input your User code!' }]}
          >
            <Input className="bg-white border-white/30 text-black " allowClear />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">名前</span>}
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input className="bg-white border-white/30 text-black "allowClear  />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">メール</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input className="bg-white border-white/30 text-black "allowClear  />
          </Form.Item>
          <Form.Item
            label={<span className="text-white">パスワード</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className="bg-white border-white/30 text-black " allowClear />
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
            <Input.Password className="bg-white border-white/30 text-BLACK " allowClear />
          </Form.Item>
          <div className="flex justify-between space-x-4 ">
            <button
             onClick={() => navigate('/auth/sign-in')}
              type=""
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              ログイン
            </button>
            <button
              type="submit"
              className=" w-1/2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors ml-auto"
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

export default SignUp;
