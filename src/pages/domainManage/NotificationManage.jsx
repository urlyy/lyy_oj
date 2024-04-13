import Button from "@/components/Button";
import Card from "@/components/Card";
import Textarea from "@/components/Textarea";
import { useState } from "react";
import api from "./api";
import domainStore from "@/store/domain";
import Alert from "@/utils/alert";
const NotificationManage = () => {
    const { id: domainID } = domainStore();
    const [msg, setMsg] = useState("");
    const handleSendMsg = async () => {
        if (msg === "") { Alert("通知不能为空"); return; }
        const res = await api.sendNotification(domainID, msg);
        if (res.success) {
        }
    }
    return (
        <Card title="发送通知" className="animate__slideInBottom">
            <Textarea onChange={setMsg} value={msg} />
            <Button type="primary" onClick={handleSendMsg}>发送</Button>
        </Card>
    )
}
export default NotificationManage;