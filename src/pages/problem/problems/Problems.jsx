import QuestionTable from "@/components/QuestionTable"
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Card from "@/components/Card";
import { useNavigate } from "react-router-dom";
import api from '../api'
import domainStore from "@/store/domain";


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
    const { id: domainID } = domainStore();
    const handleGetProblems = (newPage) => {
        setCurPage(newPage);
        api.getProblems(domainID, curPage).then(res => {
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
                <Filter />
                {/* <div className="border">
                    <Pagination current={curPage} pageNum={pageNum} />
                </div> */}
                <QuestionTable data={problems} />

                <div className="border">
                    <Pagination onChange={setCurPage} current={curPage} pageNum={pageNum} />
                </div>
            </div >
        </div>

    )
}
export default Problems;