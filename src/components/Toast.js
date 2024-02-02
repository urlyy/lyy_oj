import { toast } from 'react-toastify';



const customToast = (type, message) => {
    if (!["info", "success", "error", "warning"].includes(type)) {
        throw new Error("toast type must be one of 'info','success','error','warning'");
    }
    const options = {
        type: type,
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
    }
    toast(message, options)
}

export default customToast;