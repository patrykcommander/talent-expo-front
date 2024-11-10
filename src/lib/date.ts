import { formatDate } from "date-fns";

export const formatISO = (date: Date) => {
  return formatDate(new Date(date), "dd/MMMM/yyyy");
};
