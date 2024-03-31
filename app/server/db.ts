import { genSaltSync, hashSync } from 'bcrypt-ts';
import { get, put } from './actions';

export const useMockDb = false;

export const getUser = async (email: string) => {
  if (useMockDb) {
    return [
      {
        id: 'uniqueId',
        email: 'asdf@asdf.com',
        password: 'asdfpwd',
      },
    ];
  }

  const user = await get(email);
  return user
    ? [
      {
        id: user.pk.S,
        email,
        password: user.password.S,
      },
    ]
    : [];
};

export const createUser = async (email: string, password: string) => {
  if (useMockDb) {
    return;
  }

  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  put(email, { name: 'password', value: hash });
};
