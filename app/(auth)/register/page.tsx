import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import styles from './page.module.scss';
import RegisterFormUser from './RegisterForm';

// import RegisterForm from './RegisterFormUser';

type Props = { searchParams: { returnTo: string | string[] } };

export default async function RegisterPage(props: Props) {
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
  return (
    <main>
      <div className={styles.register}>
        <div className={styles.form}>
          <h2>become part of donde!</h2>
          <p>
            with your private account, you can discover locations in vienna.
            <br />
            save them, rate them or comment them as you like.
            <br /> search by specializations and find what suits you!
            <br />
            <br />
            you want to promote your location and be discovered!
            <br />
            just register your self and create a profile for your location. get
            ratings, comments & much more.
          </p>
        </div>
        <div className={styles.form}>
          <h2>create your account</h2>
          <RegisterFormUser returnTo={props.searchParams.returnTo} />
          <p>
            already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
