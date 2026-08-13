export default function formatDateTime(unixTime, timezoneOffset) {
  const targetDate = new Date((unixTime + timezoneOffset) * 1000);

  const options = { timeZone: "UTC" };

  const time = targetDate.toLocaleTimeString("en-US", {
    ...options,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const day = targetDate.toLocaleDateString("en-US", {
    ...options,
    weekday: "long",
  });

  const fullDate = targetDate.toLocaleDateString("en-US", {
    ...options,
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return {
    time,
    day,
    date: fullDate,
  };
}