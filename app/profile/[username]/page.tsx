import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import AddLocation from './AddLocation';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
    email: string;
  };
};

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <h1>{user.username}</h1>
        <p>id: {user.id}</p>
      </div>

      <div className={styles.createLocation}>
        <AddLocation />
      </div>
    </main>
  );
}
