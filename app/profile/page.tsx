import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getLocationByUserId } from '../../database/locations';
import { getValidSessionByToken } from '../../database/sessions';
import { getAllSpecializations } from '../../database/specializations';
import { getUserBySessionToken, getUserByUsername } from '../../database/users';
import { transformDataForSelect } from '../../utils/dataStructure';
import AddLocation from './AddLocation';
import styles from './page.module.scss';

export default async function UserProfile() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // for example you may also check if session user is an admin role
  console.log(session);
  if (!session) {
    notFound();
  }

  const user = await getUserBySessionToken(session.token);
  // const userId = await getUserBySessionToken();

  if (!user) {
    notFound();
  }

  // const locations = await getLocationByUserId(user.id);
  const specializationsFromDatabase = await getAllSpecializations();
  const specializations = transformDataForSelect(specializationsFromDatabase);

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <h1>{user.username}</h1>
      </div>
      <div className={styles.createLocation}>
        <h2>Add your location</h2>
        <AddLocation user={user} specializations={specializations} />
      </div>
    </main>
  );
}
