import {format} from "date-fns";
import {formatInTimeZone} from "date-fns-tz";

export const formatDateToInput = (date: Date) => {
  // Ajusta la fecha para que sea el mediodía antes de formatear
  const adjustedDate = new Date(date);

  adjustedDate.setUTCHours(12); // Establece la hora a mediodía para evitar cruces de día

  const actualDate = formatInTimeZone(adjustedDate, "America/Lima", "yyyy-MM-dd");

  console.log({date, dateNew: new Date(date), actualDate});

  return actualDate;
};
