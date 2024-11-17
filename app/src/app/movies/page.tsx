import React from 'react';
import MoviesList from '.';
import Link from 'next/link';
import { logout } from './actions/actions';
import TopHeader from '@/components/movie/TopHeader';

type Props = {};

function page() {
  return (
    <div className="">
      <TopHeader />

      {/* Movie list */}
      <MoviesList />
    </div>
  );
}

export default page;
