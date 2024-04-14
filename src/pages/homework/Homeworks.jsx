import Card from "@/components/Card";
import { useState, useEffect, useRef } from "react";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom"
import api from "./api";
import domainStore from "@/store/domain";
import { dateFormat } from "@/utils/data2text";
import { havePermission, 查看未公开作业, 创建作业 } from "@/utils/permission";

const HomeworkList = ({ data = [], className = "", listRef }) => {
    const navigate = useNavigate();

    const compareTime = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const now = new Date();
        if (now < start) {
            return -1;
        } else if (now >= start && now <= end) {
            return 0;
        } else if (now > end) {
            return 1;
        }
    }

    const statusStyle = (startTime, endTime) => {
        const res = compareTime(startTime, endTime);
        if (res === -1) {
            return "bg-slate-300 hover:bg-slate-400 cursor-not-allowed pointer-events-none";
        } else if (res === 0) {
            return "bg-green-300 hover:bg-green-400"
        } else if (res === 1) {
            return "bg-red-300 hover:bg-red-400"
        }
    }

    const statusText = (startTime, endTime) => {
        const res = compareTime(startTime, endTime);
        if (res === -1) {
            return "未开始";
        } else if (res === 0) {
            return "进行中"
        } else if (res === 1) {
            return "已结束"
        }
    }

    const handleClick = (homeworkID) => {
        navigate(`/homework/${homeworkID}`)
    }

    return (
        <div className={`${className}`} ref={listRef}>
            {data.map((homework, idx) => (
                <div key={idx} onClick={handleClick.bind(null, homework.id)} className={`rounded-md p-2 ${statusStyle(homework.startTime, homework.endTime)} cursor-pointer flex items-center h-24 gap-2 border-b border-b-slate-200`}>
                    <div className="text-2xl border-r border-r-slate-400 h-full flex items-center p-1">
                        {statusText(homework.startTime, homework.endTime)}
                    </div>
                    <div className="flex flex-col justify-between gap-2">
                        <div className="text-xl">{homework.title}</div>
                        <div>{dateFormat(homework.startTime)} ~ {dateFormat(homework.endTime)}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const Homeworks = () => {
    const [homeworks, setHomeworks] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const inited = useRef(false);
    const listRef = useRef(null);

    const navigate = useNavigate();
    const { id: domainID, permission } = domainStore();

    const handleGetHomeworks = async (newPage) => {
        setCurPage(newPage);
        listRef.current.classList.remove("animate__slideInBottom")
        const flag = havePermission(permission, 查看未公开作业);
        const res = await api.list(domainID, newPage, flag)
        if (res.success) {
            const { homeworks, pageNum } = res.data;
            if (inited.current) {
                listRef.current.classList.add("animate__slideInBottom")
            }
            setHomeworks(homeworks);
            setPageNum(pageNum);
        }
    }

    useEffect(() => {
        handleGetHomeworks(1).then(res => inited.current = true);
    }, [])
    const RightHeader = () => {
        return (
            <>
                {havePermission(permission, 创建作业) && <button onClick={() => { navigate("/homework/edit") }} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">创建作业</button>}
            </>
        )
    }
    return (
        <div className="bg-white h-full w-3/5 flex justify-center animate__slideInBottom">
            <Card className="w-full h-full" title="作业" rightHeader={<RightHeader />}>
                <div className="flex justify-between flex-col w-full h-full">
                    <HomeworkList listRef={listRef} className="flex-1" data={homeworks} />
                    <Pagination onChange={(page) => handleGetHomeworks(page)} current={curPage} pageNum={pageNum} />
                </div>
            </Card>
        </div>
    )
}
export default Homeworks;