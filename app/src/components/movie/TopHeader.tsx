'use client';
import { logout } from '@/app/movies/actions/actions';
import Link from 'next/link';
import React from 'react';

type Props = {};

function TopHeader({}: Props) {
  return (
    <div className="flex md:p-28 p-10 text-white justify-between items-center">
      <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-semibold flex items-center gap-3">
        My movies{' '}
        <Link href="/movies/create" title="Post a movie">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3_196)">
              <path
                d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_3_196">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </h1>
      <button onClick={() => logout()} className="flex items-center gap-3">
        <span className="sm:inline-block hidden font-semibold">Logout</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.6667 6.66667L16.7867 8.54667L18.8933 10.6667H8V13.3333H18.8933L16.7867 15.44L18.6667 17.3333L24 12L18.6667 6.66667ZM2.66667 2.66667H12V0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H12V21.3333H2.66667V2.66667Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}

export default TopHeader;
