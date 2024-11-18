import { formatDate } from "date-fns";

export const formatISO = (date: Date | undefined | string) => {
  return date instanceof Date
    ? formatDate(new Date(date), "dd/MM/yyyy")
    : undefined;
};
