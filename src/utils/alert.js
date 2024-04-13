import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Alert = (title = "", html = <></>, onConfirm = () => { }, showCancelButton = false, onDeny = () => { }) => {
    const option = {
        showCancelButton: showCancelButton,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonColor: "#3085d6",
    }
    if (title !== "") {
        option['title'] = title;
    }
    if (html !== <></>) {
        option['html'] = html;
    }
    MySwal.fire(option).then(({ isConfirmed, isDenied }) => {
        if (isConfirmed) {
            onConfirm();
        } else if (isDenied) {
            onDeny();
        }
    })
}

export default Alert;