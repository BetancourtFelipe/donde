'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../../database/users';

type Props = {
  users: User[];
  csrfToken: string;
};

export default function Dashboard(props: Props) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(props.users);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [username, setUsername] = useState<string>('');
  // const [type, setType] = useState<string>('');
  // const [accessory, setAccessory] = useState<string>('');
  const [editUsername, setEditUsername] = useState<string>('');
  // const [editType, setEditType] = useState<string>('');
  // const [editAccessory, setEditAccessory] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <div>
      <label>
        User Name:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      {/* <label>
        Type:
        <input
          value={type}
          onChange={(event) => setType(event.currentTarget.value)}
        />
      </label> */}
      {/* <label>
        Accessory:
        <input
          value={accessory}
          onChange={(event) => setAccessory(event.currentTarget.value)}
        />
      </label> */}
      <button
        onClick={async () => {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,

              csrfToken: props.csrfToken,
            }),
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          router.refresh();

          setUsers([...users, data.user]);
        }}
      >
        Create user
      </button>
      {typeof error === 'string' && <div>{error}</div>}
      <div>
        {users.map((user) => (
          <div key={`user-${user.id}`}>
            {idOnEditMode !== user.id ? (
              user.username
            ) : (
              <label>
                user
                <input
                  value={editUsername}
                  onChange={(event) =>
                    setEditUsername(event.currentTarget.value)
                  }
                />
              </label>
              // )}{' '}
              // {idOnEditMode !== user.id ? (
              //   user.type
              // ) : (
              //   <input
              //     value={editType}
              //     onChange={(event) => setEditType(event.currentTarget.value)}
              //   />
              // )}{' '}
              // {idOnEditMode !== user.id ? (
              //   user.accessory
              // ) : (
              //   <input
              //     value={editAccessory}
              //     onChange={(event) =>
              //       setEditAccessory(event.currentTarget.value)
              //     }
              //   />
            )}{' '}
            <button
              onClick={async () => {
                const response = await fetch(`/api/users/${user.id}`, {
                  method: 'DELETE',
                });

                const data = await response.json();

                if (data.error) {
                  setError(data.error);
                  return;
                }

                // router.refresh();

                setUsers(
                  users.filter(
                    (userOnState) => userOnState.id !== data.user.id,
                  ),
                );
              }}
            >
              X
            </button>
            {idOnEditMode !== user.id ? (
              <button
                onClick={() => {
                  setIdOnEditMode(user.id);
                  setEditUsername(user.username);
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  const response = await fetch(`/api/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userName: editUsername,
                    }),
                  });

                  const data = await response.json();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setIdOnEditMode(undefined);

                  router.refresh();
                  setUsers(
                    users.map((userOnState) => {
                      return userOnState.id !== data.user.id
                        ? userOnState
                        : data.user;
                    }),
                  );
                }}
              >
                save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
