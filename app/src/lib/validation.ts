import * as Yup from 'yup';

export const signupSchema = Yup.object({
  name: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const movieSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  publishYear: Yup.number()
    .required('Publishing Year is required')
    .min(1900, 'Publishing Year must be at least 1900')
    .max(new Date().getFullYear(), `Publishing Year can't be in the future`)
    .typeError('Publishing Year must be a number'),
});
