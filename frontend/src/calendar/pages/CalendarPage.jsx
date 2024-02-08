import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import { calendarLocalizer, getMessagesES } from "../../helpers";

// import enUS from "date-fns/locale/en-US";
import { CalendarEventBox, CalendarModal, Navbar } from "../";
import { useState } from "react";
import { useUiStore } from "../../hooks";

const events = [
  {
    title: "Cumpleaños del jefe",
    notes: "Comprar el regalo",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Matías",
    },
  },
];

export const CalendarPage = () => {
  const { openModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openModal();
  };

  const onSelectEvent = (event) => {
    console.log("onSelectEvent", event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={calendarLocalizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 100px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
};
