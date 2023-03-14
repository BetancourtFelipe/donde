import { notFound } from 'next/navigation';
import { getLocationById } from '../../../database/locations';

type Params = {
  locationId: string;
  name: string;
  postalCode: string;
  street: string;
  website: string;
  userId: number;
};

export default function SingleLocationPage(params: Params) {
  const singleLocation = getLocationById(parseInt(params.locationId));
  console.log(singleLocation);

  if (!singleLocation) {
    notFound();
  }

  return (
    <>
      <h1>Location Profile</h1>
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
