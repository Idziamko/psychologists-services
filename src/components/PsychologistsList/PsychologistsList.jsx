import { PsychologistCard } from '../PsychologistCard/PsychologistCard';
import styles from './PsychologistsList.module.css';

export const PsychologistsList = ({ psychologists }) => (
  <ul className={styles.list}>
    {psychologists.map(psychologist => (
      <li key={psychologist.id}>
        <PsychologistCard psychologist={psychologist} />
      </li>
    ))}
  </ul>
);
