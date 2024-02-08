import { useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
import { showErrorAlert } from "../../utilities";
import { useUiStore } from "../../hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isModalOpen, closeModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "Notas del evento",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    return formValues.title.trim().length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const onCloseModal = () => {
    closeModal();
  };

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changingValue) => {
    setFormValues({
      ...formValues,
      [changingValue]: event,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (difference < 0 || difference === 0 || isNaN(difference)) {
      showErrorAlert("La fecha de fin debe ser mayor a la de inicio");
      return;
    }

    if (formValues.title.trim().length < 2) {
      showErrorAlert("El título es obligatorio");
      return;
    }

    onCloseModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h2> Nuevo evento </h2>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="d-flex gap-2">
          <div className="form-group mb-2 col-6">
            <label className="mb-1">Fecha y hora inicio</label>
            <DatePicker
              locale="es"
              className="form-control"
              selected={formValues.start}
              onChange={(event) => onDateChange(event, "start")}
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2 col-6">
            <label className="mb-1">Fecha y hora fin</label>
            <DatePicker
              locale="es"
              minDate={formValues.start}
              className="form-control"
              selected={formValues.end}
              onChange={(event) => onDateChange(event, "end")}
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
              timeCaption="Hora"
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <label className="mb-1">Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="4"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block float-end mt-2"
        >
          <i className="far fa-save me-1"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
