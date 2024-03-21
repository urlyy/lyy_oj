import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import RichTextEditor from "@/components/RichTextEditor";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import domainStore from "@/store/domain";


const Header = ({ children }) => {
    return (
        <h2 className="text-2xl mb-2">{children}</h2>
    )
}

const ContestEdit = () => {
    const { id: domainID } = domainStore();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [pub, setPublic] = useState(false);
    const [type, setType] = useState("OI");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [participants, setParticipants] = useState([]);

    const { problemID = null } = useParams();

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        if (problemID !== null) {

        }
    }, [])
    const handleAddSample = () => {
        const data = {
            input: "",
            output: "",
        }
        setSamples(prev => [...prev, data]);
    }
    const handleSampleChange = (idx, type, newVal) => {
        console.log(idx, type, newVal)
        if (type === "input" || type === "output") {
            const data = [...samples];
            data[idx][type] = newVal;
            setSamples(data);
        } else {
            throw new Error("断言异常");
        }
    }

    const handleSubmit = async () => {
        if (title === "" || desc === "" || startDate === "" || startTime === "" || endDate === "" || endTime === "") {
            alert("不能为空");
            return;
        }
        if (endDate < startDate) {
            alert("结束时间不能早于开始时间");
            return;
        }
        if (endDate === startDate && endTime <= startDate) {
            alert("结束时间不能早于开始时间");
            return;
        }
        const start = startDate + " " + startTime;
        const end = endDate + " " + endTime;
        const res = await api.submit(domainID, {
            title, desc, pub: pub === "true" ? true : false,
            start, end, problemID, participants, type,
        });
        if (res.success) {
            navigate("/homeworks");
        } else {
            alert(res.msg)
        }
    }

    return (
        <div className="flex w-3/5 h-full justify-start  flex-col gap-3 animate__slideInBottom">
            <label>
                <Header>测验标题</Header>
                <Input value={title} onChange={setTitle} className={`h-15`} />
            </label>
            <div className="flex gap-3">
                <label className="flex-1 flex flex-col">
                    <Header>公开状态</Header>
                    <Select selectedValue={pub} onChange={setPublic} entries={[
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
                        ["OI", "OI"],
                        ["ACM", "ACM"],
                    ]} selectedValue={type} onChange={setType} className="flex-1" />
                </label>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <Header>测验描述</Header>
                    <RichTextEditor value={desc} onChange={setDesc} />
                </div>
                {problemID !== null && <div className="flex flex-col">
                    <Header>题目列表</Header>
                    {samples.map((sample, idx) => (
                        <div key={idx}>
                            <div className="flex gap-4 w-full">
                                <label className="flex-1">
                                    <div className="text-lg">Input#{idx + 1}</div>
                                    <Textarea onChange={(val) => handleSampleChange(idx, "input", val)} value={sample.input} />
                                </label>
                                <label className="flex-1">
                                    <div className="text-lg">Output#{idx + 1}</div>
                                    <Textarea onChange={(val) => handleSampleChange(idx, "output", val)} value={sample.output} />
                                </label>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button className="border p-2 text-lg bg-green-400 hover:bg-green-500 text-white rounded-lg" onClick={handleAddSample}>添加题目</button>
                    </div>
                </div>}
                {problemID !== null && <div className="flex flex-col">
                    <Header>参赛人员</Header>
                    {/* {samples.map((sample, idx) => (
                        <div key={idx}>
                            <div className="flex gap-4 w-full">
                                <label className="flex-1">
                                    <div className="text-lg">Input#{idx + 1}</div>
                                    <Textarea onChange={(val) => handleSampleChange(idx, "input", val)} value={sample.input} />
                                </label>
                                <label className="flex-1">
                                    <div className="text-lg">Output#{idx + 1}</div>
                                    <Textarea onChange={(val) => handleSampleChange(idx, "output", val)} value={sample.output} />
                                </label>
                            </div>
                        </div>
                    ))} */}
                    <div>
                        <button className="border p-2 text-lg bg-green-400 hover:bg-green-500 text-white rounded-lg" onClick={handleAddSample}>添加参赛人员</button>
                    </div>
                </div>}
            </div>
            <div className="flex justify-center gap-2">
                <button onClick={handleSubmit} className="text-lg border rounded-md p-1 text-white hover:bg-green-500 bg-green-400">提交</button>
                <button onClick={() => navigate("/contest")} className="text-lg border rounded-md p-1 hover:bg-slate-100">取消</button>
            </div>
        </div>
    )
}
export default ContestEdit;