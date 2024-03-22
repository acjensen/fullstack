import { get, put } from "./actions";
import { genSaltSync, hashSync } from "bcrypt-ts";

export const mockDb = false;

export const getUser = async (email: string) => {
  if (mockDb) {
    return [
      {
        id: "uniqueId",
        email: "asdf@asdf.com",
        password: "asdfpwd",
      },
    ];
  }

  const user = await get(email);
  return user
    ? [
        {
          id: user.pk.S,
          email: email,
          password: user.password.S,
        },
      ]
    : [];
};

export const createUser = async (email: string, password: string) => {
  if (mockDb) {
    return;
  }

  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);
  put(email, { name: "password", value: hash });
};
