import { notFound } from 'next/navigation';
import { getLocationWithSpecializationsById } from '../../../database/locations';
import styles from './page.module.scss';

type Props = {
  params: {
    locationId: string;
    locationName: string;
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

  console.log(singleLocation);
  return (
    <>
      {/* <h1>Location Profile{locationId}</h1> */}
      <main>
        <div className={styles.mainProfile}>
          <div className={styles.profile}>
            <h3>name:</h3> <p>{singleLocation.locationName}</p>
            <h3>postal code:</h3> <p>{singleLocation.postalCode}</p>
            <h3>street:</h3> <p>{singleLocation.street}</p>
            <h3>website:</h3> <p>{singleLocation.website}</p>
            <h3>specializations: </h3>
            <p>{singleLocation.specializationName}</p>
          </div>
        </div>
      </main>
    </>
  );
}
