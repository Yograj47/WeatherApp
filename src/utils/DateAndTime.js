function getLocalDateParts(unixTime, timezone = 0) {
  if (!unixTime) {
    return {
      dateKey: null,
      hour: null,
    };
  }

  const localDate = new Date(
    (unixTime + timezone) * 1000
  );

  return {
    dateKey: localDate.toISOString().slice(0, 10),
    hour: localDate.getUTCHours(),
  };
}

export default function formatDateTime(
  unixTime,
  timezone = 0
) {
  if (!unixTime) {
    return {
      time: "—",
      day: "—",
      date: "—",
    };
  }

  const targetDate = new Date(
    (unixTime + timezone) * 1000
  );

  const options = {
    timeZone: "UTC",
  };

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

  const date = targetDate.toLocaleDateString("en-US", {
    ...options,
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return {
    time,
    day,
    date,
  };
}

export {
  getLocalDateParts,
};