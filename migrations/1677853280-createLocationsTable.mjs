export async function up(sql) {
  await sql`
  CREATE TABLE locations (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(80) NOT NULL,
    info varchar(1000) NOT NULL,
    postal_code varchar(4) NOT NULL,
    street varchar(300) NOT NULL,
    latCoord decimal NOT NULL,
    longCoord decimal NOT NULL,
    website varchar(300) NOT NULL,
    user_id integer REFERENCES users (id) ON DELETE CASCADE NOT NULL
  )
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE locations
`;
}
