import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import styles from './page.module.scss';
import RegisterFormHost from './RegisterFormHost';
import RegisterFormUser from './RegisterFormUser';

// import RegisterForm from './RegisterFormUser';

type Props = { searchParams: { returnTo?: string | string[] } };

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
      <h1>register</h1>
      <div className={styles.register}>
        <div className={styles.form}>
          <RegisterFormUser returnTo={props.searchParams.returnTo} />
        </div>
        <div className={styles.form}>
          <RegisterFormHost returnTo={props.searchParams.returnTo} />
        </div>
      </div>
    </main>
  );
}
