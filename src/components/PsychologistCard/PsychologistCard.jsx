import { useState } from 'react';
import toast from 'react-hot-toast';
import { HeartIcon } from '../icons/HeartIcon';
import { StarIcon } from '../icons/StarIcon';
import { OnlineDot } from '../icons/OnlineDot';
import { ReviewsList } from '../ReviewsList/ReviewsList';
import { Modal } from '../Modal/Modal';
import { AppointmentForm } from '../AppointmentForm/AppointmentForm';
import { useAuth } from '../../hooks/useAuth';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './PsychologistCard.module.css';

export const PsychologistCard = ({ psychologist }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    id,
    name,
    avatar_url: avatarUrl,
    experience,
    license,
    specialization,
    initial_consultation: initialConsultation,
    about,
    rating,
    price_per_hour: pricePerHour,
    reviews = [],
  } = psychologist;

  const isLiked = isFavorite(id);

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      toast.error('This feature is available only for authorized users');
      return;
    }

    toggleFavorite(id);
  };

  return (
    <article className={styles.card}>
      <div className={styles.avatarFrame}>
        <img
          className={styles.avatar}
          src={avatarUrl}
          alt={name}
          width="96"
          height="96"
          loading="lazy"
        />
        <OnlineDot className={styles.online} />
      </div>

      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <p className={styles.role}>Psychologist</p>
            <h2 className={styles.name}>{name}</h2>
          </div>

          <div className={styles.meta}>
            <p className={styles.rating}>
              <StarIcon />
              Rating: {rating}
            </p>
            <span className={styles.divider} />
            <p className={styles.price}>
              Price / 1 hour:{' '}
              <span className={styles.priceValue}>{pricePerHour}$</span>
            </p>
            <button
              className={
                isLiked ? `${styles.heart} ${styles.liked}` : styles.heart
              }
              type="button"
              onClick={handleFavoriteClick}
              aria-label={
                isLiked ? 'Remove from favorites' : 'Add to favorites'
              }
              aria-pressed={isLiked}
            >
              <HeartIcon isFilled={isLiked} />
            </button>
          </div>
        </div>

        <div className={styles.chips}>
          <ul className={styles.chipRow}>
            <li className={styles.chip}>
              Experience: <span className={styles.chipValue}>{experience}</span>
            </li>
            <li className={styles.chip}>
              License: <span className={styles.chipValue}>{license}</span>
            </li>
          </ul>
          <ul className={styles.chipRow}>
            <li className={styles.chip}>
              Specialization:{' '}
              <span className={styles.chipValue}>{specialization}</span>
            </li>
            <li className={styles.chip}>
              Initial_consultation:{' '}
              <span className={styles.chipValue}>{initialConsultation}</span>
            </li>
          </ul>
        </div>

        <p className={styles.about}>{about}</p>

        {isExpanded ? (
          <>
            <div className={styles.reviews}>
              <ReviewsList reviews={reviews} />
            </div>
            <button
              className={styles.appointment}
              type="button"
              onClick={() => setIsAppointmentOpen(true)}
            >
              Make an appointment
            </button>
          </>
        ) : (
          <button
            className={styles.readMore}
            type="button"
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}
      </div>

      {isAppointmentOpen && (
        <Modal
          onClose={() => setIsAppointmentOpen(false)}
          width={600}
          title="Make an appointment"
        >
          <AppointmentForm
            psychologist={psychologist}
            onSuccess={() => setIsAppointmentOpen(false)}
          />
        </Modal>
      )}
    </article>
  );
};
