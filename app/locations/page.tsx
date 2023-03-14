import Link from 'next/link';
import { getAllLocations } from '../../database/locations';
import styles from './page.module.scss';

export default async function LocationsPage() {
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
                  <p>{location.website}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
