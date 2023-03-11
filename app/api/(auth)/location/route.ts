import { NextApiRequest, NextApiResponse } from 'next';
import {
  createLocation,
  deleteLocationByUserId,
  getLocationByToken,
  getLocationByUserId,
  Location,
  LocationWithSpecializations,
  updateLocation,
} from '../../../../database/locations';
import { getValidSessionByToken } from '../../../../database/sessions';

export type LocationResponseBodyPost =
  | {
      location: LocationWithSpecializations | Location;
    }
  | { errors: { message: string }[] }
  | LocationWithSpecializations[];

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<LocationResponseBodyPost>,
) {
  const session =
    request.cookies.sessionToken &&
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

    const locationFromDatabase = await getLocationByToken(
      request.cookies.sessionToken,
    );
    const location = [
      ...(locationFromDatabase !== undefined ? locationFromDatabase : []),
    ];
    return response.status(200).json(location);
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    // Check if this user has already created a location
    const locationByUserId = await getLocationByUserId(
      request.body.userId,
      request.cookies.sessionToken,
    );
    if (locationByUserId?.length) {
      response
        .status(400)
        .json({ errors: [{ message: "You've already added your location." }] });
      return;
    }

    const name = request.body?.locationName;
    const street = request.body?.street;
    const postalCode = request.body?.postalCode;
    const website = request.body?.website;
    const userId = request.body?.userId;
    const specializationIds = request.body?.specializationIds;

    if (!name && typeof name !== 'string') {
      return response
        .status(400)
        .json({ errors: [{ message: 'Please provide the location name.' }] });
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

    // Create new location using util database function
    const newlocation = await createLocation(
      name,
      postalCode,
      street,
      website,
      userId,
      specializationIds,
    );

    // response with the newly created location
    return response.status(200).json({ location: newlocation });
  }

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
        .json({ errors: [{ message: 'Please provide the location name.' }] });
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

    // Create new location using util database function
    const updatedLocation = await updateLocation(
      name,
      postalCode,
      street,
      website,
      userId,
      specializationIds,
    );

    // response with updated location
    return response.status(200).json({ location: updatedLocation });
  }

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

    if (!deletedLocation) {
      return response
        .status(404)
        .json({ errors: [{ message: 'No location found' }] });
    }

    return response.status(200).json({ location: deletedLocation });
  }

  return response
    .status(400)
    .json({ errors: [{ message: 'Method not allowed' }] });
}
