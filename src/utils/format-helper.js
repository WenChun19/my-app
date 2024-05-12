import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { maxExpiredDays, maxLatestDays, minExpiredDays } from "../constants";

dayjs.extend(relativeTime);

export const getRelativeTime = (date) => {
  const dayDiff = dayjs().diff(date, "d");

  if (dayDiff <= maxLatestDays) {
    return "NEW";
  } else if (dayDiff >= minExpiredDays && dayDiff <= maxExpiredDays) {
    const timeLeft = dayjs().to(dayjs(date).add(maxExpiredDays, "day"));
    return `Expiring ${timeLeft}`;
  } else if (dayDiff > maxExpiredDays) {
    return "Expired";
  }

  return dayjs(date).fromNow();
};


