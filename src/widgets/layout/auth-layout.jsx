import React from 'react';
import {Image} from 'antd';


// AuthLayout Component
const AuthLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/img/background.webp')` }}
    >
      <div className="flex w-full max-w-[900px] bg-black/20 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
        <div className="w-1/2 p-8 flex items-center justify-center bg-black/40">
          <Image
            src="/img/logo.webp"
            alt="Logo"
            width={120}
            height={120}
            className="w-32 h-32"
          />
        </div>
        <div className="w-1/2 bg-white/10 backdrop-blur-md p-8 rounded-r-lg">
          {children}
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;