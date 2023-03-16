import { cache } from 'react';
import { sql } from './connect';
import { Specialization } from './specializations';

export type Location = {
  id: number;
  name: string;
  postalCode: string;
  street: string;
  website: string;
  userId: number;
};

export type LocationWithSpecializations = {
  id: number;
  name: string;
  postalCode: string;
  street: string;
  website: string;
  userId: number;
  specializations: Specialization[];
};

export type LocationWithSpecializationsAndUserId = {
  id: number;
  name: string;
  postalCode: string;
  street: string;
  website: string;
  specializationId: number;
  specializationName: string;
};

export async function createLocation(
  name: string,
  postalCode: string,
  street: string,
  website: string,
  userId: number,
  specializationIds: number[],
) {
  const [location] = await sql<Location[]>`
    INSERT INTO locations
      (
      name,
      postal_code,
      street,
      website,
      user_id
      )
    VALUES
      (${name}, ${postalCode}, ${street}, ${website}, ${userId})
    RETURNING *
  `;

  // Insert specializations
  for (const specializationId of specializationIds) {
    await sql`INSERT INTO locationSpecializations
     (location_id, specialization_id)
    VALUES
     (${location!.id}, ${specializationId})`;
  }

  // Joint query to retrieve the matching specializations
  const specializations = await sql<Specialization[]>`
  SELECT
    specializations.id,
    specializations.name
  FROM
    locations,
    specializations,
    locationSpecializations
  WHERE
    ${location!.id} = locationSpecializations.location_id AND
    specializations.id = locationSpecializations.specialization_id AND
    ${location!.id} = locations.id
  `;

  // Returning location including matching specializations
  const locationWithSpecializations = {
    ...location!,
    specializations: [...specializations],
  };
  return locationWithSpecializations;
}

export const getLocationById = cache(async (id: number) => {
  const [location] = await sql<Location[]>`
    SELECT
      *
    FROM
      locations
    WHERE
      id = ${id}
  `;
  return location;
});

export async function getLocationWithSpecializationsById(locationId: number) {
  const locationWithSpecializations = await sql<LocationWithSpecializations[]>`
    SELECT
      locations.id AS location_id,
      locations.name AS location_name,
      locations.postal_code,
      locations.street,
      locations.website,
      specializations.id AS specialization_id,
      specializations.name AS specialization_name
    FROM
      locations,
      specializations,
      locationSpecializations,
    WHERE
      ${locationId} = locationSpecializations.location_id AND
      specializations.id = locationSpecializations.specialization_id AND
      locations.id = ${locationId}
  `;
  return locationWithSpecializations;
}

export async function getAllLocations() {
  const locations = await sql<LocationWithSpecializations[]>`
    SELECT
    *
    FROM
    locations
    `;
  return locations;
}

export async function getAllLocationsWithLimit(limit: number) {
  const locations = await sql<LocationWithSpecializations[]>`
    SELECT
     locations.id AS location_id,
     locations.name AS location_name,
     locations.postal_code,
     locations.street,
     locations.website,
     specializations.id as specialization_id,
     specializations.name as specialization_name
    FROM
     locations,
     specializations,
     locationSpecializations
    WHERE
     specializations.id = locationSpecializations.specialization_id AND
     locations.id = locationSpecializations.location_id
    LIMIT ${limit}
  `;
  return locations;
}

export const getLocationByUserId = cache(async (userId: string) => {
  const [location] = await sql<Location[]>`
    SELECT
      *
    FROM
      locations
    WHERE
      user_id = ${userId}
  `;
  return location;
});

// // Get location by user ID
// export async function getLocationByUserId(userId: number, token: string) {
//   if (!token) return undefined;
//   const location = await sql<LocationWithSpecializations[]>`
//     SELECT
//      locations.id AS location_id,
//      locations.name AS location_name,
//      locations.postal_code,
//      locations.street,
//      locations.website,
//      locations.is_public,
//      specializations.id as specialization_id,
//      specializations.name as specialization_name
//     FROM
//      users,
//      locations,
//      specializations,
//      locationSpecializations
//     WHERE
//      users.id = ${userId} AND
//      locations.user_id = ${userId} AND
//      specializations.id = locationSpecializations.specialization_id AND
//      locations.id = locationSpecializations.location_id
//   `;
//   return location;
// }

export async function getLocationByToken(token: string) {
  if (!token) return undefined;
  const location = await sql<LocationWithSpecializations[]>`
    SELECT
     locations.id AS location_id,
     locations.name AS location_name,
     locations.postal_code,
     locations.street,
     locations.website,
     specializations.id as specialization_id,
     specializations.name as specialization_name
    FROM
     users,
     locations,
     specializations,
     locationSpecializations,
     sessions
    WHERE
     sessions.token = ${token} AND
     users.id = sessions.user_id AND
     locations.user_id = users.id AND
     specializations.id = locationSpecializations.specialization_id AND
     locations.id = locationSpecializations.location_id
  `;
  return location;
}

export async function updateLocation(
  name: string,
  postalCode: string,
  street: string,
  website: string,
  userId: number,
  specializationIds: number[],
) {
  const [location] = await sql<Location[]>`
    UPDATE
      locations
    SET
      name = ${name},
      postal_code = ${postalCode},
      street = ${street},
      website = ${website},
      user_id = ${userId}
    WHERE
      locations.user_id = ${userId}
    RETURNING *
  `;

  // Delete original specializations
  await sql<{ locationId: number; specializationId: number }[]>`
    DELETE FROM
      locationSpecializations
    WHERE
      locationSpecializations.location_id = ${location!.id}
    RETURNING *
  `;

  // Insert new specializations
  for (const specializationId of specializationIds) {
    await sql`INSERT INTO locationSpecializations
     (location_id, specialization_id)
    VALUES
     (${location!.id}, ${specializationId})`;
  }

  // Joint query to retrieve the matching specializations
  const specializations = await sql<Specialization[]>`
  SELECT
    specializations.id,
    specializations.name
  FROM
    locations,
    specializations,
    locationsSpecializations
  WHERE
    ${location!.id} = locationsSpecializations.location_id AND
    specializations.id = locationsSpecializations.specialization_id AND
    ${location!.id} = locations.id
  `;

  // Returning location including matching specializations
  const locationWithSpecializations = {
    ...location,
    specializations: [...specializations],
  };
  return locationWithSpecializations;
}

export async function deleteLocationByUserId(userId: number, token: string) {
  if (!token) return undefined;
  const [location] = await sql<Location[]>`
    DELETE FROM
      locations
    WHERE
      locations.user_id = ${userId}
    RETURNING *
  `;
  return location;
}
