import { useState, useEffect } from "react";
import api from './api'
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Alert from "@/utils/alert";
import CodeEditor from "@/components/CodeEditor";
import Modal from "@/components/Modal";
import domainStore from "@/store/domain";
import { dateFormat, status2text, fromType2text } from "@/utils/data2text";
import Button from "@/components/Button";
import Toast from "@/utils/toast";
import { useNavigate } from "react-router-dom"
import { havePermission, 重新判题, 查看提交详情 } from "@/utils/permission";


const Filter = ({ onFilter, username, onUsernameChange, problemTitle, onProblemTitleChange, compiler, onCompilerChange, status, onStatusChange }) => {
    const [compilers, setCompilers] = useState([]);
    useEffect(() => {
        api.getCompilers().then(res => {
            if (res.success) {
                setCompilers(res.data.compilers);
            }
        })
    }, [])

    return (
        <Card title={"过滤"} rightHeader={<Button type="primary" onClick={onFilter}>过滤</Button>}>
            <div className="flex gap-5">
                <label className="flex-1">
                    <div>按用户名</div>
                    <Input value={username} onChange={onUsernameChange} />
                </label>
                <label className="flex-1">
                    <div>按题目名</div>
                    <Input value={problemTitle} onChange={onProblemTitleChange} />
                </label>
                <label className="flex-1">
                    <div>按编译器</div>
                    <Select selectedValue={compiler} onChange={onCompilerChange} entries={[["全部", ""], ...compilers.map(c => [c[0], c[1]])]} className={`w-full`} />
                </label>
                <label className="flex-1">
                    <div>按状态</div>
                    <Select selectedValue={status} onChange={onStatusChange} entries={[
                        ["全部", ""],
                        [status2text(0), 0],
                        [status2text(1), 1],
                        [status2text(2), 2],
                        [status2text(3), 3],
                        [status2text(4), 4],
                        [status2text(5), 5],
                        [status2text(6), 6],
                    ]} className={`w-full`} />
                </label>
            </div>
        </Card>
    )
}

