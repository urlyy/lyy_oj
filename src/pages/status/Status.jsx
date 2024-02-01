import { useState, useEffect } from "react";
import api from './api'
import Pagination from "@/components/Pagination";
import StatusTable from "@/components/StatusTable";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";


const Filter = ({ onClick }) => {
    const [cond, setCond] = useState({
        username_uid: "",
        problemName_pid: "",
        contestName_cid: "",
        lang: "c++",
        status: 0,
    })
    return (
        <Card title={"过滤"}>
            <div className="flex gap-5">
                <label className="flex-1">
                    <div>按用户名或UID</div>
                    <Input />
                </label>
                <label className="flex-1">
                    <div>按题目名或编号</div>
                    <Input />
                </label>
                <label className="flex-1">
                    <div>按比赛名或编号</div>
                    <Input />
                </label>
                <label className="flex-1">
                    <div>按语言</div>
                    <Select />
                </label>
                <label className="flex-1">
                    <div>按状态</div>
                    <Select />
                </label>
            </div>
        </Card>
    )
}

const Status = () => {
    const [statusData, setStatusData] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        const langs = [
            "Java",
            "C++",
        ]
        const data = [
            {
                id: 1, problemName: "第一个题目", submitter: { id: 1, name: "刘宇阳" },
                spendTime: "5ms", spendMemory: "376kb", lang: "C++"
            },

        ]
        data.map(item => ({ ...item, lang: langs.indexOf(item.lang) }))
        setStatusData(data);
    }, [])
    return (
        <div className="flex flex-1 flex-col">
            <Filter />
            <StatusTable data={statusData} />
            <Pagination current={curPage} pageNum={pageNum} />
        </div>
    )
}
export default Status;