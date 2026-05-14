export default function formatDateTime(unixTime, timezoneOffset) {
  // 1. Create a Date object using the UTC unixTime (in milliseconds)
  // Do NOT add the offset here; JavaScript handles the UTC baseline
  const date = new Date(unixTime * 1000);

  // 2. Use 'UTC' and manual offset or Intl.DateTimeFormat
  // However, the easiest way to show the "Local Time" of the searched city 
  // without a library like Luxon is to calculate the target UTC time:
  const utc = unixTime + new Date().getTimezoneOffset() * 60;
  const targetDate = new Date((unixTime + timezoneOffset) * 1000);

  // To avoid double-offsetting, we use the 'UTC' time zone for formatting
  // which forces JS to respect the math we did above.
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