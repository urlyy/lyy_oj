import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import RichTextEditor from "@/components/RichTextEditor";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api";
import domainStore from "@/store/domain";
import { str2date, str2time } from "@/utils/data2text";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import ProblemTable from "@/components/ProblemTable";
import Alert from "@/utils/alert";
import Button from "@/components/Button";
import Toast from "@/utils/toast";
import ProblemSelectModal from "@/components/ProblemSelectModal";

const Header = ({ children }) => {
    return (
        <h2 className="text-2xl mb-2">{children}</h2>
    )
}

const ContestEdit = () => {
    const { id: domainID } = domainStore();
    const navigate = useNavigate();
    const { contestID: contestIDStr = null } = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [pub, setPublic] = useState(false);
    const [type, setType] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectProblems, setSelectProblems] = useState([]);
    const [showSelectModal, setShowSelectModal] = useState(false);
    const [problems, setProblems] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const { problemID: problemIDStr = null } = useParams();

    const handleGetProblems = async (newPage) => {
        setCurPage(newPage);
        const res = await api.listProblem(domainID, newPage);
        if (res.success) {
            const { problems } = res.data;
            setProblems(problems);
        }
    }
    useEffect(() => {
        handleGetProblems(1);
        if (contestIDStr !== null) {
            api.get(domainID, contestIDStr).then(res => {
                if (res.success) {
                    const contest = res.data.contest;
                    setTitle(contest.title);
                    setDesc(contest.desc);
                    setPublic(contest.public);
                    setStartDate(str2date(contest.startTime));
                    setStartTime(str2time(contest.startTime));
                    setEndDate(str2date(contest.endTime));
                    setEndTime(str2time(contest.endTime));
                    setType(contest.type);
                    setSelectProblems(Array.from({ length: contest.problemIDs.length }).fill({}));
                    contest.problemIDs.forEach(async (id, idx) => {
                        const r = await api.getProblem(domainID, id);
                        if (r.success) {
                            const p = r.data.problem;
                            setSelectProblems(prev => {
                                const newProblems = [...prev];
                                newProblems[idx] = p;
                                return newProblems;
                            });
                        }
                    })
                }
            })
        }
    }, [])

    const handleChangePage = (newPage) => {
        handleGetProblems(newPage);
    }


    const handleRemoveProblem = (idx) => {
        setSelectProblems(prev => prev.filter((_, i) => i !== idx));
    }

    const handleSelectProblem = (id, title) => {
        setSelectProblems(prev => [...prev, { id, title }]);
    }


    const handleSubmit = async () => {
        if (title === "" || desc === "" || startDate === "" || startTime === "" || endDate === "" || endTime === "") {
            Alert("不能为空");
            return;
        }
        if (endDate < startDate) {
            Alert("结束时间不能早于开始时间");
            return;
        }
        if (endDate === startDate && endTime <= startDate) {
            Alert("结束时间不能早于开始时间");
            return;
        }
        const start = startDate + " " + startTime;
        const end = endDate + " " + endTime;
        const res = await api.add(domainID, {
            title, desc, pub,
            start, end, contestID: contestIDStr ? parseInt(contestIDStr) : null, type,
            problemIDs: selectProblems.map(item => item.id),
        });
        if (res.success) {
            if (contestIDStr === null) {
                Toast("创建比赛成功");
            } else {
                Toast("修改比赛成功");
            }
            navigate("/contests");
        } else {
            Alert(res.msg)
        }
    }

    const handleRemove = async () => {
        Alert("确认删除这个比赛吗?", <></>, async () => {
            const res = await api.remove(domainID, contestIDStr);
            if (res.success) {
                Toast("删除比赛成功", "success");
                navigate("/contests")
            }
        }, true)

    }

    const handleCancel = () => {
        if (contestIDStr === null) {
            navigate("/contests")
        } else {
            navigate(`/contest/${contestIDStr}`)
        }
    }

    return (
        <div className="bg-white flex w-3/5 h-full justify-start  flex-col gap-3 animate__slideInBottom">
            <label>
                <Header>测验标题</Header>
                <Input value={title} onChange={setTitle} className={`h-15`} />
            </label>
            <div className="flex gap-3">
                <label className="flex-1 flex flex-col">
                    <Header>公开状态</Header>
                    <Select selectedValue={pub} onChange={(str) => {
                        if (str === "true") { setPublic(true) } else { setPublic(false) }
                    }
                    } entries={[
                        ["私有", false],
                        ["公开", true],
                    ]} className="flex-1" />
                </label>
                <label className="flex-1">
                    <Header>开始时间</Header>
                    <div className="flex">
                        <Input type="date" value={startDate} onChange={setStartDate} />
                        <Input type="time" value={startTime} onChange={setStartTime} />
                    </div>
                </label>
                <label className="flex-1">
                    <Header>结束时间</Header>
                    <div className="flex ">
                        <Input type="date" value={endDate} onChange={setEndDate} />
                        <Input type="time" value={endTime} onChange={setEndTime} />
                    </div>
                </label>
                <label className="flex-1 flex flex-col">
                    <Header>计分方式</Header>
                    <Select entries={[
                        ["ACM", "ACM"],
                        ["IOI", "IOI"],
                    ]} selectedValue={type} onChange={setType} className="flex-1" />
                </label>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <Header>测验描述</Header>
                    <RichTextEditor value={desc} onChange={setDesc} />
                </div>
                <div>
                    <Header>题目列表</Header>
                    <div className="flex gap-4 w-full">
                        {selectProblems.map((problem, idx) => (
                            <div key={idx} className="flex gap-2 items-center text-lg">
                                <span>{idx + 1}.{problem.title}</span>
                                <button onClick={() => { handleRemoveProblem(idx); Toast("移除成功", "success") }} className="text-red-400 hover:text-red-500 ">移除</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button className="border p-1 text-lg bg-green-400 hover:bg-green-500 text-white rounded-lg" onClick={setShowSelectModal.bind(null, true)}>添加题目</button>
                    </div>
                    {showSelectModal && <ProblemSelectModal onAdd={handleSelectProblem} alreadyIn={selectProblems.map((item) => item.id)} onClose={setShowSelectModal.bind(null, false)} />}
                </div>
            </div>
            <div className="flex justify-center gap-2">
                <Button type="success" onClick={handleSubmit} >提交</Button>
                <Button onClick={handleCancel} >取消</Button>
                {contestIDStr !== null && <Button type="danger" onClick={handleRemove} >删除</Button>}
            </div>
        </div>
    )
}
export default ContestEdit;