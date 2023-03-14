import { notFound } from 'next/navigation';
import { getLocationById } from '../../../database/locations';

type Props = {
  location: {
    locationId: number;
    name: string;
    postalCode: string;
    street: string;
    website: string;
  };
};

export default function SingleLocationPage(props: Props) {
  const singleLocation = getLocationById(parseInt(props.location));

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
