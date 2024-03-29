import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getLocationByUserId } from '../../database/locations';
import { getValidSessionByToken } from '../../database/sessions';
import { getAllSpecializations } from '../../database/specializations';
import { getUserBySessionToken, getUserByUsername } from '../../database/users';
import { transformDataForSelect } from '../../utils/dataStructure';
import { getSafeReturnToPath } from '../../utils/validation';
import AddLocation from './AddLocation';
import styles from './page.module.scss';

export default async function UserProfile() {
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // for example you may also check if session user is an admin role
  console.log();
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
        <h2>
          user name: <br />
        </h2>
        <h3 className={styles.details}>{user.username}</h3>
        <h2>
          firstName: <br />
        </h2>
        <h3 className={styles.details}>{user.firstName}</h3>

        <h2>
          last name: <br />
        </h2>
        <h3 className={styles.details}>{user.lastName}</h3>

        <h2>
          email: <br />
        </h2>
        <h3 className={styles.details}>{user.email}</h3>
      </div>
      <div className={styles.createLocation}>
        <h2>Add your location</h2>
        <AddLocation user={user} specializations={specializations} />
      </div>
    </main>
  );
}
