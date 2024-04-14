import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import RichTextEditor from "@/components/RichTextEditor";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./api";
import domainStore from "@/store/domain";
import { str2date, str2time } from "@/utils/data2text";
import Modal from "@/components/Modal";
import ProblemTable from "@/components/ProblemTable";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import Alert from "@/utils/alert";
import Toast from "@/utils/toast";
import Button from "@/components/Button";
import ProblemSelectModal from "@/components/ProblemSelectModal";

const Header = ({ children }) => {
    return (
        <h2 className="text-2xl mb-2">{children}</h2>
    )
}

const HomeworkEdit = () => {
    const navigate = useNavigate();
    const { id: domainID } = domainStore();
    const [title, setTitle] = useState("");
    const { homeworkID: homeworkIDStr = null } = useParams();
    const [pub, setPublic] = useState(false);
    const [desc, setDesc] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectProblems, setSelectProblems] = useState([]);
    const [showSelectModal, setShowSelectModal] = useState(false);

    useEffect(() => {
        if (homeworkIDStr !== null) {
            api.get(domainID, homeworkIDStr).then(res => {
                if (res.success) {
                    const homework = res.data.homework;
                    setTitle(homework.title);
                    setDesc(homework.desc);
                    setPublic(homework.public);
                    setStartDate(str2date(homework.startTime));
                    setStartTime(str2time(homework.startTime));
                    setEndDate(str2date(homework.endTime));
                    setEndTime(str2time(homework.endTime));
                    setSelectProblems(Array.from({ length: homework.problemIDs.length }).fill({}));
                    homework.problemIDs.forEach(async (id, idx) => {
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


    const handleSelectProblem = (id, title) => {
        setSelectProblems(prev => [...prev, { id, title }]);
    }

    const handleSubmit = async () => {
        if (title === "" || desc === "" || startDate === "" || startTime === "" || endDate === "" || endTime === "") {
            Alert("作业信息不能为空");
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
            homeworkID: parseInt(homeworkIDStr),
            title, desc, pub,
            start, end, problemIDs: selectProblems.map(item => item.id)
        });
        if (res.success) {
            if (homeworkIDStr === null) {
                Toast("创建作业成功");
            } else {
                Toast("修改作业成功");
            }
            navigate("/homeworks");
        }
    }
    const handleRemoveProblem = (idx) => {
        setSelectProblems(prev => prev.filter((_, i) => i !== idx));
    }

    const handleRemove = async () => {
        Alert("确认删除这个作业吗?", <></>, async () => {
            const res = await api.remove(domainID, homeworkIDStr);
            if (res.success) {
                Toast("删除作业成功", "success");
                navigate("/homeworks")
            }
        }, true)
    }

    const handleCancel = () => {
        if (homeworkIDStr === null) {
            navigate("/homeworks")
        } else {
            navigate(`/homework/${homeworkIDStr}`)
        }
    }

    return (
        <div className="bg-white flex w-3/5 h-full justify-start  flex-col gap-3 animate__slideInBottom">
            <label>
                <Header>标题</Header>
                <Input value={title} onChange={setTitle} className={`h-15`} />
            </label>
            <div className="flex gap-3">
                <label className="flex-1 flex flex-col">
                    <Header>公开状态</Header>
                    <Select selectedValue={pub} onChange={
                        (str) => { if (str === "true") { setPublic(true) } else { setPublic(false) } }
                    } entries={[
                        ["私有", false],
                        ["公开", true]
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
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <Header>作业描述</Header>
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
                <Button onClick={handleCancel} className="text-lg border rounded-md p-1 hover:bg-slate-100">取消</Button>
                {homeworkIDStr !== null && <Button onClick={handleRemove} type="danger">删除</Button>}
            </div>
        </div>
    )
}
export default HomeworkEdit;