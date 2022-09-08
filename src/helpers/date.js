import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);

export const getDateTimeMessage = (unix) => {
  return dayjs.unix(unix).toDate().toString();
};

export const getDateMessage = (unix) => {
  return dayjs.unix(unix).format("MMMM DD, YYYY");
};

export const getElapsedTimeMessage = (unix) => {
  return dayjs().to(dayjs.unix(unix));
};
