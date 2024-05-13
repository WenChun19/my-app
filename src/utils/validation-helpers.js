import { resetAuth } from "./cookies-helper";

export const validateResult = (result) => {
  // console.log(result);
  if (typeof result === "string" && result?.includes("malformed")) {
    resetAuth()
    // TO-DO
    // Need redirect logout

    // throw new Error(401);
  }

  return result;
};
