import Input from "@/components/Input";
import Select from "@/components/Select";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProblemEdit = () => {
    const [title, setTitle] = useState("");
    const { problemID } = useParams();
    const isNew = () => {
        return problemID === undefined;
    }
    useEffect(() => {
        if (!isNew()) {
            const data = {
                id: 10,
                title: '一个题目',
                description: "哈哈哈哈哈哈哈",
                inputFormat: '这个是输入格式',
                outputFormat: '这个是输出格式',
                samples: [
                    { input: "1 2 \n3 4\n5 6", output: '3\n7' },
                    { input: "1 2 3 4", output: '3\n7\n11' },

                ],
                other: '这是放额外文本的地方',
            }
            setTitle(data.title);
        }
    }, [])

    return (
        <div className="flex w-4/5 h-full justify-center">
            <div>
                <label>
                    <div>标题</div>
                    <Input />
                </label>
                <label>
                    <div>标签</div>
                    <Input />
                </label>
                <label>
                    <div>难度</div>
                    <Select />
                </label>
            </div>
            <div>
                <label>
                    <h2>题目描述</h2>
                    <Input />
                </label>
                <label>
                    <h2>输入格式</h2>
                    <Input />
                </label>
                <label>
                    <h2>输出格式</h2>
                    <Input />
                </label>
                <label>
                    <h2>其他</h2>
                    <Input />
                </label>
            </div>
            <div>
                <label>
                    <h2>测试用例</h2>
                    <Input />
                </label>
            </div>

        </div>
    )
}
export default ProblemEdit;