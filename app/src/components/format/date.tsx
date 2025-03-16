import React from "react";

export const FormatDate = ({
  date,
  ...props
}: { date: Date } & React.ComponentProps<"span">) => {
  const formattedDate = new Date(date).toLocaleDateString("sv-SE", {
    timeZone: "Asia/Tokyo",
  });

  const [year, month, day] = formattedDate.split("-");

  return <span {...props}>{`${year}年${month}月${day}日`}</span>;
};
