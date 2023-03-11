'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../utils/validation';
import { LocationResponseBodyPost } from '../../api/(auth)/location/route';

export default function LocationForm(props: { returnTo?: string | string[] }) {
  const [name, setName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  // const [selectedSpecializations, setSelectedSpecializations] =
  //   useState<Specialization[]>();
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/locations', {
          method: 'POST',
          body: JSON.stringify({
            name,
            postalCode,
            street,
            website,
          }),
        });

        const data: LocationResponseBodyPost = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        const returnTo = getSafeReturnToPath(props.returnTo);

        if (returnTo) {
          router.push(returnTo);
          return;
        }

        // router.replace(`/profile/${data.user.username}`);
        // router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <label>
        name:
        <input
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        postal code:
        <input
          value={postalCode}
          onChange={(event) => setPostalCode(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        street:
        <input
          value={street}
          onChange={(event) => setStreet(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        website:
        <input
          value={website}
          onChange={(event) => setWebsite(event.currentTarget.value)}
        />
      </label>
      <br />
      <button>Add Location</button>
    </form>
  );
}
