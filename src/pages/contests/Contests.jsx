import Card from "@/components/Card";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import ContestList from "@/components/ContestList";
import { useNavigate } from "react-router-dom"
const Contests = () => {
    const [contests, setContests] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const navigate = useNavigate();
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
    const RightHeader = () => {
        return (
            <button className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新建测验</button>
        )
    }
    return (
        <div className="h-full w-3/5 flex justify-center">
            <Card className="w-full h-full " title="所有测验" rightHeader={<RightHeader />}>
                <ContestList data={contests} onClick={(contestID) => { console.log(contestID); navigate(`/problems/contest/${contestID}`) }} />
                <Pagination current={curPage} pageNum={pageNum} />
            </Card>
        </div>
    )
}
export default Contests;