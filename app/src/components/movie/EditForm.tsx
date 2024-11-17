'use client';
import fetcher, { ResponseError } from '@/common/utils/fetcher';
import { movieSchema } from '@/lib/validation';
import axios from 'axios';
import { Formik } from 'formik';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

type Movie = {
  id: number;
  title: string;
  publishYear: number;
  poster: string;
};

function EditForm() {
  const [banner, setBanner] = useState<File | string>();
  const [bannerError, setBannerError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [publishYear, setPublishYear] = useState(0);

  const movieID = useParams().id;

  useEffect(() => {
    // Fetch movie details
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${movieID}`);

        setBanner(res.data.data.poster);
        setTitle(res.data.data.title);
        setPublishYear(res.data.data.publish_year);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, []);

  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setBanner(file);
        setBannerError(null);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div className="text-white h-full">
      <Formik
        initialValues={{
          title: title,
          publishYear: publishYear,
        }}
        onSubmit={async (values) => {
          if (banner === null) {
            setBannerError('Please upload a banner');
            return;
          }

          setLoading(true);

          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('publishYear', values.publishYear.toString());

          if (typeof banner === 'string') {
            formData.append('banner', banner as string);
          } else {
            formData.append('banner', banner as File);
          }

          try {
            const res = await axios.patch(
              '/api/movies/' + movieID,

              formData
            );

            if (res.data) {
              toast.success('Movie updated successfully', {
                style: {
                  backgroundColor: '#00ff0005',
                  color: 'white',
                },
              });
              window.history.back();
            }
          } catch (error) {
            const { message, status } = error as ResponseError;

            toast.error(message ?? 'Encountered an error', {
              style: {
                backgroundColor: '#ff000005',
                color: 'white',
              },
            });
          } finally {
            setLoading(false);
          }
        }}
        validationSchema={movieSchema}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            className="md:px-28 px-10 sm:gap-28 gap-16 lg:flex-row flex-col-reverse flex h-full"
          >
            <div>
              <div
                {...getRootProps()}
                className="bg-input-900 z-0 cursor-pointer h-full rounded-lg flex items-center justify-center aspect-square lg:w-[600px] w-full border-2 border-dashed border-white"
              >
                <input {...getInputProps()} />
                {banner ? (
                  <div className="relative h-full w-full group">
                    <Image
                      src={
                        typeof banner == 'string'
                          ? banner
                          : URL.createObjectURL(banner)
                      }
                      width={600}
                      height={600}
                      alt="banner"
                      className="rounded-lg object-cover h-full w-full"
                    />

                    <span className="absolute group-hover:block hidden bg-primary-950 px-3 py-2 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      Upload new image
                    </span>
                  </div>
                ) : (
                  <span className="flex flex-col items-center gap-2.5 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM13 7L11.59 5.59L9 8.17V0H7V8.17L4.41 5.59L3 7L8 12L13 7Z"
                        fill="white"
                      />
                    </svg>
                    Drop an image here
                  </span>
                )}
              </div>
              {bannerError && (
                <p className="text-error-500 mt-2">{bannerError}</p>
              )}

              <div className="grid lg:hidden grid-cols-2 gap-4 mt-16">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    window.history.back();
                  }}
                  className="border border-white rounded-lg py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-500 rounded-lg py-3"
                  disabled={isSubmitting}
                >
                  {loading ? 'Loading...' : 'Update'}
                </button>
              </div>
            </div>
            <div className="sm:w-[400px] w-full">
              <div className="flex flex-col">
                <input
                  type="title"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="Title"
                  className={`px-3 py-3 focus:outline-none focus:ring-0 placeholder:text-white text-white placeholder:text-sm bg-input-900 autofill:bg-input-900 rounded-lg ${errors.title && touched.title && '!border !border-error-500'}`}
                />
                <p className="text-xs mt-2 text-error-500">
                  {errors.title && touched.title && errors.title}
                </p>
              </div>
              <div className="mt-6 flex flex-col">
                <input
                  type="publishYear"
                  id="publishYear"
                  name="publishYear"
                  placeholder="Publishing Year"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.publishYear}
                  className=" px-3 py-3 text-white sm:w-[250px] w-full placeholder:text-white placeholder:text-sm bg-input-900 autofill:bg-input-900 rounded-lg"
                />
                <p className="text-xs mt-2 text-error-500">
                  {errors.publishYear &&
                    touched.publishYear &&
                    errors.publishYear}
                </p>
              </div>
              <div className="lg:grid hidden grid-cols-2 gap-4 mt-16">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    window.history.back();
                  }}
                  className="border border-white rounded-lg py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-500 rounded-lg py-3"
                  disabled={isSubmitting}
                >
                  {loading ? 'Loading...' : 'Update'}
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditForm;
