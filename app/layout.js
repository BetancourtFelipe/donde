import './global.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import about from '../public/about.png';
import login from '../public/login.png';
import singup from '../public/singup.png';
import styles from './layout.module.scss';

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head />
      <body>
        <header className={styles.header}>
          {/* <section>banner</section> */}
          <nav className={styles.nav}>
            <Link href="/">Donde</Link>
            <Link href="/users/admin">Admin</Link>
            <Link href="/about">About</Link>
            <div>
              {user ? (
                <>
                  <Link href={`/profile/${user.username}`}>
                    {user.username}
                  </Link>
                  <Link
                    className={styles.login}
                    href="/logout"
                    prefetch={false}
                  >
                    logout
                  </Link>
                </>
              ) : (
                <>
                  <Link className={styles.login} href="/register">
                    register
                  </Link>
                  <Link className={styles.login} href="/login">
                    login
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>

        {children}
        <footer className={styles.footer}>
          <div>
            <Link href="/about">
              about
              <Image src={about} />
            </Link>
            <Link href="/login">
              login <Image src={login} />
            </Link>
            <Link href="/register">
              register
              <Image src={singup} />
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
