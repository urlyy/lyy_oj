import CodeEditor from "@/components/CodeEditor";
import Select from "@/components/Select";
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom'
import api from "./api";
import copy from 'copy-to-clipboard';
import domainStore from "@/store/domain";
// import Swal from 'sweetalert2'
import toast from '../../components/Toast'
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import RichTextEditor from "@/components/RichTextEditor";
import { diff2text, memoryLimit2text, timeLimit2text } from "@/utils/data2text";




const EditorArea = ({ problemID, onSubmit }) => {
    const [code, setCode] = useState("#include<iostream>\nusing namespace std;");
    const [lang, setLang] = useState(0);
    const handleTest = () => {

    }
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex gap-4 p-1 border bg-white items-center">
                <label>选择语言<Select className={`w-24 ml-1`}></Select></label>
                <button className="w-20 bg-blue-400 text-white border rounded-md p-1 hover:bg-blue-500" onClick={onSubmit}>自测</button>
                <button className="w-20 bg-green-500 text-white border rounded-md p-1 hover:bg-green-600" onClick={handleTest}>提交</button>
            </div>
            <div className="flex-1">
                <CodeEditor code={code} readonly={true} onChange={setCode} />
            </div>
        </div>
    )
}



const Header = ({ children }) => {
    return (
        <h2 className="text-2xl mb-2">{children}</h2>
    )
}

const ProblemDetail = ({ onExpand, expand }) => {
    const [problem, setProblem] = useState({ title: "标题" });
    const navigate = useNavigate();
    const { id: domainID } = domainStore();
    const { problemID } = useParams();
    useEffect(() => {
        api.getProblem(domainID, problemID).then(res => {
            if (res.success) {
                const problem = res.data.problem;
                setProblem(problem);
            }
        })
        // const data = {
        //     id: 10,
        //     title: '一个题目',
        //     description: "哈哈哈哈哈哈哈",
        //     inputFormat: '这个是输入格式',
        //     outputFormat: '这个是输出格式',
        //     samples: [
        //         { input: "1 2 \n3 4\n5 6", output: '3\n7' },
        //         { input: "1 2 3 4", output: '3\n7\n11' },

        //     ],
        //     other: '这是放额外文本的地方',
        // }
        // setProblem(data);
    }, [])
    const Textarea = ({ value }) => {
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
                <button onClick={() => { copy(value); toast("success", "复制成功") }} className="absolute right-0 top-0 border bg-slate-100 hover:bg-slate-200">复制</button>
            </div>
        )
    }
    const Tag = ({ children }) => {
        return (
            <div className="p-1 bg-blue-400  text-white border rounded-md text-sm">{children}</div>
        )
    }
    return (
        <div className="w-full h-full flex flex-col pl-5 pr-5 relative">
            <button onClick={() => { navigate(`/problem/edit/${problemID}`) }} className="absolute left-1 top-1 z-50">
                编辑
            </button>
            <button onClick={onExpand} className="absolute right-1 top-1 z-50">
                {expand === true ? "收起" : "打开在线编程模式"}
            </button>
            <h1 className="text-center text-3xl">{problem.title}</h1>
            <div className="flex gap-2">
                <Tag>ID:{problem.id}</Tag>
                <Tag>时间限制:{timeLimit2text(problem.timeLimit)}</Tag>
                <Tag>内存限制:{memoryLimit2text(problem.memoryLimit)}</Tag>
                <Tag>{diff2text(problem.diff)}</Tag>
            </div>
            <div className="flex flex-col gap-6 flex-1">
                <div>
                    <Header>题目描述</Header>
                    {problem && problem.desc && <RichTextEditor readonly={true} value={problem.desc} />}
                </div>
                <div>
                    <Header>输入格式</Header>
                    {problem && problem.inputFormat && <RichTextEditor readonly={true} value={problem.inputFormat} />}
                </div>
                <div>
                    <Header>输出格式</Header>
                    {problem && problem.outputFormat && <RichTextEditor readonly={true} value={problem.outputFormat} />}
                </div>
                <div>
                    <Header>测试用例</Header>
                    {problem.samples && problem.samples.map((sample, idx) => (
                        <div key={idx} className="flex gap-2">
                            <div className="w-1/2" >
                                <div className="text-lg">Input#{idx + 1}</div>
                                <Textarea value={sample.input} />
                            </div>
                            <div className="w-1/2">
                                <div className="text-lg">Output#{idx + 1}</div>
                                <Textarea value={sample.output} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-auto mb-3">
                    <h2 className="text-2xl  mb-2">其他</h2>
                    {problem && problem.other && <RichTextEditor readonly={true} value={problem.other} />}
                </div>
            </div>
        </div>
    )
}

const TestArea = () => {
    const [testInput, setTestInput] = useState("");
    const [expected, setExpected] = useState("");
    const [testOutput, setTestOutput] = useState("");
    const [OK, setOK] = useState(null);
    const computeExpectColor = () => {
        if (OK === true) {
            return "bg-green-100"
        } else if (OK === false) {
            return "bg-red-100"
        } else {
            return "bg-white"
        }
    }
    return (
        <div className="w-full h-full flex border-l border-r border-t">
            <label className="flex-1 flex flex-col">
                <div className="border-l border-r p-1 flex justify-between">测试输入</div>
                <textarea placeholder={"输入"} value={testInput} onChange={(e) => { setTestInput(e.target.value) }} className="outline-none bg-white flex-1 border p-1 resize-none" />
            </label>
            <label className="flex-1 flex flex-col">
                <div className="border-l border-r p-1">期望输出</div>
                <textarea placeholder={"期望输出"} value={expected} onChange={(e) => { setExpected(e.target.value) }} className="outline-none bg-white w-full h-full border p-1 flex-1 resize-none" />
            </label>
            <label className={`flex-1 flex flex-col ${computeExpectColor(OK)}`}>
                <div className="border-l border-r p-1">实际输出</div>
                <textarea disabled={true} placeholder={"点击自测后查看输出"} value={testOutput} className="disabled:bg-inherit outline-none  w-full h-full border p-1 flex-1 resize-none" />
            </label>
        </div>
    )
}

const Problem = () => {
    const { problemID } = useParams();
    const [expand, setExpand] = useState(false);

    return (
        <div className="flex w-full h-full gap-1 pl-1 pr-1 justify-center">
            <div className={`${expand ? "w-1/2" : "w-2/5"} h-full  border border-slate-200 rounded-md shadow-md`}>
                <ProblemDetail expand={expand} onExpand={() => { setExpand(prev => !prev) }} />
            </div>
            {expand && <div className="w-1/2 h-full border-slate-200  border rounded-md shadow-md">
                <div className="w-full h-3/4">
                    <EditorArea problemID={problemID} />
                </div>
                <div className="w-full h-1/4 flex ">
                    <TestArea />
                </div>
            </div>}
        </div>
    )
}
export default Problem;