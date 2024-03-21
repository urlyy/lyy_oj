import Card from "@/components/Card";
import Input from "@/components/Input";
import RichTextEditor from "@/components/RichTextEditor";
import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
const ProfileManage = () => {
    const { id, name } = domainStore();
    const [domainTitle, setDomainTitle] = useState(name);
    const [announce, setAnnounce] = useState("");
    useEffect(() => {
        setAnnounce("qwerqwerqwer");
    }, [])
    const handleReset = () => {
        setDomainTitle(name);
    }
    return (
        <Card className="animate__slideInBottom">
            <div className="flex flex-col gap-4">
                <div>
                    <div className="text-lg">域名称修改</div>
                    <Input className={"h-11 text-lg"} value={domainTitle} onChange={setDomainTitle} />
                </div>
                <div>
                    <div className="text-lg">域首页公告修改</div>
                    <RichTextEditor value={announce} onChange={setAnnounce} />
                </div>
                <div className="flex justify-center">
                    <button className="border border-slate-200 p-2  hover:bg-slate-100 rounded-sm">提交所有修改</button>
                </div>
            </div>
        </Card>
    )
}
export default ProfileManage;