import { parseISO, format } from "date-fns";

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:ss");
};

export { formatDate };
