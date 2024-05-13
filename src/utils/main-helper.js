import { getRelativeTime } from "./format-helper";

export const getProductAvailableStatus = (date) => {
  const relativeTime = getRelativeTime(date);

  return relativeTime !== "Expired";
};

export const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
