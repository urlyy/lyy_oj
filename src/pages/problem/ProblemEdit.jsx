import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import RichTextEditor from "@/components/RichTextEditor";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import api from "./api";
import domainStore from "@/store/domain";
import { diff2text } from "@/utils/data2text";

const Header = ({ children }) => {
    return (
        <h2 className="text-2xl mb-2">{children}</h2>
    )
}

const ProblemEdit = () => {
    const navigate = useNavigate();
    const { id: domainID } = domainStore();
    const { problemID = null } = useParams();
    const [title, setTitle] = useState("");
    const [diff, setDiff] = useState(0);
    const [pub, setPublic] = useState(false);
    const [timeLimit, setTimeLimit] = useState("1000");
    const [memoryLimit, setMemoryLimit] = useState("128");
    const [desc, setDesc] = useState("");
    const [inputFormat, setInputFormat] = useState("");
    const [outputFormat, setOutputFormat] = useState("");
    const [other, setOther] = useState("");
    const [samples, setSamples] = useState([]);

    useEffect(() => {
        if (problemID !== null) {
            api.get(domainID, parseInt(problemID)).then((res) => {
                if (res.success) {
                    const problem = res.data.problem;
                    setTitle(problem.title);
                    setDesc(problem.desc);
                    setDiff(problem.diff);
                    setPublic(problem.pub);
                    setMemoryLimit(problem.memoryLimit);
                    setTimeLimit(problem.timeLimit);
                    setInputFormat(problem.inputFormat);
                    setOutputFormat(problem.outputFormat);
                    setOther(problem.other);
                    // setSamples(problem.samples);
                } else {
                    alert(res.msg);
                }
            });
        }

        //         samples: [
        //             { input: "1 2 \n3 4\n5 6", output: '3\n7' },
        //             { input: "1 2 3 4", output: '3\n7\n11' },

        //         ],

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
        if (title === "" || desc === "" || timeLimit === "" || memoryLimit === "" || inputFormat === "" || outputFormat === "") {
            alert("不能为空");
            return;
        }
        const isNumber = (str) => {
            return typeof Number(str) === 'number' && !isNaN(Number(str));
        }
        if (!isNumber(timeLimit) || !isNumber(memoryLimit)) {
            alert("时空限制必须是数字");
            return;
        }
        const res = await api.add(domainID, {
            problemID: problemID ? parseInt(problemID) : problemID,
            title,
            desc,
            memoryLimit: parseInt(memoryLimit),
            timeLimit: parseInt(timeLimit),
            diff: parseInt(diff),
            inputFormat,
            outputFormat,
            pub: pub === "true" ? true : false,
            other,
        });
        if (res.success) {
            navigate("/problems");
        } else {
            alert(res.msg);
        }
    }
    const handleRemove = async () => {
        const res = await api.remove(domainID, problemID);
        if (res.success) {
            navigate("/problems")
        }
    }

    return (
        <div className="flex w-3/5 h-full justify-start  flex-col gap-3 animate__slideInBottom">
            <label>
                <Header>标题</Header>
                <Input value={title} onChange={setTitle} className={`h-15`} />
            </label>
            {/* <label>
                <Header>标签</Header>
                <Input />
            </label> */}
            <div className="flex gap-3">
                <label className="flex-1 flex flex-col">
                    <Header>难度</Header>
                    <Select selectedValue={diff} entries={[
                        ["暂不设置", 0],
                        [diff2text(1), 1],
                        [diff2text(2), 2],
                        [diff2text(3), 3],
                    ]} onChange={setDiff} className="flex-1" />
                </label>
                <label className="flex-1 flex flex-col">
                    <Header>公开状态</Header>
                    <Select selectedValue={pub} entries={[
                        ["私有", false],
                        ["公开", true],
                    ]} onChange={setPublic} className="flex-1" />
                </label>
                <label className="flex-1">
                    <Header>时间限制(MS)</Header>
                    <Input value={timeLimit} onChange={setTimeLimit} />
                </label>
                <label className="flex-1">
                    <Header>内存限制(MB)</Header>
                    <Input value={memoryLimit} onChange={setMemoryLimit} />
                </label>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <Header>题目描述</Header>
                    <RichTextEditor onChange={setDesc} value={desc} />
                </div>
                <div>
                    <Header>输入格式</Header>
                    <RichTextEditor onChange={setInputFormat} value={inputFormat} />
                </div>
                <div>
                    <Header>输出格式</Header>
                    <RichTextEditor onChange={setOutputFormat} value={outputFormat} />
                </div>
                <div className="flex flex-col">
                    <Header>测试用例</Header>
                    {problemID !== null && samples.map((sample, idx) => (
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
                        <button className="border p-2 text-lg bg-green-400 hover:bg-green-500 text-white rounded-lg" onClick={handleAddSample}>添加样例数据</button>
                    </div>
                </div>
            </div>
            <div>
                <Header>其他</Header>
                <RichTextEditor value={other} onChange={setOther} />
            </div>
            <div className="flex justify-center gap-2">
                <button onClick={handleSubmit} className="text-lg border rounded-md p-1 text-white hover:bg-green-500 bg-green-400">提交</button>
                <button onClick={() => navigate("/problems")} className="text-lg border rounded-md p-1 hover:bg-slate-100">取消</button>
                {problemID !== null && <button onClick={handleRemove} className="text-lg border rounded-md p-1 hover:bg-red-500 bg-red-400 text-white">删除</button>}
            </div>
        </div>
    )
}
export default ProblemEdit;