import { useDispatch, useSelector } from "react-redux";
import { onOpenModal, onCloseModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isModalOpen } = useSelector((state) => state.ui);

    const openModal = () => {
        dispatch(onOpenModal());
    };

    const closeModal = () => {
        dispatch(onCloseModal());
    }

    return {
        // * Props
        isModalOpen,

        // * Methods
        openModal,
        closeModal,
    };

};