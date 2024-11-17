'use client';
import Pagination from '@/components/UI/Pagination';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

type Movie = {
  id: string;
  title: string;
  publish_year: number;
  poster: string;
};

export default function MoviesList() {
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/movies', {
        params: {
          page,
          itemsPerPage: 8,
        },
      });

      setMovies(res.data.data);

      setTotalPages(Math.ceil(res.data.totalMovies / 8));
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, [page]);
  return (
    <div className="h-full">
      {/* Movies list */}
      {loading ? (
        <div className="h-full py-10">
          {/* Spinner */}
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-800"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 md:pb-28 md:px-28 pb-10 px-5 text-white">
            {movies?.length > 0 ? (
              movies?.map((movie, index) => (
                <div
                  onClick={() => {
                    router.push(`/movies/edit/${movie.id}`);
                  }}
                  key={index}
                  className="bg-card-950 z-20 p-2 pb-4 rounded-xl"
                >
                  <Image
                    src={movie.poster}
                    width={500}
                    height={500}
                    alt="image"
                    className="w-full aspect-[30/41] object-cover rounded-xl"
                  />

                  <h2 className="px-2 py-4 font-medium md:text-xl text-lg">
                    {movie.title}
                  </h2>
                  <p className="px-2 text-sm">{movie.publish_year}</p>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full text-xl font-medium text-white w-full">
                No movies found
              </div>
            )}
          </div>
          {/* Paginate */}
          {totalPages > 0 && (
            <div className="flex justify-center pb-52 gap-4">
              <Pagination
                totalPages={totalPages}
                onPageChange={(page) => {
                  setPage(page);
                }}
                page={page}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
