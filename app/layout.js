import './global.scss';
import Image from 'next/image';
import Link from 'next/link';
import about from '../public/about.png';
import login from '../public/login.png';
import singup from '../public/singup.png';
import styles from './layout.module.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header className={styles.header}>
          {/* <section>banner</section> */}
          <nav className={styles.nav}>
            <Link href="/">Donde</Link>
            <Link href="/">Profile</Link>
            <Link href="/about">About</Link>
            <Link className={styles.login} href="/">
              Login
            </Link>
          </nav>
        </header>

        {children}
        <footer className={styles.footer}>
          <div>
            <Link href="/about">
              About
              <Image src={about} />
            </Link>
            <Link href="/">
              Login <Image src={login} />
            </Link>
            <Link href="/">
              Sing up
              <Image src={singup} />
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
