export const formattedDate = (timestamp) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let formattedDate;
  formattedDate = new Date(timestamp);
  const date = formattedDate.getDate();
  const month = monthNames[formattedDate.getMonth()];

  formattedDate = month + " " + date + ", " + formattedDate.getFullYear();

  return formattedDate;
};
