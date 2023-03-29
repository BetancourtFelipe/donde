import Image from 'next/image';
import barlanding from '../public/images/barlanding.jpeg';
import coffelanding from '../public/images/coffelanding.jpeg';
import restaurantlanding from '../public/images/restaurantlanding.jpeg';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <main>
      <div className={styles.landing}>
        <section className={styles.description}>
          <h3>Description Donde</h3>
          <p>jsdhhfjifhsfkhkfs</p>
        </section>
        <div>
          <Image
            className={styles.image}
            src={barlanding}
            alt="barkeeper working"
          />
        </div>
        <Image className={styles.image} src={coffelanding} alt="coffee bar" />
        <section className={styles.description}>
          <h3>Experience</h3>
        </section>
      </div>
    </main>
  );
}
