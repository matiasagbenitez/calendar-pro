import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        // TODO: backend, etc.

        if (calendarEvent._id) {
            // Update
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // Add
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingEvent = async () => {
        if (activeEvent === null) return;
        dispatch(onDeleteEvent());
    }


    return {
        // * Props
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // * Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }

}