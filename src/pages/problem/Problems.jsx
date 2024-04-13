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
import Toast from "@/utils/toast";
import { havePermission, 查看未公开题目, 创建题目 } from "@/utils/permission";



const Filter = ({ onFilter, keyword, onKeywordChange, diff, onDiffChange }) => {
    const navigate = useNavigate();
    const { permission } = domainStore();

    const handleFilter = async () => {
        const res = await onFilter();
        if (res) Toast("过滤题目成功", "success");
    }

    const RightHeader = () => {
        return (
            <div className="flex gap-2">
                {havePermission(permission, 创建题目) && <button onClick={() => navigate(`/problem/edit`)} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">创建题目</button>}
                <button onClick={handleFilter} className="border p-1 rounded-md text-white bg-blue-400 hover:bg-blue-500">过滤</button>
            </div>
        )
    }
    return (
        <Card title={"过滤"} rightHeader={<RightHeader />}>
            <div className="flex gap-5">
                <label className="flex-1">
                    <div>按题目名</div>
                    <Input value={keyword} onChange={onKeywordChange} />
                </label>
                <label className="flex-1">
                    <div>按难度</div>
                    <Select entries={[
                        ["全部", 0],
                        [diff2text(1), 1],
                        [diff2text(2), 2],
                        [diff2text(3), 3],
                    ]} selectedValue={diff} onChange={(str) => onDiffChange(parseInt(str))} className={`w-full`} />
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
    const { permission } = domainStore();

    const { id: domainID } = domainStore();
    const handleGetProblems = async (newPage) => {
        setCurPage(newPage);
        const flag = havePermission(permission, 查看未公开题目);
        const res = await api.list(domainID, newPage, keyword, diff, flag)
        if (res.success) {
            const { problems: newProblems, pageNum } = res.data;
            setProblems(newProblems);
            setPageNum(pageNum);
            return true;
        }
        return false;
    }
    useEffect(() => {
        handleGetProblems(1);
    }, [])
    return (
        <div className="bg-white flex h-full w-3/5 justify-center animate__slideInBottom">
            <div className="h-full w-full flex flex-col">
                <Filter onFilter={handleGetProblems.bind(null, 1)} keyword={keyword} diff={diff} onDiffChange={setDiff} onKeywordChange={setKeyword} />
                <ProblemTable data={problems} />
                <Pagination onChange={(newPage) => { handleGetProblems(newPage) }} current={curPage} pageNum={pageNum} />
            </div >
        </div>

    )
}
export default Problems;