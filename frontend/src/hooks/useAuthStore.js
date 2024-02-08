import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector(state => state.auth);

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({ uid: data.uid, name: data.name }));
        } catch (error) {
            dispatch(onLogout(error.response.data.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth/register", { name, email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({ uid: data.uid, name: data.name }));
        } catch (error) {
            console.log(error);
            dispatch(onLogout(error.response.data.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        // Props
        status,
        user,
        errorMessage,

        // Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
};