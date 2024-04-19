import { toast } from 'react-toastify';

const Toast = (message, type = "info", autoClose = true, position = "top-center", className = "") => {
    if (!["info", "success", "error", "warning"].includes(type)) {
        throw new Error("toast type must be one of 'info','success','error','warning'");
    }
    const options = {
        type: type,
        position: position,
        autoClose: autoClose ? type === "success" ? 250 : 1000 : false,
        hideProgressBar: true,
        className: className,
        closeOnClick: true,
        theme: "colored",
    }
    toast(message, options);
}

export default Toast;