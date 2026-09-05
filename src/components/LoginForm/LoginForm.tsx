import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { PasswordField } from '../PasswordField/PasswordField';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema } from '../../utils/validationSchemas';
import { getAuthErrorMessage } from '../../utils/getAuthErrorMessage';
import forms from '../../styles/forms.module.css';

interface LoginFormProps {
  onSuccess: () => void;
}

type LoginValues = {
  email: string;
  password: string;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      await login(values);
      toast.success('Welcome back!');
      onSuccess();
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    }
  };

  return (
    <>
      <h2 className={forms.title}>Log In</h2>
      <p className={forms.description}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
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
          Log In
        </button>
      </form>
    </>
  );
};
