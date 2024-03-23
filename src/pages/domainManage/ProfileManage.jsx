import Card from "@/components/Card";
import Input from "@/components/Input";
import RichTextEditor from "@/components/RichTextEditor";
import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
import api from "./api";
const DomainProfileManage = () => {
    const { id, name, announce } = domainStore();
    const setDomain = domainStore(state => state.set)
    const [tmpName, setTmpName] = useState(name);
    const [tmpAnnounce, setTmpAnnounce] = useState(announce);
    useEffect(() => {
        api.getProfile(id).then(res => {
            if (res.success) {
                const d = res.data.domain;
                setDomain(d);
                setTmpName(d.name);
                setTmpAnnounce(d.announce);
            }
        })
    }, [])
    const handleReset = () => {
        setTmpName(name);
        setTmpAnnounce(announce);
    }
    const handleSubmit = async () => {
        if (tmpName === "") {
            alert("域名不能为空");
            return;
        }
        const res = await api.changeProfile(id, tmpName, tmpAnnounce);
        if (res.success) {
            setDomain({ id: id, name: tmpName, announce: tmpAnnounce });
            alert("修改成功");
        }
    }
    return (
        <Card className="animate__slideInBottom">
            <div className="flex flex-col gap-4">
                <div>
                    <div className="text-lg">域名称修改</div>
                    <Input className={"h-11 text-lg"} value={tmpName} onChange={setTmpName} />
                </div>
                <div>
                    <div className="text-lg">域首页公告修改</div>
                    <RichTextEditor value={tmpAnnounce} onChange={setTmpAnnounce} />
                </div>
                <div className="flex justify-center">
                    <button onClick={handleReset} className="border border-slate-200 p-2  hover:bg-slate-100 rounded-sm">重置</button>
                    <button onClick={handleSubmit} className="border border-slate-200 p-2  hover:bg-slate-100 rounded-sm">提交所有修改</button>
                </div>
            </div>
        </Card>
    )
}
export default DomainProfileManage;