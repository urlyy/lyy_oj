import CodeEditor from "@/components/CodeEditor";
import Select from "@/components/Select";
import { useState, useEffect, useRef } from "react";
import api from "./api";
import copy from 'copy-to-clipboard';
import domainStore from "@/store/domain";
import { useParams, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2'
import Toast from '../../utils/toast'

import RichTextEditor from "@/components/RichTextEditor";
import { diff2text, status2text, timeLimit2text } from "@/utils/data2text";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import Toy from "@/components/Toy";
import Alert from "@/utils/alert";
import { havePermission, 修改题目 } from "@/utils/permission";

const Header = ({ children }) => {
    return (
        <h2 className="text-2xl mb-2">{children}</h2>
    )
}

const CopyTextarea = ({ value }) => {
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.style.overflow = 'hidden';
        }
    }, [value])
    return (
        <div className="relative w-full">
            <textarea ref={textareaRef} rows={1} className="w-full resize-none p-1 bg-white border" disabled={true} value={value} />
            <button onClick={() => { copy(value); Toast("复制成功", "success") }} className="absolute right-0 top-0 border bg-slate-100 hover:bg-slate-200">复制</button>
        </div>
    )
}
const Tag = ({ children, type = "primary" }) => {
    const getColor = () => {
        if (type === "primary") {
            return "bg-blue-400 ";
        } else if (type === "danger") {
            return "bg-red-400";
        }
    }
    return (
        <div className={`${getColor()}   p-1  text-white border rounded-md text-sm`}>{children}</div>
    )
}

const ProblemDetail = ({ onExpand, expand, situationID, situationType, onValidChange, valid }) => {
    const [title, setTitle] = useState("标题");
    const [timeLimit, setTimeLimit] = useState(null);
    const [memoryLimit, setMemoryLimit] = useState(null);
    const [desc, setDesc] = useState(null);
    const [diff, setDiff] = useState(null);
    const [inputFormat, setInputFormat] = useState(null);
    const [outputFormat, setOutputFormat] = useState(null);
    const [other, setOther] = useState(null);
    const [testCases, setTestCases] = useState([]);
    const navigate = useNavigate();
    const { id: domainID, permission } = domainStore();
    const { problemID } = useParams();
    // 注意要是字符0
    const [judgeType, setJudgeType] = useState("0");

    useEffect(() => {
        api.get(domainID, problemID, false).then(res => {
            if (res.success) {
                const problem = res.data.problem;
                setDesc(problem.desc);
                setTitle(problem.title);
                setTimeLimit(problem.timeLimit);
                setMemoryLimit(problem.memoryLimit);
                setDiff(problem.diff);
                setTestCases(problem.testCases);
                setInputFormat(problem.inputFormat);
                setOutputFormat(problem.outputFormat);
                setJudgeType(problem.judgeType);
                setOther(problem.other);
                onValidChange(problem.valid);
            }
        })
    }, [])


    const handleBack = () => {
        if (situationType === "contest" || situationType === "homework") {
            navigate(`/${situationType}/${situationID}`)
        } else {
            navigate("/problems")
        }
    }

    return (
        <div className="w-full h-full flex flex-col pl-5 pr-5 relative">
            <div className="absolute left-1 top-1 z-30">
                <button className="hover:text-blue-400" onClick={handleBack} >
                    返回
                </button>
                {havePermission(permission, 修改题目) && <button className="ml-3 hover:text-blue-400" onClick={() => { navigate(`/problem/edit/${problemID}`) }} >
                    编辑
                </button>}
            </div>
            <button onClick={onExpand} className="absolute right-1 top-1 z-30 hover:text-blue-400">
                {expand === true ? "收起" : "打开在线编程模式"}
            </button>
            <h1 className="text-center text-3xl">{title}</h1>
            <div className="flex gap-2">
                <Tag>ID:{problemID}</Tag>
                <Tag>时间限制:{timeLimit2text(timeLimit)}</Tag>
                <Tag>内存限制:{memoryLimit}mb</Tag>
                {diff !== 0 && <Tag>{diff2text(diff)}</Tag>}
                {judgeType === 1 && <Tag type="danger">Special</Tag>}
                {!valid && <Tag type="danger">无测试数据</Tag>}
            </div>
            <div className="flex flex-col gap-6 flex-1">
                <div>
                    <Header>题目描述</Header>
                    {desc && <RichTextEditor readonly={true} value={desc} />}
                </div>
                <div>
                    <Header>输入格式</Header>
                    {inputFormat && <RichTextEditor readonly={true} value={inputFormat} />}
                </div>
                <div>
                    <Header>输出格式</Header>
                    {outputFormat && <RichTextEditor readonly={true} value={outputFormat} />}
                </div>
                {testCases.length > 0 &&
                    <div>
                        <Header>测试用例</Header>
                        {testCases.map((c, idx) => (
                            <div key={idx} className="flex gap-2">
                                <div className="w-1/2" >
                                    <div className="text-lg">Input#{idx + 1}</div>
                                    <CopyTextarea value={c.input} />
                                </div>
                                <div className="w-1/2">
                                    <div className="text-lg">Output#{idx + 1}</div>
                                    <CopyTextarea value={c.expect} />
                                </div>
                            </div>
                        ))}
                    </div>}
                <div className="mt-auto mb-3">
                    <h2 className="text-2xl mb-2">其他</h2>
                    {other && <RichTextEditor readonly={true} value={other} />}
                </div>
            </div>
        </div>
    )
}

