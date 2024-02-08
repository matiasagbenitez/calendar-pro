import Swal from "sweetalert2";
import 'animate.css';

const showSuccessToast = (message) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });

    Toast.fire({
        icon: "success",
        title: message,
    });
};

const showErrorAlert = (message = "") => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        customClass: {
            container: "my-sweetalert-container",
        },
        confirmButtonColor: "#0D6EFD",
        background: "rgba(255, 255, 255, 0.8)",
        confirmButtonText: "Cerrar",

    });
};

const showConfirmationAlert = (title, text, icon = "warning", showCancelButton = true) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#111827",
        confirmButtonText: 'Confirmar',
        showCancelButton: showCancelButton,
        cancelButtonColor: '#dc2626',
        cancelButtonText: 'Cancelar',
        showClass: {
            popup: "animate__animated animate__bounceIn",
        },
    });
};

const showLoadingAlert = async (title, text, callback) => {
    let timerInterval;
    const loadingAlert = Swal.fire({
        title: title,
        text: text,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => { }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        },
    });

    try {
        await callback();
        loadingAlert.close();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema durante la carga.',
        });
    }
};

const showSuccessAlert = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        confirmButtonColor: "#0D6EFD",
        confirmButtonText: 'Cerrar',
        showClass: {
            popup: "animate__animated animate__bounceIn",
        },
    });
}

const showThreeOptionsAlert = (title, text, amateur = false) => {
    return Swal.fire({
        title: title,
        text: text,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar y asociar',
        confirmButtonColor: '#198754',
        denyButtonText: 'Guardar sin asociar',
        denyButtonColor: '#adb5bd',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#dc3545',
        showClass: {
            popup: "animate__animated animate__bounceIn",
        },
    });
};

//   Exportamos
export { showSuccessToast, showErrorAlert, showConfirmationAlert, showLoadingAlert, showSuccessAlert, showThreeOptionsAlert };