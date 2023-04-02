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
          <h3 className={styles.text1}>
            ARE YOU LOOKING FOR NEW PLACES IN VIENNA? DISCOVER VIENNESE
            GASTRONOMY. FROM NEW LOCALES TO THE MOST RATED LOCALITIES.
          </h3>
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
          <h3 className={styles.text2}>
            YOU HAVE A LOCATION IN VIENNA AND WANT TO PROMOTE IT? WHETHER THEY
            ALREADY EXIST OR HAVE JUST OPENED, WE PROVIDE A PLATFORM WHERE YOU
            CAN ALWAYS STAY UP TO DATE ON HOW YOUR SERVICE IS DOING.
          </h3>
        </section>
      </div>
    </main>
  );
}
