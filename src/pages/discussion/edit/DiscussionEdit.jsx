import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import RichTextEditor from "@/components/RichTextEditor";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
import api from "../api";

const Header = ({ children }) => {
    return (
        <h2 className="text-2xl mb-2">{children}</h2>
    )
}

const DiscussionEdit = () => {
    const navigate = useNavigate();
    const { id: domainID } = domainStore();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { discussionID = null } = useParams();
    const [samples, setSamples] = useState([]);

    useEffect(() => {
        if (discussionID !== null) {
            api.getDiscussion(domainID, discussionID).then(res => {
                if (res.success) {
                    const d = res.data.discussion;
                    setTitle(d.title);
                    setContent(d.content);
                }
            });
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
        if (title === "" || content === "") {
            alert("不能为空");
            return;
        }
        const res = await api.submit(domainID, { title, content, discussionID });
        if (res.success) {
            navigate("/discussions");
        }
    }

    return (
        <div className="flex w-3/5 h-full justify-start  flex-col gap-3">
            <label>
                <Header>讨论话题</Header>
                <Input value={title} onChange={setTitle} className={`h-15`} />
            </label>
            <div className="flex flex-col gap-3">
                <div>
                    <Header>话题描述</Header>
                    <RichTextEditor value={content} onChange={setContent} />
                </div>
            </div>
            <div className="flex justify-center gap-2">
                <button onClick={handleSubmit} className="text-lg border rounded-md p-1 text-white hover:bg-green-500 bg-green-400">提交</button>
                <button onClick={() => navigate("/contest")} className="text-lg border rounded-md p-1 hover:bg-slate-100">取消</button>
            </div>
        </div>
    )
}
export default DiscussionEdit;