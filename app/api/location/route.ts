import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLocation } from '../../../database/locations';

const locationSchema = z.object({
  name: z.string(),
  postalCode: z.string(),
  street: z.string(),
  website: z.string(),
  userId: z.number(),
  // specializationIds: z.number(),
});

export type LocationResponseBodyPost =
  | { errors: { message: string }[] }
  | {
      location: {
        name: string;
        postalCode: string;
        street: string;
        website: string;
        userId: number;
        // specializationIds: number[];
      };
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LocationResponseBodyPost>> {
  const body = await request.json();
  // Parse the request body using the schema defined above.

  const result = locationSchema.safeParse(body);

  if (!result.success) {
    return new NextResponse(JSON.stringify({ errors: result.error.issues }), {
      status: 400,
    });
  }

  const { name, postalCode, street, website, userId } = result.data;

  if (!name || !postalCode || !street) {
    return new NextResponse(
      JSON.stringify({ errors: [{ message: 'missing required fields' }] }),
      { status: 400 },
    );
  }

  // Create a new location in the database.
  const newLocation = await createLocation(
    name,
    postalCode,
    street,
    website,
    userId,
    // [specializationIds],
  );

  if (!newLocation) {
    return new NextResponse(
      JSON.stringify({ errors: [{ message: 'location creation failed' }] }),
      { status: 500 },
    );
  }

  return new NextResponse(
    JSON.stringify({
      location: {
        name: newLocation.name,
        postalCode: newLocation.postalCode,
        street: newLocation.street,
        website: newLocation.website,
        userId: newLocation.userId,
        // specializationIds: newLocation.specializations,
      },
    }),
  );
}
