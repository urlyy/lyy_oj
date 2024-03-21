import Card from "@/components/Card";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom"
import api from "../api";
import domainStore from "@/store/domain";
import { dateFormat } from "@/utils/data2text";

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
                        <div className="text-xl">{homework.title}</div>
                        <div>{dateFormat(homework.startTime)} ~ {dateFormat(homework.endTime)}</div>
                    </div>
                    <div>
                        {/* {computeStatusText(homework.finished, false)} */}
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
    const navigate = useNavigate();
    const { id: domainID } = domainStore();

    const handleGetHomeworks = async (newPage) => {
        setCurPage(newPage);
        api.getHomeworks(domainID, curPage).then(res => {
            if (res.success) {
                const homeworks = res.data.homeworks;
                setHomeworks(homeworks);
            }
        })
    }

    useEffect(() => {
        handleGetHomeworks(1);

    }, [])
    const RightHeader = () => {
        return (
            <button onClick={() => { navigate("/homework/edit") }} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新建作业</button>
        )
    }
    return (
        <div className="h-full w-3/5 flex justify-center animate__slideInBottom">
            <Card className="w-full h-full" title="作业" rightHeader={<RightHeader />}>
                <HomeworkList data={homeworks} />
                <Pagination current={curPage} pageNum={pageNum} />
            </Card>
        </div>
    )
}
export default Homeworks;