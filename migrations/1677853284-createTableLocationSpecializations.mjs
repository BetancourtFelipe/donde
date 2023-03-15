export async function up(sql) {
  await sql`
    CREATE TABLE locationSpecializations (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      location_id integer REFERENCES locations (id) ON DELETE CASCADE,
      specialization_id integer REFERENCES specializations (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE locationSpecializations
  `;
}
