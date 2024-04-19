import domainStore from "@/store/domain";
import userStore from "@/store/user";
import { useEffect } from "react";
import { EventSourcePolyfill } from 'event-source-polyfill';
import Toast from "../utils/toast";

import Msg from "./NotificationMsg";


const Notification = () => {
    const { id: domainID } = domainStore();
    const { token } = userStore();
    useEffect(() => {
        const eventSource = new EventSourcePolyfill(`${process.env.REACT_APP_API_BACKEND_URL}/sse/${domainID}`, {
            heartbeatTimeout: 3600000, //1小时
            headers: { Authorization: token }
        });
        eventSource.onmessage = (event) => {
            const { title, content, sendTime } = JSON.parse(event.data);
            Toast(<Msg content={content} title={title} sendTime={sendTime} />, "error", false, "top-left");

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