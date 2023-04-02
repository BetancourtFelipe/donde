import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<
    {
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      csrfSecret: string;
    }[]
  >`
    SELECT
      users.id,
      users.username,
      users.first_name,
      users.last_name,
      users.email,
      sessions.csrf_secret
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const createUser = cache(
  async (
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
  ) => {
    const [user] = await sql<
      {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
      }[]
    >`
      INSERT INTO users
        (username,  first_name, last_name, email, password_hash)
      VALUES
        (${username}, ${firstName}, ${lastName}, ${email}, ${passwordHash})
      RETURNING
        id,
        username,
        first_name,
        last_name,
        email
    `;
    return user;
  },
);

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT * FROM users
  `;

  return users;
});
