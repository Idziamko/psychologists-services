import { StarIcon } from '../icons/StarIcon';
import type { Review } from '../../types/psychologist';
import { formatRating, getInitial } from '../../utils/formatRating';
import styles from './ReviewsList.module.css';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => (
  <ul className={styles.list}>
    {reviews.map(review => (
      <li className={styles.item} key={review.reviewer}>
        <div className={styles.user}>
          <span className={styles.avatar}>{getInitial(review.reviewer)}</span>
          <div className={styles.userText}>
            <p className={styles.reviewer}>{review.reviewer}</p>
            <p className={styles.rating}>
              <StarIcon />
              {formatRating(review.rating)}
            </p>
          </div>
        </div>
        <p className={styles.comment}>{review.comment}</p>
      </li>
    ))}
  </ul>
);
