import { sql } from './connect';

export type Specialization = {
  id: number;
  name: string;
};

export async function getAllSpecializations() {
  const specializations = await sql<Specialization[]>`
    SELECT
      id,
      name
    FROM
      specializations
  `;
  return specializations;
}
