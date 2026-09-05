import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/icons/ArrowIcon';
import { CheckIcon } from '../../components/icons/CheckIcon';
import { QuestionIcon } from '../../components/icons/QuestionIcon';
import { UsersIcon } from '../../components/icons/UsersIcon';
import heroImage from '../../assets/images/hero.jpg';
import styles from './HomePage.module.css';

const HomePage = () => (
  <section className={styles.hero}>
    <div className={styles.container}>
      <div className={styles.text}>
        <h1 className={styles.title}>
          The road to the <span className={styles.accent}>depths</span> of the
          human soul
        </h1>
        <p className={styles.description}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <Link className={styles.cta} to="/psychologists">
          Get started
          <span className={styles.ctaIcon}>
            <ArrowIcon />
          </span>
        </Link>
      </div>

      <div className={styles.visual}>
        <img
          className={styles.image}
          src={heroImage}
          alt="Psychologist during a session"
          width="464"
          height="526"
        />

        <div className={styles.stats}>
          <span className={styles.statsIcon}>
            <CheckIcon />
          </span>
          <div className={styles.statsText}>
            <span className={styles.statsCaption}>
              Experienced psychologists
            </span>
            <span className={styles.statsValue}>15,000</span>
          </div>
        </div>

        <span className={styles.badgeQuestion}>
          <QuestionIcon />
        </span>
        <span className={styles.badgeUsers}>
          <UsersIcon />
        </span>
      </div>
    </div>
  </section>
);

export default HomePage;
