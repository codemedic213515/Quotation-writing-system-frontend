import React from 'react';
import {Image} from 'antd';


// AuthLayout Component
const AuthLayout = ({ children }) => {
  return (
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