import React from "react";

export const CalendarEventBox = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <span>{title}</span>
      <small> ({user.name})</small>
    </>
  );
};
