'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
// import { text } from 'stream/consumers';
import { Specialization } from '../../../database/specializations';
import { getSafeReturnToPath } from '../../../utils/validation';
import { LocationResponseBodyPost } from '../../api/location/route';
import styles from './AddLocation.module.scss';

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
  const maxSelectOptions = 5;
  const handleSpecializationSelect = (selectedOption: Specialization[]) => {
    setSelectedSpecializations(selectedOption);
  };
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const specializationsDatabaseStructure = selectedSpecializations?.map(
          (specialization: any) => {
            return {
              id: specialization.value,
              name: specialization.label,
            };
          },
        );
        const response = await fetch('/api/location', {
          method: 'POST',
          body: JSON.stringify({
            name,
            postalCode,
            street,
            website,
            userId,
            specializationIds: specializationsDatabaseStructure?.map(
              (specialization) => specialization.id,
            ),
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
        <br />
        <input
          value={name}
          className={styles.input}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        postal code:
        <br />
        <input
          value={postalCode}
          className={styles.input}
          onChange={(event) => setPostalCode(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        street:
        <br />
        <input
          value={street}
          className={styles.input}
          onChange={(event) => setStreet(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        website:
        <br />
        <input
          value={website}
          className={styles.input}
          onChange={(event) => setWebsite(event.currentTarget.value)}
        />
      </label>
      <br />
      <label htmlFor="specialization">Choose up to 5 specializations</label>
      <div>
        <Select
          className={styles.input}
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
      <label>
        info:
        <textarea placeholder="info"> </textarea>
      </label>
      <br />
      <button className={styles.addButton}>Add Location</button>
    </form>
  );
}
