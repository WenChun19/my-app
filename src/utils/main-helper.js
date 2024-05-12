import { getRelativeTime } from "./format-helper";

export const getProductAvailableStatus = (date) => {
  const relativeTime = getRelativeTime(date);

  return relativeTime !== "Expired";
};
