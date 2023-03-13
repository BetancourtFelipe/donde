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

export default async function LocationPage(props: Props) {
  const singleLocation = await getLocationById(
    parseInt(props.params.locationId),
  );

  if (!singleLocation) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <main>
      <h1>name:{singleLocation.name}</h1>
      <p>postal code:{singleLocation.postalCode}</p>
      <p>street:{singleLocation.street}</p>
      <p>website:{singleLocation.website}</p>
    </main>
  );
}
