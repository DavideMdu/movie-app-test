import React from 'react';
import Image from 'next/image';
import LoginForm from '@/components/login/Form';

type Props = {};

function page() {
  return (
    <div className="w-full h-screen">
      <div className=" w-full h-full flex items-center justify-center px-5">
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
