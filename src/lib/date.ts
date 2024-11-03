import dayjs from "dayjs";

export const formatDateToInput = (date: Date) => {
  const adjustedDate = new Date(date);

  adjustedDate.setUTCHours(12);
  const actualDate = dayjs(adjustedDate).format("DD/MM/YYYY");

  return actualDate;
};
