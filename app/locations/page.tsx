import Link from 'next/link';
// import { cookies } from 'next/headers';
import { getAllLocations } from '../../database/locations';
import styles from './page.module.scss';

// import { getValidSessionByToken } from '../../database/sessions';

export default async function LocationsPage() {
  // const sessionTokenCookie = cookies().get('sessionToken');

  // const session =
  //   sessionTokenCookie &&
  //   (await getValidSessionByToken(sessionTokenCookie.value));

  const locations = await getAllLocations();

  return (
    <>
      <h1>Locations</h1>
      <main>
        <div className={styles.locationCard}>
          {locations.map((location) => {
            return (
              <div
                key={`location-${location.id}`}
                className={styles.locationCardDetails}
              >
                <Link href={`/locations/${location.id}`}>
                  <h2 key={`location-${location.id}`}>{location.name}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
