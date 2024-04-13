import Card from "@/components/Card";
import { useState, useEffect, useRef } from "react";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom"
import api from './api'
import domainStore from "@/store/domain";
import { havePermission, 创建比赛, 查看未公开比赛 } from "@/utils/permission";

const ContestList = ({ data = [], onClick, listRef }) => {
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
    const statusBgColor = (startTime, endTime) => {
        const res = compareTime(startTime, endTime);
        if (res === -1) {
            return "bg-slate-300 hover:bg-slate-400";
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


    const computeTypeColor = (type) => {
        if (type === "IOI") {
            return "bg-sky-300";
        } else if (type === "ACM") {
            return "bg-green-400"
        } else {
            return "bg-slate-400"
        }
    }
    const computeDuration = (startStr, endStr) => {
        const duration = (new Date(endStr) - new Date(startStr)) / 1000;
        if (duration >= 3600) {
            return `${(duration / 3600)}小时`
        } else {
            return `${(duration / 60)}分钟`
        }
    }
    return (
        <div ref={listRef}>
            {data.map((contest, idx) => (
                <div key={idx} onClick={onClick.bind(null, contest.id)} className={`${compareTime(contest.startTime, contest.endTime) === -1 ? " cursor-not-allowed pointer-events-none" : ""} hover:bg-slate-100 cursor-pointer flex items-center h-24 gap-2 border-b border-b-slate-200`}>
                    <div className={`${statusBgColor(contest.startTime, contest.endTime)} text-white p-1 rounded-lg flex items-center flex-col text-xl font-bold`}>
                        <div>{contest.startTime.substring(0, 10)}</div>
                        <div>{contest.startTime.substring(11, 16)}</div>
                    </div>
                    <div className="flex flex-col justify-between gap-2">
                        <div className="cursor-pointer text-xl">{contest.title}</div>
                        <div className="flex gap-2">
                            <div className={`${computeTypeColor(contest.type)} p-1 rounded-lg`}>{contest.type}</div>
                            <div className="p-1">{computeDuration(contest.startTime, contest.endTime)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}



const Contests = () => {
    const { id: domainID, permission } = domainStore();
    const [contests, setContests] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const inited = useRef(false);
    const listRef = useRef(null);
    const navigate = useNavigate();

    const handleGetContests = async (newPage) => {
        listRef.current.classList.remove("animate__slideInBottom");
        setCurPage(newPage);
        const flag = havePermission(permission, 查看未公开比赛)
        const res = await api.list(domainID, newPage, flag);
        if (res.success) {
            const { contests, pageNum } = res.data;
            if (inited.current) {
                listRef.current.classList.add("animate__slideInBottom")
            }
            setContests(contests);
            setPageNum(pageNum);
        }
    }
    useEffect(() => {
        handleGetContests(1).then(_ => inited.current = true);
    }, [])
    const RightHeader = () => {
        return (
            <>
                {havePermission(permission, 创建比赛) && <button onClick={() => { navigate(`/contest/edit`) }} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">创建比赛</button>}
            </>
        )
    }
    return (
        <div className="bg-white h-full w-3/5 flex justify-center animate__slideInBottom">
            <Card className="w-full h-full " title="比赛" rightHeader={<RightHeader />}>
                <div className="flex justify-between flex-col w-full h-full">
                    <ContestList listRef={listRef} data={contests} onClick={(contestID) => { navigate(`/contest/${contestID}`) }} />
                    <Pagination onChange={(page) => handleGetContests(page)} current={curPage} pageNum={pageNum} />
                </div>
            </Card>
        </div>
    )
}
export default Contests;