import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }


    const startSavingEvent = async (calendarEvent) => {

        try {
            // Actualización
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
    
            // Creación
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error al actualizar",
                text: error.response.data.msg,
                icon: "error",
                confirmButtonColor: "#3B71CA", // Cambia el color aquí
              });
        }


    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);  // Llegar al backend
            dispatch(onDeleteEvent());  // Eliminar del store
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error al eliminar",
                text: error.response.data.msg,
                icon: "error",
                confirmButtonColor: "#3B71CA", // Cambia el color aquí
            });
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error cargando eventos.');
            console.log(error);
        }
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
        startLoadingEvents,
    }

}