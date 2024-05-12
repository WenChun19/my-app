import { accessToken, cartId } from "../constants";
import { removeCookie } from "./cookies-helper";

export const validateResult = (result) => {
  // console.log(result);
  if (typeof result === "string" && result?.includes("malformed")) {
    removeCookie(cartId);
    removeCookie(accessToken);
    // TO-DO
    // Need redirect logout


    // throw new Error(401);
  }

  return result;
};
