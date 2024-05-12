import { accessToken, cartId } from "../constants";
import { getCookie } from "../utils/cookies-helper";
import { validateResult } from "../utils/validation-helpers";

export const getCartProducts = async () => {
  const token = getCookie(accessToken);
  const cId = getCookie(cartId);

  let result = {};

  if (cId) {
    const response = await fetch(`http://localhost:3000/600/carts/${cId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    });

    result = await response.json();
  }

  return validateResult(result);
};

export const addCartProduct = async (products) => {
  const token = getCookie(accessToken);

  const response = await fetch("http://localhost:3000/600/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    body: JSON.stringify(products),
  });

  const result = await response.json();
  return validateResult(result);
};

export const updateCartProducts = async (cartProducts) => {
  const token = getCookie(accessToken);

  const { id } = cartProducts;
  const response = await fetch(`http://localhost:3000/600/carts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    body: JSON.stringify(cartProducts),
  });

  const result = await response.json();
  return validateResult(result);
};
