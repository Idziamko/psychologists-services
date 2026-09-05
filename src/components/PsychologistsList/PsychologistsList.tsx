import { PsychologistCard } from '../PsychologistCard/PsychologistCard';
import type { Psychologist } from '../../types/psychologist';
import styles from './PsychologistsList.module.css';

interface PsychologistsListProps {
  psychologists: Psychologist[];
}

export const PsychologistsList = ({
  psychologists,
}: PsychologistsListProps) => (
  <ul className={styles.list}>
    {psychologists.map(psychologist => (
      <li key={psychologist.id}>
        <PsychologistCard psychologist={psychologist} />
      </li>
    ))}
  </ul>
);
