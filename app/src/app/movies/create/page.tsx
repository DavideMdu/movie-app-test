import CreateForm from '@/components/movie/CreateForm';
import React from 'react';

type Props = {};

export default function page() {
  return (
    <div className="h-full">
      <div className="flex md:p-28 p-10 text-white justify-between items-center">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-semibold flex items-center gap-3">
          Create a new movie
        </h1>
      </div>

      {/* Form */}
      <CreateForm />
    </div>
  );
}
