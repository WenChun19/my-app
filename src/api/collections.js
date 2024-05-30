import dayjs from "dayjs";
import { accessToken, collectionId, comingDailyLimit } from "../constants";
import { getCookie } from "../utils/cookies-helper";
import { validateResult } from "../utils/validation-helpers";

export const getTradingCollection = async () => {
  const token = getCookie(accessToken);
  const cId = getCookie(collectionId);

  let result = {};

  if (cId) {
    const response = await fetch(
      `http://localhost:3000/600/collections/${cId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }
    );

    result = await response.json();

    if (dayjs().isAfter(result?.availableDate, "day")) {
      result.dailyLimit = comingDailyLimit;
      result.availableDate = dayjs().format("YYYY-MM-DD");
    }
  }

  return validateResult(result);
};

export const addTradingCollections = async (collections) => {
  const response = await fetch("http://localhost:3000/collections", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify(collections),
  });

  const result = await response.json();
  return result;
};

export const updateTradingCollection = async (collection) => {
  const token = getCookie(accessToken);

  const { id } = collection;
  const response = await fetch(`http://localhost:3000/600/collections/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
    body: JSON.stringify(collection),
  });

  const result = await response.json();
  return validateResult(result);
};
