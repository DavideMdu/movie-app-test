import fetcher from '@/common/utils/fetcher';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center  justify-center">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-5xl text-[38px] leading-[44px] text-center text-white font-semibold">
          Your movie list is empty
        </h1>
        <Link
          href={'/movies'}
          className="bg-primary-500 w-max px-7 py-4 text-white rounded-lg  font-bold"
        >
          Add a new movie
        </Link>
      </div>
    </div>
  );
}
