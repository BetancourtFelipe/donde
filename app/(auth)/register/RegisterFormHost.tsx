'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../utils/validation';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterFormUser(props: {
  returnTo?: string | string[];
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [locationType, setLocationType] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [info, setInfo] = useState('');
  const [foodType, setFoodType] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            locationType,
            city,
            latitude,
            longitude,
            info,
            foodType,
            password,
          }),
        });

        const data: RegisterResponseBodyPost = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        const returnTo = getSafeReturnToPath(props.returnTo);

        if (returnTo) {
          router.push(returnTo);
          return;
        }

        router.replace(`/profile/${data.user.username}`);
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
        email:
        <input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        password:
        <input
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        location type:
        <input
          value={locationType}
          onChange={(event) => setLocationType(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        city:
        <input
          value={city}
          onChange={(event) => setCity(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        latitude:
        <input
          value={latitude}
          onChange={(event) => setLatitude(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        longitude:
        <input
          value={longitude}
          onChange={(event) => setLongitude(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        food type:
        <input
          value={foodType}
          onChange={(event) => setFoodType(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        info:
        <input
          value={info}
          onChange={(event) => setInfo(event.currentTarget.value)}
        />
      </label>
      <br />
      <button>Register</button>
    </form>
  );
}
