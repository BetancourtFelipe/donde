'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../utils/validation';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

export default function RegisterForm(props: { returnTo: string | string[] }) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
          }),
        });

        const data: RegisterResponseBodyPost = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        const returnTo = getSafeReturnToPath(props.returnTo);

        if (returnTo) {
          router.push(returnTo);
          return;
        }

        router.replace(`/profile/${data.user.username}`);
        router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
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
        first name:
        <br />
        <input
          value={firstName}
          className={styles.input}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        last name:
        <br />
        <input
          value={lastName}
          className={styles.input}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        email:
        <br />
        <input
          value={email}
          className={styles.input}
          onChange={(event) => setEmail(event.currentTarget.value)}
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
      <button className={styles.registerButton}>Register</button>
    </form>
  );
}