const SubmissionTable = ({ data = [], onChange = () => { } }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedSub, setSelectedSub] = useState({});
    const navigate = useNavigate();
    const { permission } = domainStore();
    const computeStatusColor = (status) => {
        if (status === 0) {
            return "text-green-500  border-l-green-500"
        } else if (status === 6) {
            return "text-gray-500 border-l-gray-500"
        } else {
            return "text-red-500 border-l-red-500"
        }
    }
    const handleShowPopup = async (idx) => {
        const { id: sid, status, submitTime, username, maxTime, maxMemory, lang, problemTitle } = data[idx];
        const res = await api.get(sid);
        if (res.success) {
            const detail = res.data.submission;
            setSelectedSub({ code: detail.code, log: detail.log, problemTitle, status, submitTime, username, maxMemory, maxTime, lang });
        }
        setShowDetail(true);
    }
    const handleRejudge = async (e, idx) => {
        e.stopPropagation();
        const { id: submissionID } = data[idx];
        Alert("重判提交成功");
        const res = await api.rejudge(submissionID);
        if (res.success) {
            const result = res.data.result;
            const type = result.status === 0 ? "success" : "error";
            Toast("重判结果:" + status2text(result.status, result.passPercent), type);
            onChange(prev => {
                const newSub = [...prev];
                newSub[idx] = { ...newSub[idx], status: result.status, maxMemory: result.maxMemory, maxTime: result.maxTime, passPercent: result.passPercent };
                return newSub;
            })
        }
    }
    const handleNavigateType = (type, id) => {
        if (type === "contest") {
            navigate(`/contest/${id}`);
        } else if (type === "homework") {
            navigate(`/homework/${id}`);
        } else {
            navigate(`/problems`);
        }
    }
    const handleNavigateProblem = (type, problemID, typeID) => {
        if (type === "contest") {
            navigate(`/problem/${problemID}/contest/${typeID}`);
        } else if (type === "homework") {
            navigate(`/problem/${problemID}/homework/${typeID}`);
        } else {
            navigate(`/problem/${problemID}`);
        }
    }
    const showOptCol = () => {
        return havePermission(permission, 重新判题) && havePermission(permission, 查看提交详情)
    }
    return (
        <div className="border-l border-r border-t">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="border-b p-1">状态</th>
                        <th className="border-b p-1">题目</th>
                        <th className="border-b p-1 text-center">提交者</th>
                        <th className="border-b p-1 text-center">题目来源</th>
                        <th className="border-b p-1 text-center">最大耗时</th>
                        <th className="border-b p-1 text-center">最大占用内存</th>
                        <th className="border-b p-1 text-center">编译器</th>
                        <th className="border-b p-1 text-center">提交时间</th>
                        {showOptCol() && <th className="border-b p-1 text-center">操作</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-100">
                            <td className={`border-b border-l items-center p-1 ${computeStatusColor(item.status)}`}>
                                {status2text(item.status, item.passPercent)}
                            </td>
                            <td onClick={() => { handleNavigateProblem(item.fromType, item.problemID, item.fromID) }} className="border-b p-1 items-center hover:text-blue-400 cursor-pointer">{item.problemTitle}</td>
                            <td onClick={() => { navigate(`/${item.userID}/profile`) }} className="border-b p-1 text-center items-center  hover:text-blue-400 cursor-pointer">{item.username}</td>
                            <td onClick={() => { handleNavigateType(item.fromType, item.fromID) }} className="border-b p-1 items-center  hover:text-blue-400 cursor-pointer">{fromType2text(item.fromType)}{item.fromName !== "" ? "-" + item.fromName : ""}</td>
                            <td className="border-b p-1 justify-center text-center">{item.maxTime}</td>
                            <td className="border-b p-1 justify-center text-center">{item.maxMemory}</td>
                            <td className="border-b p-1 justify-center text-center">{item.lang}</td>
                            <td className="border-b p-1 text-center items-center">{dateFormat(item.submitTime)}</td>
                            {showOptCol() && <td className="border-b p-1 justify-center items-center gap-2">
                                {havePermission(permission, 重新判题) && <Button onClick={(e) => { handleRejudge(e, idx) }} type="primary">重判</Button>}
                                {havePermission(permission, 查看提交详情) && <Button onClick={(e) => { handleShowPopup(idx) }} type="success">查看</Button>}
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            {showDetail && (
                <Modal onClose={setShowDetail.bind(null, false)}>
                    <div className="flex flex-col gap-3" >
                        <div className=" text-center text-3xl">提交详情</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>提交状态</th>
                                    <th>题目名称</th>
                                    <th>运行时间</th>
                                    <th>内存</th>
                                    <th>语言</th>
                                    <th>提交时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{status2text(selectedSub.status)}</th>
                                    <th>{selectedSub.problemTitle}</th>
                                    <th>{selectedSub.maxTime}ms</th>
                                    <th>{selectedSub.maxMemory}kb</th>
                                    <th>{selectedSub.lang}</th>
                                    <th>{dateFormat(selectedSub.submitTime)}</th>
                                </tr>
                            </tbody>
                        </table>
                        <CodeEditor code={selectedSub.code} />
                        <div><pre>{selectedSub.log}</pre></div>
                        <div className="flex justify-center gap-4">
                            <button className="p-2 text-xl border rounded-md bg-green-500 hover:bg-green-600 text-white" onClick={setShowDetail.bind(null, false)}>确认</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const { id: domainID } = domainStore();
    const [username, setUsername] = useState("");
    const [problemTitle, setProblemTitle] = useState("");
    const [compiler, setCompiler] = useState("");
    const [status, setStatus] = useState("");
    const handleGetSubmissions = async (newPage) => {
        setCurPage(newPage);
        const { success, data } = await api.list(domainID, newPage, username, problemTitle, compiler, status);
        if (success) {
            const { submissions, pageNum } = data;
            setSubmissions(submissions);
            setPageNum(pageNum);
            return true;
        }
        return false;
    }
    useEffect(() => {
        handleGetSubmissions(1);
    }, [])
    const handleFilter = async () => {
        setCurPage(1);
        const res = await handleGetSubmissions(1);
        if (res) {
            Toast('过滤成功');
        }
    }
    return (
        <div className="flex w-3/5 h-full flex-col animate__slideInBottom">
            <Filter onFilter={handleFilter} username={username} onUsernameChange={setUsername} compiler={compiler} onCompilerChange={setCompiler} status={status} onStatusChange={setStatus} problemTitle={problemTitle} onProblemTitleChange={setProblemTitle} />
            <SubmissionTable data={submissions} onChange={setSubmissions} />
            <Pagination onChange={(newPage) => handleGetSubmissions(newPage)} current={curPage} pageNum={pageNum} />
        </div>
    )
}
export default Submissions;