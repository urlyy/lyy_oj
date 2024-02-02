import QuestionTable from "@/components/QuestionTable"
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Card from "@/components/Card";
import { useNavigate } from "react-router-dom";
const Filter = ({ onClick }) => {
    const navigate = useNavigate();
    const [cond, setCond] = useState({
        username_uid: "",
        problemName_pid: "",
        contestName_cid: "",
        lang: "c++",
        status: 0,
    })
    const RightHeader = () => {
        return (
            <div className="flex gap-2">
                <button onClick={() => navigate(`/problem/edit`)} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新增题目</button>
                <button className="border p-1 rounded-md text-white bg-blue-400 hover:bg-blue-500">过滤</button>
            </div>
        )
    }
    return (
        <Card title={"过滤"} rightHeader={<RightHeader />}>
            <div className="flex gap-5">
                <label className="flex-1">
                    <div>按题目名或编号</div>
                    <Input />
                </label>
                <label className="flex-1">
                    <div>按难度</div>
                    <Select className={`w-full`} />
                </label>
            </div>
        </Card>
    )
}

const Problems = () => {
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
                <Filter />
                {/* <div className="border">
                    <Pagination current={curPage} pageNum={pageNum} />
                </div> */}


                <QuestionTable data={problems} />

                <div className="border">
                    <Pagination current={curPage} pageNum={pageNum} />
                </div>
            </div >
        </div>

    )
}
export default Problems;