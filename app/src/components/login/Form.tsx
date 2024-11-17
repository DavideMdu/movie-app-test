'use client';
import fetcher, { ResponseError } from '@/common/utils/fetcher';
import { loginSchema } from '@/lib/validation';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

type Props = {};

function Form() {
  const router = useRouter();

  const loginHandler = async (values: { email: string; password: string }) => {
    try {
      const res = await fetcher({
        path: '/login',
        method: 'POST',
        data: values,
      });

      if (res) {
        toast.success('Login successful', {
          style: {
            backgroundColor: '#00ff0005',
            color: 'white',
          },
        });
        router.replace('/');
      }
    } catch (error) {
      toast.error('Invalid credentials', {
        style: {
          backgroundColor: '#ff000005',
          color: 'white',
        },
      });
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={loginHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <h1 className="heading-one text-center !font-semibold text-white">
                Sign in
              </h1>
            </div>

            {/* Email field */}
            <div className="mt-10 flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
                className={`px-3 py-2 placeholder:text-white text-white placeholder:text-sm bg-input-900 autofill:bg-input-900 rounded-lg w-[300px] ${errors.email && touched.email && '!border !border-error-500'}`}
              />
              <p className="text-xs mt-2 text-error-500">
                {errors.email && touched.email && errors.email}
              </p>
            </div>

            {/* Password field */}
            <div className="mt-6">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={` px-3 py-2 text-white placeholder:text-white placeholder:text-sm bg-input-900 autofill:bg-input-900 rounded-lg w-[300px] ${errors.password && touched.password && '!border !border-error-500'}`}
              />
              <p className="text-xs mt-2 text-error-500">
                {errors.password && touched.password && errors.password}
              </p>
            </div>

            {/* Remember me */}
            <div className="mt-6 flex items-center justify-center">
              <label
                htmlFor="remember"
                className="text-white flex items-center cursor-pointer"
              >
                <span className="w-4 h-4 relative">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="peer appearance-none w-full h-full rounded-sm bg-input-900 focus:outline-none"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="peer-checked:block hidden w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 14.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11"
                      color="#ffffff"
                    />
                  </svg>
                </span>
                <span className="ml-2">Remember me</span>
              </label>
            </div>

            {/* Submit button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-500 text-white py-2 rounded-lg"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Form;
