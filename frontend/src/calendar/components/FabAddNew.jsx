import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleButton = () => {
    setActiveEvent({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "#367CF7",
        user: {
          id: "",
          name: "",
        },

    });
    openModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleButton}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
