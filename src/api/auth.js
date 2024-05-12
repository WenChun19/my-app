import { accessToken } from "../constants";
import { getCookie } from "../utils/cookies-helper";
import { validateResult } from "../utils/validation-helpers";

export const signIn = async ({ email, password }) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();
  return result;
};

export const signUp = async ({ email, password }) => {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await response.json();

  return result;
};

export const editUser = async (user) => {
  const token = getCookie(accessToken);

  const response = await fetch(`http://localhost:3000/600/users/${user?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    body: JSON.stringify(user),
  });

  const result = await response.json();
  return validateResult(result);
};

export const getUser = async (user) => {
  const token = getCookie(accessToken);

  const response = await fetch(`http://localhost:3000/600/users/${user?.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
  });

  const result = await response.json();
  return validateResult(result);
};
