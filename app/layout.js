import './global.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import about from '../public/about.png';
import login from '../public/login.png';
import logo from '../public/logo.png';
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
          {/* <section >
          </section> */}
          <nav className={styles.nav}>
            <Image className={styles.image} src={logo} />
            <Link href="/">Home</Link>
            <Link href="/locations">Locations</Link>

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
            {/* <div>
              <div>
                <ul class="nav navbar-nav navbar-right">
                  <li>
                    <a href="#">Link</a>
                  </li>
                  <li class="dropdown">
                    <a
                      href="#"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Menü <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a href="#">Aktion</a>
                      </li>
                      <li>
                        <a href="#">Andere Aktion</a>
                      </li>
                      <li>
                        <a href="#">Irgendwas anderes</a>
                      </li>
                      <li role="separator" class="divider"></li>
                      <li>
                        <a href="#">Abgetrennter Link</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div> */}
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
