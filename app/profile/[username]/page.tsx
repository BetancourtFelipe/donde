import { notFound } from 'next/navigation';
import { getLocationByUserId } from '../../../database/locations';
import { getAllSpecializations } from '../../../database/specializations';
import { getUserByUsername } from '../../../database/users';
import { transformDataForSelect } from '../../../utils/dataStructure';
import AddLocation from './AddLocation';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
  };
};

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const locations = await getLocationByUserId(user.id);
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
