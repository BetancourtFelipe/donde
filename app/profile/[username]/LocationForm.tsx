'use client';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
// import {
//   getAllSpecializations,
//   Specialization,
// } from '../../../database/specializations';
import { getUserBySessionToken, getUsers } from '../../../database/users';
import { transformDataForSelect } from '../../../utils/dataStructure';

// import { getSafeReturnToPath } from '../../../utils/validation';

// type Props = {
//   location: string;
//   specializations: string[];
// };

export default function LocationForm(props: { returnTo?: string | string[] }) {
  const [name, setName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  // const [selectedSpecializations, setSelectedSpecializations] =
  //   useState<Specialization[]>();
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  // // Declare handler for specialization multi-select
  // const maxSelectOptions = 5;
  // const handleSpecializationSelect = (selectedOption: Specialization[]) => {
  //   setSelectedSpecializations(selectedOption);
  // };

  // // // Declare handler to create location
  // export async function createLocationHandler() {
  //   // Transform selected specializations back to database structure
  //   const specializationsDatabaseStructure = selectedSpecializations?.map(
  //     (specialization: any) => {
  //       return {
  //         id: specialization.value,
  //         name: specialization.label,
  //       };
  //     },
  //   );

  // const locationResponse = await fetch('/api/users/locations', {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     name: name,
  //     street: street,
  //     website: website,
  //     userId: props.user.id,
  //     specializationIds: specializationsDatabaseStructure?.map(
  //       (specialization) => specialization.id,
  //     ),
  //   }),
  // });

  // const locationResponseBody =
  //   (await locationResponse.json()) as LocationResponseBody;

  // // Handle errors
  // if ('errors' in locationResponseBody) {
  //   setErrors(locationResponseBody.errors);
  //   return console.log(locationResponseBody.errors);
  // }

  // // Redirect user to private page
  //   await router.push(`/profile`);
  // }

  return (
    <form
    // onSubmit={async (event) => {
    //   event.preventDefault();

    //   // const response = await fetch('/api/locations', {
    //   //   method: 'POST',
    //   //   body: JSON.stringify({
    //   //     name,
    //   //     postalCode,
    //   //     street,
    //   //     website,
    //   //     specializations,
    //   //   }),
    //   // });

    //   // const data: LocationResponseBody = await response.json();

    //   // if ('errors' in data) {
    //   //   setErrors(data.errors);
    //   //   return;
    //   // }

    //   // const returnTo = getSafeReturnToPath(props.returnTo);

    //   // if (returnTo) {
    //   //   router.push(returnTo);
    //   //   return;
    //   // }

    //   // router.replace(`/profile/${data.user.username}`);
    //   // router.refresh();
    // }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <div>
        <h2>Add a new Location</h2>
      </div>
      <div>
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
          street :
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
        <div>
          <Select
          // onChange={(selectedOption) =>
          //   handleSpecializationSelect(selectedOption as Specialization[])
          // }
          // isMulti
          // options={
          //   selectedSpecializations?.length === maxSelectOptions
          //     ? []
          //     : props.specializations
          // }
          // noOptionsMessage={() => {
          //   return selectedSpecializations?.length === maxSelectOptions
          //     ? 'You cannot choose more than 5 specializations'
          //     : 'No options available';
          // }}
          />
        </div>
        <button>Add Location</button>
      </div>
    </form>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const token = context.req.cookies.sessionToken;

//   const user = token && (await getUserBySessionToken(token));

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login?returnTo=/login',
//         permanent: false,
//       },
//     };
//   }

//   const specializationsFromDatabase = await getAllSpecializations();

//   return {
//     props: {
//       specializations: transformDataForSelect(specializationsFromDatabase),
//       user: user,
//     },
//   };
// }
