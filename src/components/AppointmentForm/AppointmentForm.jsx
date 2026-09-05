import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { TimeSelect } from '../TimeSelect/TimeSelect';
import { appointmentSchema } from '../../utils/validationSchemas';
import forms from '../../styles/forms.module.css';
import styles from './AppointmentForm.module.css';

export const AppointmentForm = ({ psychologist, onSuccess }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      name: '',
      phone: '',
      time: '',
      email: '',
      comment: '',
    },
  });

  const onSubmit = async () => {
    toast.success('Your appointment request has been sent');
    onSuccess();
  };

  return (
    <>
      <h2 className={forms.title}>Make an appointment with a psychologists</h2>
      <p className={forms.description}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      <div className={styles.psychologist}>
        <img
          className={styles.avatar}
          src={psychologist.avatar_url}
          alt={psychologist.name}
          width="44"
          height="44"
          loading="lazy"
        />
        <div className={styles.psychologistText}>
          <span className={styles.caption}>Your psychologists</span>
          <span className={styles.psychologistName}>{psychologist.name}</span>
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <div className={forms.field}>
          <input
            className={`${forms.input} ${errors.name ? forms.invalid : ''}`}
            type="text"
            placeholder="Name"
            {...register('name')}
          />
          {errors.name && (
            <span className={forms.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.row}>
          <div className={forms.field}>
            <input
              className={`${forms.input} ${errors.phone ? forms.invalid : ''}`}
              type="tel"
              placeholder="+380"
              {...register('phone')}
            />
            {errors.phone && (
              <span className={forms.error}>{errors.phone.message}</span>
            )}
          </div>

          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <TimeSelect
                value={field.value}
                onChange={field.onChange}
                error={errors.time?.message}
              />
            )}
          />
        </div>

        <div className={forms.field}>
          <input
            className={`${forms.input} ${errors.email ? forms.invalid : ''}`}
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && (
            <span className={forms.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={forms.field}>
          <textarea
            className={`${forms.input} ${forms.textarea} ${errors.comment ? forms.invalid : ''}`}
            placeholder="Comment"
            {...register('comment')}
          />
          {errors.comment && (
            <span className={forms.error}>{errors.comment.message}</span>
          )}
        </div>

        <button className={forms.submit} type="submit" disabled={isSubmitting}>
          Send
        </button>
      </form>
    </>
  );
};
