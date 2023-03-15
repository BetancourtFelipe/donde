'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import { Specialization } from '../../../database/specializations';
import { getSafeReturnToPath } from '../../../utils/validation';
import { LocationResponseBodyPost } from '../../api/location/route';

export default function AddLocation(props: { returnTo: string | string[] }) {
  const [name, setName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] =
    useState<Specialization[]>();
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  const userId = props.user.id;

  console.log(props);

  const maxSelectOptions = 5;
  const handleSpecializationSelect = (selectedOption: Specialization[]) => {
    setSelectedSpecializations(selectedOption);
  };
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/location', {
          method: 'POST',
          body: JSON.stringify({
            name,
            postalCode,
            street,
            website,
            userId,
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

        router.refresh();
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
      <label htmlFor="specialization">Choose up to 5 specializations</label>
      <div>
        <Select
          onChange={(selectedOption) =>
            handleSpecializationSelect(selectedOption as Specialization[])
          }
          isMulti
          options={
            selectedSpecializations?.length === maxSelectOptions
              ? []
              : props.specializations
          }
          noOptionsMessage={() => {
            return selectedSpecializations?.length === maxSelectOptions
              ? 'You cannot choose more than 5 specializations'
              : 'No options available';
          }}
          value={selectedSpecializations}
          placeholder="Select specializations"
        />
      </div>
      <br />
      <button>Add Location</button>
    </form>
  );
}
