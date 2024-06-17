import Button from "@/components/Button";
import Card from "@/components/Card";
import Textarea from "@/components/Textarea";
import { useEffect, useState } from "react";
import api from "./api";
import domainStore from "@/store/domain";
import Alert from "@/utils/alert";
import Toast from "@/utils/toast";
import { havePermission, 删除通知, 创建通知 } from "@/utils/permission";
import Pagination from "@/components/Pagination";
import Msg from "@/components/NotificationMsg";

const NotificationManage = () => {
    const { id: domainID, permission } = domainStore();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [notifications, setNotifications] = useState([]);

    const handleGetNotifications = async (newPage) => {
        setCurPage(newPage);
        const res = await api.list(domainID, newPage);
        if (res.success) {
            const { list, pageNum } = res.data;
            setNotifications(list);
            setPageNum(pageNum);
        }
    }
    const handleClickDetail = async (idx) => {
        const { title, content, id, createTime } = notifications[idx];
        Toast(<Msg content={content} title={title} sendTime={createTime} />, "error", false, "top-left");
    }
    const handleSendMsg = async () => {
        if (title === " ") { Alert("通知标题不能为空"); return; }
        const res = await api.add(domainID, title, content);
        setContent("");
        setTitle("");
        if (res.success) {
            Toast("发送通知成功", "success");
            const { id, title, content, createTime } = res.data;
            setNotifications(prev => [{ id, title, content, createTime }, ...prev])
        }
    }
    const handleRemove = async (e, idx) => {
        e.stopPropagation();
        Alert("确定删除通知吗？", <></>, async () => {
            const res = await api.remove(domainID, notifications[idx].id);
            if (res.success) {
                Toast("删除通知成功", "success");
                setNotifications(notifications.filter((_, i) => i !== idx))
            }
        }, true)
    }
    useEffect(() => {
        handleGetNotifications(1);
    }, [])
    return (
        <div className="flex w-3/5 h-full flex-col animate__slideInBottom">
            {havePermission(permission, 创建通知) && <Card title="创建通知">
                <div className="text-xl">标题</div>
                <Textarea scroll={false} onChange={setTitle} value={title} />
                <div className="text-xl">内容</div>
                <Textarea scroll={false} onChange={setContent} value={content} />
                <Button type="primary" onClick={handleSendMsg}>发送</Button>
            </Card>}
            <Card title="通知列表-点击查看详情">
                {notifications.map((item, idx) => (
                    <div onClick={handleClickDetail.bind(null, idx)} className="justify-between flex items-center hover:bg-slate-100 cursor-pointer text-lg p-2 border rounded-md" key={idx} >
                        <div >{item.title}</div>
                        {havePermission(permission, 删除通知) && <Button onClick={(e) => { handleRemove(e, idx) }} type="danger">删除</Button>}
                    </div>

                ))}
                <Pagination current={curPage} pageNum={pageNum} onChange={handleGetNotifications} />
            </Card>
        </div>
    )
}
export default NotificationManage;