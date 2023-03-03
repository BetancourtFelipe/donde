import styles from './page.module.scss';

export default function AboutPage() {
  return (
    <>
      <h1 className={styles.header}>About</h1>
      <main className={styles.main}>
        <section className={styles.about}>
          <h3 className={styles.heading}>be a guest</h3>
          <div>
            <p>
              are you looking for new places in vienna?
              <br /> discover viennese gastronomy.
              <br /> from new locales to the most rated localities.
              <br /> <br /> Sign up and find something that suits you.
              <br /> you can search for restaurants, cafes and bars.
              <br /> save them in your profile, rate them or comment on them.
              <br /> <br /> always be up to date and don't miss any news.
            </p>
          </div>
        </section>
        <section className={styles.about}>
          <h3 className={styles.heading}>be a host</h3>
          <div>
            <p>
              you have a location in vienna and want to promote it?
              <br />
              whether they already exist or have just opened, we provide a
              platform where you can always stay up to date on how your service
              is doing.
              <br />
              <br /> with donde you can offer your locality to a new audience.
              <br /> with your own profile you can post pictures, request
              information and change it as you like.
              <br />
              <br /> get ratings and comments and stay in touch with your
              customers.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
