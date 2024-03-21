import { useState, useEffect } from "react";
import api from './api'
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Alert from "@/components/Alert";
import CodeEditor from "@/components/CodeEditor";
import Modal from "@/components/Modal";
// import { useNavigate } from "react-router-dom"



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
                    <Select className={`w-full`} />
                </label>
                <label className="flex-1">
                    <div>按状态</div>
                    <Select className={`w-full`} />
                </label>
            </div>
            <div>
                <button onClick={() => api.exportExcel()}>导出</button>
            </div>
        </Card>
    )
}

const StatusTable = ({ data = [] }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState({});
    // const navigate = useNavigate();
    const computeStatusColor = (status) => {
        if (status === "Accepted") {
            return "text-green-500  border-l-green-500"
        } else if (status.includes("Wrong")) {
            return "text-red-500 border-l-red-500"
        }
    }
    const handleShowPopup = (idx) => {
        const { id } = data[idx];
        const res = {
            code: "#include<iostream>\nusing namespace std;\nint main(){\n}",
        }
        setSelectedStatus({ code: res.code });
        setShowDetail(true);
    }
    return (
        <div className="grid grid-cols-7 border-l border-r border-t">
            {showDetail && (
                <Modal onClose={setShowDetail.bind(null, false)}>
                    <div className="flex flex-col gap-3" >
                        <div className="text-center text-3xl">提交详情</div>
                        <div>答案错误 运行时间 内存 语言 提交时间</div>
                        <CodeEditor code={selectedStatus.code} />
                        <div className="flex justify-center gap-4">
                            <button className="p-2 text-xl border rounded-md bg-green-500 hover:bg-green-600 text-white" onClick={setShowDetail.bind(null, false)}>确认</button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="col-span-7 grid grid-cols-7">
                <div className="border-b p-1">状态</div>
                <div className="border-b p-1">题目</div>
                <div className="border-b p-1 text-center">提交者</div>
                <div className="border-b p-1 text-center">时间</div>
                <div className="border-b p-1 text-center">内存</div>
                <div className="border-b p-1 text-center">语言</div>
                <div className="border-b p-1 text-center">提交时间</div>
            </div>

            {data.map((item, idx) => (
                <div key={idx} onClick={() => { handleShowPopup(idx) }} className="hover:bg-slate-100 cursor-pointer col-span-7 grid grid-cols-7">
                    <div className={`border-b border-l p-1 ${computeStatusColor(item.status)}`}>{item.status}</div>
                    <div className="border-b  p-1">{item.problemName}</div>
                    <div className="border-b  p-1 text-center">{item.submitterName}</div>
                    <div className="border-b  p-1 text-center">{item.spendTime}</div>
                    <div className="border-b  p-1 text-center">{item.spendMemory}</div>
                    <div className="border-b  p-1 text-center">{item.lang}</div>
                    <div className="border-b  p-1 text-center">{item.submitTime}</div>
                </div>
            ))}
        </div>
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
                id: 1, problemName: "第一个题目", submitterID: 1, submitterName: "刘宇阳",
                spendTime: "5ms", spendMemory: "376kb", lang: "C++", submitTime: "2023-10-12 10:00",
                status: "Accepted"
            },
            {
                id: 2, problemName: "第二个题目", submitterID: 1, submitterName: "刘宇阳",
                spendTime: "5ms", spendMemory: "376kb", lang: "C++", submitTime: "2023-11-12 14:00",
                status: "80 Wrong"
            },
        ]
        data.map(item => ({ ...item, lang: langs.indexOf(item.lang) }))
        setStatusData(data);
    }, [])
    return (
        <div className="flex w-3/5 h-full flex-col animate__slideInBottom">
            <Filter />
            <StatusTable data={statusData} />
            <Pagination current={curPage} pageNum={pageNum} />
        </div>
    )
}
export default Status;