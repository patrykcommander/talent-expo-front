import { formatDate } from "date-fns";

export const formatISO = (date: Date | null) => {
  return date ? formatDate(new Date(date), "dd/MM/yyyy") : null;
};
