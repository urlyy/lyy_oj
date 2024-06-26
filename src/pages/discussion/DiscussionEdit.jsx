import Input from "@/components/Input";
// import Select from "@/components/Select";
// import Textarea from "@/components/Textarea";
import RichTextEditor from "@/components/RichTextEditor";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
import api from "./api";
import Alert from "@/utils/alert";
import Button from "@/components/Button";

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

    const handleSubmit = async () => {
        if (title === "" || content === "") {
            Alert("不能为空");
            return;
        }
        const res = await api.submit(domainID, { title, content, discussionID });
        if (res.success) {
            navigate("/discussions");
        }
    }

    return (
        <div className="bg-white flex w-3/5 h-full justify-start flex-col gap-3 animate__slideInBottom">
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
                <Button onClick={handleSubmit} type="success">提交</Button>
                <Button onClick={() => navigate("/discussions")} >取消</Button>
            </div>
        </div>
    )
}
export default DiscussionEdit;