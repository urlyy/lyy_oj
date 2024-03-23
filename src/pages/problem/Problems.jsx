import ProblemTable from "@/components/ProblemTable"
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Card from "@/components/Card";
import { useNavigate } from "react-router-dom";
import api from './api'
import domainStore from "@/store/domain";
import { diff2text } from "@/utils/data2text";


const Filter = ({ onFilter, keyword, onKeywordChange, diff, onDiffChange }) => {
    const navigate = useNavigate();

    const RightHeader = () => {
        return (
            <div className="flex gap-2">
                <button onClick={() => navigate(`/problem/edit`)} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新增题目</button>
                <button onClick={() => { onFilter(keyword, diff) }} className="border p-1 rounded-md text-white bg-blue-400 hover:bg-blue-500">过滤</button>
            </div>
        )
    }
    return (
        <Card title={"过滤"} rightHeader={<RightHeader />}>
            <div className="flex gap-5">
                <label className="flex-1">
                    <div>按题目名或编号</div>
                    <Input value={keyword} onChange={onKeywordChange} />
                </label>
                <label className="flex-1">
                    <div>按难度</div>
                    <Select entries={[
                        ["全部", 0],
                        [diff2text(1), 1],
                        [diff2text(2), 2],
                        [diff2text(3), 3],
                    ]} selectedValue={diff} onChange={onDiffChange} className={`w-full`} />
                </label>
            </div>
        </Card>
    )
}

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [diff, setDiff] = useState(0);

    const { id: domainID } = domainStore();
    const handleGetProblems = (newPage) => {
        setCurPage(newPage);
        api.list(domainID, curPage, keyword, diff).then(res => {
            if (res.success) {
                const problems = res.data.problems;
                setProblems(problems);
            }
        })
    }
    useEffect(() => {
        handleGetProblems(1);
    }, [])
    return (
        <div className="flex h-full w-3/5 justify-center animate__slideInBottom">
            <div className="h-full w-full">
                <Filter onFilter={() => handleGetProblems(curPage)} keyword={keyword} diff={diff} onDiffChange={setDiff} onKeywordChange={setKeyword} />
                <ProblemTable data={problems} />

                <div className="border">
                    <Pagination onChange={setCurPage} current={curPage} pageNum={pageNum} />
                </div>
            </div >
        </div>

    )
}
export default Problems;