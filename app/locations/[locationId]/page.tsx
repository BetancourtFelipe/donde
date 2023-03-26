import { notFound } from 'next/navigation';
import { StrictMode } from 'react';
import { getLocationWithSpecializationsById } from '../../../database/locations';
import { getLocationWithSpecializations } from '../../../utils/dataStructure';
import Map from '../../components/Map/Map';
import styles from './page.module.scss';
import StarRating from './Starraiting';

type Props = {
  params: {
    locationId: string;
    locationName: string;
    info: string;
    postalCode: string;
    street: string;
    website: string;
    specializationName: string;
  };
};

export default async function SingleLocationPage(props: Props) {
  const locationId = parseInt(props.params.locationId);

  const singleLocation = await getLocationWithSpecializationsById(locationId);

  if (!singleLocation) {
    notFound();
  }

  const location = getLocationWithSpecializations(singleLocation);

  return (
    <>
      {/* <h1>Location Profile{locationId}</h1> */}
      <main>
        <div className={styles.mainProfile}>
          <div className={styles.profile}>
            <h3>name:</h3> <p>{location.locationName}</p>
            <h3>street:</h3> <p>{location.street}</p>
            <h3>postal code:</h3> <p>{location.postalCode} Vienna</p>
            <h3>website:</h3> <p>{location.website}</p>
            <h3>info: </h3> <p>{location.info}</p>
            <h3>specializations: </h3>
            <div>
              {location.specializations.map((specialization) => {
                return (
                  <ul
                    className={styles.specializations}
                    key={`specializations-${specialization.specializationId}`}
                  >
                    <li>{specialization.specializationName}</li>
                  </ul>
                );
              })}
            </div>
          </div>

          <div className={styles.raiting}>
            Raiting:
            <StrictMode>
              <StarRating />
            </StrictMode>
          </div>
          <div className={styles.map}>
            <Map />
          </div>
        </div>
      </main>
    </>
  );
}
