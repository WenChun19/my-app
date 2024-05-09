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

  console.log(result);
};
