import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './Loginform';
import styles from './page.module.scss';

type Props = { searchParams: { returnTo: string | string[] } };

export default async function LoginPage(props: Props) {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home
  if (session) {
    redirect('/');
  }

  // if no render login component
  return (
    <main>
      <div className={styles.login}>
        <div className={styles.form}>
          <h3>Log in to your account</h3>
          <LoginForm returnTo={props.searchParams.returnTo} />
        </div>
        <div className={styles.form}>
          <h3>don't have an account?</h3>
          <p>
            register and start discovering
            <br />
            locations in vienna.
            <br />
            you can also create your own
            <br />
            location and be discovered
            <br />
            by a new audience
          </p>
          <Link href="/register" className={styles.registerButton}>
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
