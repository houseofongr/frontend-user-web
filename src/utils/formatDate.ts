export const formatDate = (date: string) => {
  const formattedDate = date.replace(/\.$/, "");
  return formattedDate;
};

export const convertUnixToDate = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);

  return {
    default: `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`, // "2025.06.27"
    iso: date.toISOString(), // "2025-06-27T00:25:15.000Z"
    localeDate: date.toLocaleDateString(), // "2025. 6. 27."
    locale: date.toLocaleString(), // "2025. 6. 27. 오전 9:25:15"
    localeTime: date.toLocaleTimeString(), // "오전 9:25:15"
    utc: date.toUTCString(), // "Thu, 26 Jun 2025 15:25:15 GMT"
    fullDateTime: `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
          .getSeconds()
          .toString()
          .padStart(2, "0")}`, // "2025-06-27 09:25:15"
  };
}

export const formatRelativeDate = (createdTime: number): string => {
  const now = new Date();
  const createdDate = new Date(createdTime * 1000); // Unix timestamp → ms 단위로 변환
  const diff = now.getTime() - createdDate.getTime();

  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / msPerDay);

  if (days < 1) return "오늘";
  if (days < 7) return `${days}일 전`;
  if (days < 14) return `1주 전`;
  if (days < 21) return `2주 전`;
  if (days < 28) return `3주 전`;
  if (days < 35) return `4주 전`;

  const months = Math.floor(days / 30);
  return `${months}개월 전`;
}
