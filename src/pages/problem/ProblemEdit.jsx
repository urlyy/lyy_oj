import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import RichTextEditor from "@/components/RichTextEditor";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import api from "./api";
import domainStore from "@/store/domain";
import { diff2text } from "@/utils/data2text";
import CodeEditor from "@/components/CodeEditor";
import Toy from "@/components/Toy";
import Alert from "@/utils/alert";
import Toast from "@/utils/toast";

const Header = ({ children }) => {
    return (
        <h2 className="text-2xl mb-2">{children}</h2>
    )
}

const specialTemplate = `def judge(lines)->bool:  
    for line in lines:
        pass
    return True`

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
    const [testCases, setTestCases] = useState([]);
    const [judgeType, setJudgeType] = useState(0);
    const [specialCode, setSpecialCode] = useState("");

    useEffect(() => {
        if (problemID !== null) {
            api.get(domainID, parseInt(problemID), true).then((res) => {
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
                    setTestCases(problem.testCases);
                    setJudgeType(problem.judgeType);
                    setSpecialCode(problem.specialCode);
                } else {
                    Alert(res.msg);
                }
            });
        }
    }, [problemID, domainID])
    const handleAddTestCase = () => {
        const data = {
            input: "",
            expect: "",
            isSample: false,
        }
        setTestCases(prev => [...prev, data]);
    }
    const handleTestCaseChange = (idx, type, newVal) => {
        if (type === "input" || type === "expect") {
            const data = [...testCases];
            data[idx][type] = newVal;
            setTestCases(data);
        } else {
            throw new Error("断言异常");
        }
    }
    const handleRemoveTestCase = (idx) => {
        setTestCases(prev => prev.filter((_, index) => idx !== index))
    }
    const handleSetSample = (idx, val) => {
        const data = [...testCases];
        data[idx].isSample = val;
        setTestCases(data);
    }
    const handleSubmit = async () => {
        if (title === "" || desc === "" || timeLimit === "" || memoryLimit === "" || inputFormat === "" || outputFormat === "") {
            Alert("题目信息不能为空");
            return;
        }
        const isNumber = (str) => {
            return typeof Number(str) === 'number' && !isNaN(Number(str));
        }
        if (!isNumber(timeLimit) || !isNumber(memoryLimit)) {
            Alert("时空限制必须是数字");
            return;
        }
        if (parseInt(memoryLimit) > 256) {
            Alert("内存限制必须不大于256MB");
            return;
        }
        const res = await api.add(domainID, {
            problemID: problemID ? parseInt(problemID) : problemID,
            title,
            desc,
            memoryLimit: parseInt(memoryLimit),
            timeLimit: parseInt(timeLimit),
            diff: diff,
            inputFormat,
            outputFormat,
            pub: pub,
            other,
            testCases,
            judgeType,
            specialCode,
        });
        if (res.success) {
            navigate("/problems");
            Toast("保存题目成功", "success");
        } else {
            Alert(res.msg);
        }
    }

    const handleRemove = async () => {
        Alert("确定删除本题目吗?", <></>, async () => {
            const res = await api.remove(domainID, problemID);
            if (res.success) {
                Toast("删除成功", "success");
                navigate("/problems")
            }
        }, true)
    }

    const handleChangeJudgeType = (type) => {
        if (type === 0) {
            Alert("操作提示", <>切换为普通判题将删除原先的special判题代码,<br />确定切换吗?</>, async () => {
                setJudgeType(0);
                setSpecialCode("");
            }, true)
        } else if (type === 1) {
            setSpecialCode(specialTemplate);
            setJudgeType(1);
        }
    }

    return (
        <>
            <Toy />
            <div className="bg-white flex w-3/5 h-full justify-start  flex-col gap-3 animate__slideInBottom">
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
                        ]} onChange={(str) => setDiff(parseInt(str))} className="flex-1" />
                    </label>
                    <label className="flex-1 flex flex-col">
                        <Header>公开状态</Header>
                        <Select selectedValue={pub} entries={[
                            ["私有", false],
                            ["公开", true],
                        ]} onChange={
                            (str) => { if (str === "true") { setPublic(true) } else { setPublic(false) } }
                        } className="flex-1" />
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
                        <Header>测试用例
                            {judgeType === 0 && <Button type="primary" onClick={handleChangeJudgeType.bind(null, 1)}>改为special judge</Button>}
                            {judgeType === 1 && <Button type="primary" onClick={handleChangeJudgeType.bind(null, 0)}>改为普通judge</Button>}
                        </Header>
                        {judgeType === 1 &&
                            <>
                                <Header>Special 判题代码(Python)</Header>
                                <CodeEditor placeholder={specialTemplate} readonly={false} code={specialCode} onChange={setSpecialCode} />
                            </>
                        }
                        {testCases.map((testCase, idx) => (
                            <div className="mt-5" key={idx}>
                                <div className="flex gap-4 w-full ">
                                    <label className="flex-1">
                                        <div>
                                            <span className="text-lg">Input#{idx + 1}</span>
                                            {testCase.isSample === true && <span className="bg-green-400 text-white p-1 rounded-sm">样例</span>}
                                        </div>
                                        <Textarea scroll={false} onChange={(val) => handleTestCaseChange(idx, "input", val)} value={testCase.input} />
                                    </label>
                                    {judgeType !== 1 && <label className="flex-1">
                                        <div>
                                            <span className="text-lg">Output#{idx + 1}</span>
                                            {testCase.isSample === true && <span className="bg-green-400 text-white p-1 rounded-sm">样例</span>}
                                        </div>
                                        <Textarea scroll={false} onChange={(val) => handleTestCaseChange(idx, "expect", val)} value={testCase.expect} />
                                    </label>}
                                    <div className="flex p-1 gap-2">
                                        {testCase.isSample ?
                                            <Button className="h-full" onClick={handleSetSample.bind(null, idx, false)}>撤下样例</Button>
                                            :
                                            <Button className="h-full" onClick={handleSetSample.bind(null, idx, true)}>设为样例</Button>
                                        }
                                        <Button type="danger" className="h-full" onClick={handleRemoveTestCase.bind(null, idx)}>移除</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div>
                            <Button onClick={handleAddTestCase} type="success">添加样例数据</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Header>其他</Header>
                    <RichTextEditor value={other} onChange={setOther} />
                </div>
                <div className="flex justify-center gap-2">
                    <Button onClick={handleSubmit} type="success">提交</Button>
                    <Button onClick={() => navigate("/problems")}>取消</Button>
                    {problemID !== null && <Button onClick={handleRemove} type="danger">删除</Button>}
                </div>
            </div >
        </>

    )
}
export default ProblemEdit;