const EditorArea = ({ problemID, situationID, situationType, endTime, valid }) => {
    const [code, setCode] = useState(`#include<stdio.h>\nint main(){\nprintf("2");\n}`);
    const [lang, setLang] = useState(null);
    const [langs, setLangs] = useState([]);
    const [testInput, setTestInput] = useState("");
    const [testOutput, setTestOutput] = useState("");
    const [expected, setExpected] = useState("");
    const [allowSubmit, setAllowSubmit] = useState(true);

    const { id: domainID } = domainStore();
    useEffect(() => {
        api.getCompilers().then(res => {
            if (res.success) {
                setLangs(res.data.compilers);
            }
        })
    }, [])

    const computeExpectColor = () => {
        if (testOutput === "") {
            return "bg-white"
        }
        if (expected.trimEnd() === testOutput.trimEnd()) {
            return "bg-green-100";
        }
        return "bg-red-100";
    }
    const handleJudge = async () => {
        if (code === "" || lang === null) {
            Alert("代码、编译器不能为空");
            return;
        }
        if (endTime && new Date(endTime) < new Date()) {
            Alert("已结束,无法提交");
            return;
        }
        Alert("提交成功");
        setAllowSubmit(false);
        const res = await api.submitJudge(domainID, problemID, lang, code, situationType, parseInt(situationID));
        if (res.success) {
            const result = res.data.result;
            const type = result.status === 0 ? "success" : "error";
            Toast(status2text(result.status, result.passPercent), type);
        }
    }
    const handleTest = async () => {
        if (code === "" || testInput === "" || lang === null) {
            Alert("代码、测试输入、编译器不能为空");
            return;
        }
        setAllowSubmit(false);
        const res = await api.submitTest(domainID, problemID, code, lang, testInput);
        if (res.success) {
            const result = res.data.result;
            if (result.status === 0) {
                Toast("获取测试输出成功", "success");
                setTestOutput(result.output);
            } else {
                const txt = status2text(result.status, result.passPercent);
                Toast(txt, "error", false);
                setTestOutput(txt);

            }
        }
    }

    useEffect(() => {
        if (allowSubmit === false) {
            setTimeout(() => {
                setAllowSubmit(true);
            }, 3000)
        }
    }, [allowSubmit])

    return (
        <>
            <div className="w-full h-3/4">
                <div className="w-full h-full flex flex-col">
                    <div className="flex gap-4 p-1 border bg-white items-center">
                        <label className="flex items-center">
                            选择语言
                            <div>
                                <Select entries={langs.map(la => [la[0], la[1]])} onChange={setLang} selectedValue={lang} className={`w-24 ml-1`}></Select>
                            </div>
                        </label>
                        {valid ? <>
                            <Button disabled={!allowSubmit} type="primary" onClick={handleTest}>自测</Button>
                            <Button disabled={!allowSubmit} type="success" onClick={handleJudge}>提交</Button>
                            {!allowSubmit && <div className="text-blue-400">正在限制频繁提交中</div>}
                        </> :
                            <Button type="danger">无法提交</Button>
                        }
                    </div>
                    <div className="flex-1">
                        <CodeEditor code={code} readonly={false} onChange={setCode} />
                    </div>
                </div>
            </div>
            <div className="w-full h-1/4 flex ">
                <div className="w-full h-full flex border-l border-r border-t">
                    <label className="flex-1 flex flex-col">
                        <div className="border-l border-r p-1 flex justify-between">测试输入</div>
                        <Textarea placeholder={"输入"} value={testInput} onChange={setTestInput} className="flex-1" />
                    </label>
                    <label className="flex-1 flex flex-col">
                        <div className="border-l border-r p-1">期望输出</div>
                        <Textarea placeholder={"期望输出"} value={expected} onChange={setExpected} className="flex-1" />
                    </label>
                    <label className={`flex-1 flex flex-col ${computeExpectColor()}`}>
                        <div className="border-l border-r p-1">实际输出</div>
                        <Textarea disabled={true} placeholder={"点击自测后查看输出"} value={testOutput} className="flex-1" />
                    </label>
                </div>
            </div>
        </>
    )
}
const Problem = () => {
    const { problemID, type: situationType = "problem", id: situationID = 0 } = useParams();
    const [expand, setExpand] = useState(false);
    const [valid, setValid] = useState(false);

    return (
        <>
            <Toy />
            <div className="bg-white flex w-full h-full gap-1 pl-1 pr-1 justify-center animate__slideInBottom">
                <div className={`${expand ? "w-1/2" : "w-2/5"} h-full  border border-slate-200 rounded-md shadow-md`}>
                    <ProblemDetail valid={valid} onValidChange={setValid} situationID={situationID} situationType={situationType} expand={expand} onExpand={() => { setExpand(prev => !prev) }} />
                </div>
                <div className={`${expand ? "block" : "hidden"} w-1/2 h-full border-slate-200  border rounded-md shadow-md`}>
                    <EditorArea valid={valid} problemID={problemID} situationID={situationID} situationType={situationType} />
                </div>
            </div>

        </>

    )
}
export default Problem;