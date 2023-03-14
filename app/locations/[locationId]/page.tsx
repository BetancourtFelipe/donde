import { notFound } from 'next/navigation';
import { getLocationById } from '../../../database/locations';

type Props = {
  params: {
    locationId: string;
    name: string;
    postalCode: string;
    street: string;
    website: string;
  };
};

export default async function SingleLocationPage(props: Props) {
  const locationId = parseInt(props.params.locationId);

  const singleLocation = await getLocationById(locationId);

  if (!singleLocation) {
    notFound();
  }

  console.log('singleLocation', singleLocation);

  return (
    <>
      <h1>Location Profile{locationId}</h1>
      <main>
        <div>
          <h2>name:{singleLocation.name}</h2>
          <p>postal code:{singleLocation.postalCode}</p>
          <p>street:{singleLocation.street}</p>
          <p>website:{singleLocation.website}</p>
        </div>
      </main>
    </>
  );
}
