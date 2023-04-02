'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from 'react-select';
// import { text } from 'stream/consumers';
import { Specialization } from '../../database/specializations';
import { getSafeReturnToPath } from '../../utils/validation';
import { LocationResponseBodyPost } from '../api/location/route';
import styles from './AddLocation.module.scss';

const AddressAutofill = dynamic(
  () => import('@mapbox/search-js-react').then((mod) => mod.AddressAutofill),
  { ssr: false },
);

export default function AddLocation(props: { returnTo: string | string[] }) {
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [apiData, setApiData] = useState([]);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${street}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX}`,
      )
        .then((res) => res.json())
        .then((res) => res.features[0].geometry.coordinates)
        .then((res) => setApiData(res))
        .catch(() => console.log('Error'));
    }, 700);
    return () => clearTimeout(timer);
  }, [street]);

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
            info,
            postalCode,
            street,
            website,
            userId,
            latCoord: apiData[1],
            longCoord: apiData[0],
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
          placeholder="Location Name"
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
          placeholder="1xx0 "
          onChange={(event) => setPostalCode(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        street: <br />
        <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX}>
          <input
            required
            className={styles.input}
            value={street}
            onChange={(event) => setStreet(event.currentTarget.value)}
            autoComplete="address-line1"
            placeholder="Street and Number"
          />
        </AddressAutofill>
      </label>
      <br />
      <label>
        website:
        <br />
        <input
          value={website}
          className={styles.input}
          placeholder="website"
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
        info: <br />
        <textarea
          className={styles.textarea}
          placeholder="provide some information of your location"
          onChange={(event) => setInfo(event.currentTarget.value)}
        />
      </label>
      <br /> <br />
      <button className={styles.addButton}>Add Location</button>
    </form>
  );
}
