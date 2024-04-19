import { calculate } from "@/utils/calculator";
import Input from "./Input";

import Button from "./Button";
import Draggable from 'react-draggable'
import { Network, parseDOTNetwork } from 'vis-network';
import { useRef, useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import copy from 'copy-to-clipboard';
import Toast from "@/utils/toast";

const NetworkGraph = ({ code, onCodeChange }) => {
    const containerRef = useRef(null);
    const networkRef = useRef(null);

    const [haveErr, setHaveErr] = useState(false);

    useEffect(() => {
        let parsedData;
        try {
            parsedData = parseDOTNetwork(code);
        } catch (error) {
            console.error(error);
            setHaveErr(true);
            return;
        }
        setHaveErr(false);
        const data = {
            nodes: parsedData.nodes,
            edges: parsedData.edges
        }
        const options = parsedData.options;
        options.interaction = { hover: true };

        networkRef.current = new Network(containerRef.current, data, options);

        return () => {
            if (networkRef.current) {
                networkRef.current.destroy();
            }
        };
    }, [code]);

    return (
        <div >
            <div className="border w-[600px] h-[300px]" ref={containerRef} ></div>
            <div className="bg-white">
                <div>使用DOT language构建图{haveErr && <span className="text-red-400">语法出现错误,见控制台</span>}</div>
                <CodeEditor className="text-base" readonly={false} code={code} onChange={onCodeChange} />
            </div>
        </div>
    );
};

const Calculator = ({ visible }) => {
    const [exp, setExp] = useState("");
    const [result, setResult] = useState("");
    const getResult = () => {
        const res = calculate(exp);
        if (res === null) {
            setResult("表达式错误");
        } else {
            setResult(res);
        }
    }
    return (
        <div className={`${visible ? "block" : "hidden"}`}>
            <div className="flex">
                <div className="h-5/6">
                    <Input placeholder="请输入表达式" className="h-5" value={exp} onChange={setExp}></Input>
                </div>
                <Button className="text-sm flex-1" onClick={getResult}>计算</Button>
            </div>
            <div className="">结果:{result}</div>
            {result !== "" && <button onClick={() => { copy(result); Toast("复制成功") }} >点击复制结果</button>}
        </div>
    )
}

const RandomGenerator = ({ visible }) => {
    const [leftBound, setLeftBound] = useState("");
    const [rightBound, setRightBound] = useState("");
    const [num, setNum] = useState(1);
    const [onlyInt, setOnlyInt] = useState(true);
    const [floatBit, setFloatBit] = useState(2);
    const [rdmList, setRdmList] = useState([]);

    const handelGenerate = () => {
        const min = parseFloat(leftBound);
        const max = parseFloat(rightBound);
        const res = [];
        for (let i = 0; i < parseInt(num); i++) {
            let tmp
            if (onlyInt) {
                tmp = Math.random() * (max - min + 1) + min;
                tmp = Math.floor(tmp);
            } else {
                tmp = Math.random() * (max - min) + min;
                tmp = tmp.toFixed(parseInt(floatBit));
            }
            res.push(tmp);
        }
        setRdmList(res);
    }

    const checkValid = () => {
        const left = parseFloat(leftBound);
        const right = parseFloat(rightBound);
        const numInt = parseInt(num);
        const floatBitInt = parseInt(floatBit);
        if (isNaN(left) || isNaN(right) || isNaN(numInt) || (!onlyInt && isNaN(floatBitInt))) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <div className={`${visible ? "block" : "hidden"}`}>
            <div className="items-center">
                <div className="flex items-center">
                    <span className="mr-1">取整数</span>
                    <input type="checkbox"
                        checked={onlyInt}
                        onChange={(e) => { setOnlyInt(e.target.checked) }}
                        className={`p-1 w-5 h-5 border rounded-sm `}
                    />
                </div>
                {!onlyInt && (
                    <div className="flex items-center">
                        <div >保留</div>
                        <Input className="w-20" type="number" value={floatBit} onChange={setFloatBit} />
                        <div>位小数</div>
                    </div>
                )}
            </div>
            <div>
                <span className="mr-1">个数</span><Input className="text-sm w-20" type="number" value={num} onChange={setNum} />
            </div>
            <div>
                <div>左闭区间</div><Input className="w-60 text-sm" value={leftBound} onChange={setLeftBound} type="number" />
                <div>右闭区间</div><Input className="w-60 text-sm" value={rightBound} onChange={setRightBound} type="number" />
            </div>
            <Button disabled={!checkValid()} type="primary" onClick={handelGenerate}>生成</Button>
            {rdmList.length > 0 && <div>
                <span>结果如下</span>
                <button className="ml-3" onClick={() => { copy(rdmList.join(" ")); Toast("复制成功") }} >复制</button>
                <div className="flex gap-2">
                    {rdmList.map((item, index) => <div key={index}>{item}</div>)}
                </div>
            </div>}
        </div>

    )
}

const Transform = ({ visible }) => {
    return (
        <div className={`bg-white  ${visible ? "block" : "hidden"}`}>
            <iframe src="https://www.matools.com/hex?embed" className="h-[350px] border-0" ></iframe>
        </div>
    )
}




const Toy = () => {
    const typeList = useRef(["计算器", "进制转换", "随机数", "网络图"]);
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState(typeList.current[0]);
    const [networkCode, setNetworkCode] = useState(`dinetwork {
    1 -> 1 -> 2->7;
    2 -> 3; 
    2 -- 4[label="4"]; 
    2 -> Q[label=weight]; 
}`)
    const [draggable, setDraggable] = useState(true);

    return (
        <Draggable disabled={!draggable} size={200} bounds="parent">
            <div className="z-50 fixed left-0 top-1/2">
                {visible ?
                    (
                        <div className="bg-slate-200">
                            <div className="flex items-center">
                                {typeList.current.map((t, idx) => (
                                    <button className={`${type === t ? "bg-blue-400 text-white" : "bg-white"} text-sm border p-1 `} key={idx} onClick={setType.bind(null, t)}>{t}</button>
                                ))}
                                <button className="text-sm border p-1 bg-white" onClick={() => { setDraggable(prev => !prev) }}>{draggable ? "固定" : "解除"}</button>
                                <button className="text-sm border p-1 bg-white" onClick={() => { setDraggable(true); setVisible(false) }}>收起</button>
                            </div>
                            <div className="border p-2">
                                <Calculator visible={type === "计算器"} />
                                <RandomGenerator visible={type === "随机数"} />
                                <Transform visible={type === "进制转换"} />
                                {type === "网络图" && <NetworkGraph code={networkCode} onCodeChange={setNetworkCode} />}
                            </div>
                        </div>
                    )
                    :
                    (<button onClick={setVisible.bind(null, true)} style={{ writingMode: "vertical-rl" }} className="text-xl text-white bg-blue-500 rounded-sm p-1">
                        工具箱
                    </button>)
                }
            </div>
        </Draggable>
    )
}

export default Toy;