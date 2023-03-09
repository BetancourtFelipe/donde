const specializations = [
  { id: 1, name: 'Restaurant' },
  { id: 2, name: 'Bar' },
  { id: 3, name: 'Coffee' },
  { id: 4, name: 'Vegetarian' },
  { id: 5, name: 'Vegan' },
  { id: 6, name: 'Mediterranean' },
  { id: 7, name: 'Asian' },
  { id: 8, name: 'South American' },
  { id: 9, name: 'Austrian' },
  { id: 10, name: 'Oriental' },
  { id: 11, name: 'Italian' },
  { id: 12, name: 'Fusion' },
];

export async function up(sql) {
  await sql`

    INSERT INTO specializations ${sql(specializations, 'id', 'name')}

`;
}

export async function down(sql) {
  for (const specialization of specializations) {
    await sql`
     DELETE FROM
        specializations
      WHERE
        name = ${specialization.name}
`;
  }
}
