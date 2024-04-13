import domainStore from "@/store/domain";
import userStore from "@/store/user";
import { useEffect } from "react";
import { EventSourcePolyfill } from 'event-source-polyfill';
import Toast from "../utils/toast";
import { dateFormat } from "@/utils/data2text";

const Msg = ({ text, sendTime }) => {
    return (
        <div >
            <div className="text-lg">{text}</div>
            <div>{dateFormat(sendTime)}</div>
        </div>
    )
}

const Notification = () => {
    const { id: domainID } = domainStore();
    const { token } = userStore();
    useEffect(() => {
        const eventSource = new EventSourcePolyfill(`${process.env.REACT_APP_API_BACKEND_URL}/sse/${domainID}`, {
            heartbeatTimeout: 3600000, //1小时
            headers: { Authorization: token }
        });
        eventSource.onmessage = (event) => {
            const { text, sendTime } = JSON.parse(event.data);
            Toast(<Msg text={text} sendTime={sendTime} />, "error", "top-left", false);

        };
        eventSource.onerror = (event) => {
            // console.error("SSE Error:", event);
        };
        return () => {
            eventSource.close();
        };
    }, [domainID]);
}
export default Notification;