import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { PasswordField } from '../PasswordField/PasswordField';
import { useAuth } from '../../hooks/useAuth';
import { registerSchema } from '../../utils/validationSchemas';
import { getAuthErrorMessage } from '../../utils/getAuthErrorMessage';
import forms from '../../styles/forms.module.css';

interface RegisterFormProps {
  onSuccess: () => void;
}

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async (values: RegisterValues) => {
    try {
      await registerUser(values);
      toast.success('Account created');
      onSuccess();
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    }
  };

  return (
    <>
      <h2 className={forms.title}>Registration</h2>
      <p className={forms.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form
        className={forms.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className={forms.fields}>
          <div className={forms.field}>
            <input
              className={`${forms.input} ${errors.name ? forms.invalid : ''}`}
              type="text"
              placeholder="Name"
              autoComplete="name"
              {...register('name')}
            />
            {errors.name && (
              <span className={forms.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={forms.field}>
            <input
              className={`${forms.input} ${errors.email ? forms.invalid : ''}`}
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && (
              <span className={forms.error}>{errors.email.message}</span>
            )}
          </div>

          <PasswordField
            register={register('password')}
            error={errors.password?.message}
          />
        </div>

        <button className={forms.submit} type="submit" disabled={isSubmitting}>
          Sign Up
        </button>
      </form>
    </>
  );
};
