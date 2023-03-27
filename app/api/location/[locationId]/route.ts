import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getLocationWithSpecializationsById } from '../../../../database/locations';

const locationSchema = z.object({
  locationId: z.number(),
  name: z.string(),
  info: z.string(),
  postalCode: z.string(),
  street: z.string(),
  latCoord: z.number(),
  longCoord: z.number(),
  website: z.string(),
  userId: z.number(),
  specializationIds: z.array(z.number()),
});

export type LocationResponseBodyGet =
  | {
      error: string;
    }
  | {
      location: {
        locationId: number;
        name: string;
        info: string;
        postalCode: string;
        street: string;
        latCoord: number;
        longCoord: number;
        website: string;
        userId: number;
        specializationIds: number[];
      };
    };

export async function GET(
  request: NextRequest,
  { params }: { params: { locationId: number } },
): Promise<NextResponse<LocationResponseBodyGet>> {
  const locationId = Number(params.locationId);

  if (Number(locationId)) {
    return NextResponse.json(
      {
        error: 'Location id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = locationSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Invalid request body',
      },
      { status: 400 },
    );
  }

  const singleLocation = await getLocationWithSpecializationsById(locationId);

  if (!singleLocation) {
    return NextResponse.json(
      {
        error: 'Location not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ location: singleLocation });
}
