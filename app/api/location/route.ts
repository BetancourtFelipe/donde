import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createLocation,
  deleteLocationByUserId,
  getAllLocations,
  getLocationByToken,
  getLocationByUserId,
  LocationWithSpecializations,
  updateLocation,
} from '../../../database/locations';
import { getValidSessionByToken } from '../../../database/sessions';

const locationSchema = z.object({
  name: z.string(),
  postalCode: z.string(),
  street: z.string(),
  website: z.string(),
});

export type LocationResponseBody =
  | { errors: { message: string }[] };
  | { location: LocationWithSpecializations | Location;}

export default async function handler(
  request: NextRequest,
  response: NextResponse<LocationResponseBody>,
) {
  const session = request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'GET') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const locationsFromDatabase = await getLocationByToken(
      request.cookies.sessionToken,
    );
    const locations = [...(locationsFromDatabase !== undefined ? locationsFromDatabase : []),
    ];
    return response.status(200).json();
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    // Check if this user has already created a locations

    const locationsByUserId = await getLocationByUserId(
      request.body.userId,
      request.cookies.sessionToken,
    );
    if (locationsByUserId?.length) {
      response
        .status(400)
        .json({ errors: [{ message: "You've already added your locations" }] });
      return;
    }

    const locationName = request.body?.locationName;
    const postalCode = request.body?.postalCode;
    const street = request.body?.street;
    const website = request.body?.website;
    const userId = request.body?.userId;
    const specializationIds = request.body?.specializationIds;

    if (!locationName && typeof locationName !== 'string') {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide the locationName.' }] });
    }

    if (!postalCode) {
      return response.status(400).json({
        errors: [{ message: 'Please provide the postal code' }],
      });
    }

    if (!street) {
      return response.status(400).json({
        errors: [{ message: 'Please provide the street and house number.' }],
      });
    }

    if (!website) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide your website.' }] });
    }

    if (!specializationIds) {
      return response.status(400).json({
        errors: [{ message: 'Please select at least one specialization.' }],
      });
    }

    // Create new location
 const newLocation = await createLocation(
      result.data.name,
      postal_code,
      street,
      website,
      user_id
      specializationIds,
    );

    // response with the newly created location

    return response.status(200).json({ locations: newLocation});}

  if (request.method === 'PUT') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const name = request.body?.name;
    const postalCode = request.body?.postalCode;
    const street = request.body?.street;
    const website = request.body?.website;
    const userId = request.body?.userId;
    const specializationIds = request.body?.specializationIds;

    if (!name) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide the locationName.' }] });
    }

    if (!postalCode) {
      return response.status(400).json({
        errors: [{ message: 'Please provide the postal code' }],
      });
    }

    if (!street) {
      return response.status(400).json({
        errors: [{ message: 'Please provide the street and house number.' }],
      });
    }

    if (!website) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide your website.' }] });
    }

    if (!specializationIds) {
      return response.status(400).json({
        errors: [{ message: 'Please select at least one specialization.' }],
      });
    }

    // Create new locations

    const updatedLocation = await updateLocation
(
      location
      name,
      postalCode,
      street,
      website,
      userId,
      specializationId,
    );

    // response with updated locations

    return response.status(200).json({ locations: updatedLocation});}

  if (request.method === 'DELETE') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const deletedLocation = await deleteLocationByUserId(
      request.body.userId,
      request.cookies.sessionToken,
    );

    if (!deletedLocation
) {
      return response
        .status(404)
        .json({ errors: [{ message: 'No location found' }] });
    }

    return response.status(200).json({ locations: deletedLocation
 });
  }

  return response
    .status(400)
    .json({ errors: [{ message: 'Method not allowed' }] });
}
