export const getMarketStatus = () => {
  // Current time in UTC
  const now = new Date();
  
  // Convert to Eastern Standard Time (EST)
  // EST is UTC-5 (or UTC-4 during Daylight Saving Time)
  // For simplicity, we'll use New York's timezone
  const nyTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    weekday: "long",
  }).formatToParts(now);

  const day = nyTime.find(p => p.type === "weekday")?.value;
  const hour = parseInt(nyTime.find(p => p.type === "hour")?.value || "0");
  const minute = parseInt(nyTime.find(p => p.type === "minute")?.value || "0");

  const isWeekend = day === "Saturday" || day === "Sunday";
  
  // US Market Hours: 9:30 AM - 4:00 PM EST
  const marketOpen = hour > 9 || (hour === 9 && minute >= 30);
  const marketClosed = hour >= 16;
  const isOpen = !isWeekend && marketOpen && !marketClosed;

  let label = "Market Closed";
  if (isOpen) label = "Market Open";
  else if (isWeekend) label = "Market Closed (Weekend)";
  else if (hour < 9 || (hour === 9 && minute < 30)) label = "Pre-Market";
  else if (hour >= 16) label = "After-Hours";

  return {
    isOpen,
    label,
    nyTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} EST`
  };
};
