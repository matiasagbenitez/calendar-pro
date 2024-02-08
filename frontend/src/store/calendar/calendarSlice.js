import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        activeEvent: null,
        events: [],
    },
    reducers: {
        onSetActiveEvent: (state, action) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, action) => {
            state.events = state.events.map((event) => (event.id === action.payload.id) ? action.payload : event);
        },
        onDeleteEvent: (state, action) => {
            state.events = state.events.filter((event) => event.id !== state.activeEvent.id);
            state.activeEvent = null;
        },
        onLoadEvents: (state, action) => {
            state.isLoadingEvents = false;
            // state.events = action.payload;
            action.payload.forEach((event) => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }
            });
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.activeEvent = null;
            state.events = [];
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;