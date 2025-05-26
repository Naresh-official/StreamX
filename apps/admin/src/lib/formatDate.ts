export function formatDate(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = Math.max(0, now.getTime() - date.getTime());

  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const week = Math.floor(day / 7);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (year > 0) {
    return year === 1 ? "1 year" : `${year} years`;
  } else if (month > 0) {
    return month === 1 ? "1 month" : `${month} months`;
  } else if (week > 0) {
    return week === 1 ? "1 week" : `${week} weeks`;
  } else if (day > 0) {
    return day === 1 ? "1 day" : `${day} days`;
  } else if (hr > 0) {
    return hr === 1 ? "1 hr" : `${hr} hrs`;
  } else if (min > 0) {
    return min === 1 ? "1 min" : `${min} mins`;
  } else {
    return sec === 1 ? "1 sec" : `${sec} secs`;
  }
}

export function getDateString(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
