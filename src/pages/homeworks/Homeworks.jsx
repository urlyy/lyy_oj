import Card from "@/components/Card";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import HomeworkList from "@/components/HomeworkList";

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
    return (
        <div className="flex-1 flex justify-center">
            <div className="w-full h-full ">
                <Card title="作业">
                    <HomeworkList data={homeworks} />
                    <Pagination current={curPage} pageNum={pageNum} />
                </Card>
            </div>
        </div>
    )
}
export default Homeworks;