'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../utils/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './loginform.module.scss';

export default function LoginForm(props: { returnTo: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });

        const data: LoginResponseBodyPost = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        const returnTo = getSafeReturnToPath(props.returnTo);

        if (returnTo) {
          router.push(returnTo);
          return;
        }

        router.replace('/profile');
        router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <div>
        <div>
          <label>
            username:
            <br />
            <input
              value={username}
              className={styles.input}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            password:
            <br />
            <input
              value={password}
              className={styles.input}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
          <br />
          <br />
          <button className={styles.loginButton}>Login</button>
        </div>
      </div>
    </form>
  );
}
