import Card from "@/components/Card";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
const Contests = () => {
    const [contests, setContests] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        const computeDuration = (duration) => {
            if (duration >= 3600) {
                return `${duration / 3600}小时`
            } else {
                return `${duration / 60}分钟`
            }
        }
        const data = [
            { id: 1, name: "CF第一场比赛", status: 0, participant: 30, type: "IO", duration: 3600, startTime: "2022-09-01 14:00" },
            { id: 2, name: "VJ第三场比赛", status: 1, participant: 56, type: "ACM", duration: 1800, startTime: "2022-08-01 15:00" },
            { id: 3, name: "JSUACM第三场比赛", status: 2, participant: 80, type: "ACM", duration: 1800, startTime: "2022-08-01 15:00" }
        ].map(item => (
            { ...item, duration: computeDuration(item.duration) }
        ))
        setContests(data);
    }, [])
    const computeStatusColor = (status) => {
        if (status === 0) {
            return "bg-slate-400";
        } else if (status === 1) {
            return "bg-green-400"
        } else if (status === 2) {
            return "bg-red-400"
        }
    }
    const computeTypeColor = (type) => {
        if (type === "IO") {
            return "bg-sky-300";
        } else if (type === "ACM") {
            return "bg-green-400"
        } else {
            return "bg-slate-400"
        }
    }
    return (
        <div className="flex-1 flex justify-center">
            <div className="w-full h-full ">
                <Card title="所有测验">
                    <div>
                        {contests.map((contest, idx) => (
                            <div key={idx} className="cursor-pointer flex items-center h-24 gap-2 border-b border-b-slate-200">
                                <div className={`${computeStatusColor(contest.status)} p-1 rounded-lg flex items-center flex-col text-xl font-bold`}>
                                    <div>{contest.startTime.substring(0, 10)}</div>
                                    <div>{contest.startTime.substring(11, 16)}</div>
                                </div>
                                <div className="flex flex-col justify-between gap-2">
                                    <div className="cursor-pointer text-xl">{contest.name}</div>
                                    <div className="flex gap-2">
                                        <div className={`${computeTypeColor(contest.type)} p-1 rounded-lg`}>{contest.type}</div>
                                        <div className="p-1">{contest.duration}</div>
                                        <div className="p-1">{contest.participant}人参加</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination current={curPage} pageNum={pageNum} />
                </Card>
            </div>
        </div>
    )
}
export default Contests;