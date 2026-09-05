import * as yup from 'yup';

const EMAIL_PATTERN = /^[\w.+-]+@[\w-]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^\+?\d{10,13}$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_PATTERN, 'Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_PATTERN, 'Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

export const appointmentSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  phone: yup
    .string()
    .trim()
    .required('Phone is required')
    .matches(PHONE_PATTERN, 'Enter a valid phone number'),
  time: yup.string().required('Meeting time is required'),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(EMAIL_PATTERN, 'Enter a valid email'),
  comment: yup
    .string()
    .trim()
    .required('Comment is required')
    .min(5, 'Comment must be at least 5 characters'),
});
