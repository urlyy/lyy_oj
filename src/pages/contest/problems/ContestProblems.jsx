import QuestionTable from "@/components/QuestionTable"
import { useState, useEffect } from "react";

const ContestProblems = () => {
    const [problems, setProblems] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        let data = [
            { id: 1, name: "第一个题目", submit: 10, ac: 5, diff: 0 },
            { id: 2, name: "第二个题目", submit: 30, ac: 10, diff: 1 }
        ]
        const computeDiff = (diff) => {
            if (diff === 0) {
                return "Easy"
            } else if (diff === 1) {
                return "Medium"
            } else if (diff === 2) {
                return "Hard";
            }
        }
        data = data.map(item => ({
            ...item, diff: computeDiff(item.diff)
        }))
        setProblems(data);

    }, [])
    return (
        <div className="flex h-full w-3/5 justify-center">
            <div className="h-full w-full">
                <QuestionTable data={problems} />
            </div >
        </div>

    )
}
export default ContestProblems;