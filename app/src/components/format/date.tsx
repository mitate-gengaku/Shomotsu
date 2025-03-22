import React from "react";

export const FormatDate = ({
  date,
  ...props
}: { date: string } & React.ComponentProps<"span">) => {
  const formattedDate = new Date(date).toLocaleDateString("sv-SE", {
    timeZone: "Asia/Tokyo",
  });

  const [year, month, day] = formattedDate.split("-");

  return <span {...props} data-testid="format-date">{`${year}年${month}月${day}日`}</span>;
};
