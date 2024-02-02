import Card from "@/components/Card";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom"


const HomeworkList = ({ data = [] }) => {
    const navigate = useNavigate();
    const computeStatusColor = (finished, expire) => {
        if (finished) {
            return "bg-green-200 hover:bg-green-300";
        } else if (expire) {
            return "bg-red-200 hover:bg-red-300"
        } else {
            return "bg-slate-200 hover:bg-slate-300";
        }
    }
    const computeStatusText = (finished, expire) => {
        if (finished) {
            return "已完成";
        } else if (!expire) {
            return "待完成";
        } else {
            return "已过期";
        }
    }
    const handleClick = (homeworkID) => {
        navigate(`/problems/homework/${homeworkID}`)
    }
    return (
        <div>
            {data.map((homework, idx) => (
                <div key={idx} onClick={handleClick.bind(null, homework.id)} className={`rounded-md  p-2 ${computeStatusColor(homework.finished, false)} cursor-pointer flex justify-between items-center h-24 gap-2 border-b border-b-slate-200`}>
                    <div className="flex flex-col justify-between gap-2">
                        <div className="text-xl">{homework.name}</div>
                        <div>{homework.startTime} ~ {homework.endTime}</div>
                    </div>
                    <div>
                        {computeStatusText(homework.finished, false)}
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


    useEffect(() => {
        const data = [
            { id: 1, name: "第一次作业", startTime: "2020-01-01 14:00", endTime: "2022-01-01 15:00", finished: false },
            { id: 2, name: "第二次作业", startTime: "2020-01-01 14:00", endTime: "2022-01-01 15:00", finished: true }
        ]
        setHomeworks(data);
    }, [])
    const RightHeader = () => {
        return (
            <button className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新建作业</button>
        )
    }
    return (
        <div className="h-full w-3/5 flex justify-center">
            <Card className="w-full h-full" title="作业" rightHeader={<RightHeader />}>
                <HomeworkList data={homeworks} />
                <Pagination current={curPage} pageNum={pageNum} />
            </Card>
        </div>
    )
}
export default Homeworks;