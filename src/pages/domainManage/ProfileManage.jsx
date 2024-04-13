import Card from "@/components/Card";
import Input from "@/components/Input";
import RichTextEditor from "@/components/RichTextEditor";
import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
import api from "./api";
import Toast from "@/utils/toast";
import Alert from "@/utils/alert";

const DomainProfileManage = () => {
    const { id, name, announce, recommend } = domainStore();
    const setDomain = domainStore(state => state.set)
    const [tmpName, setTmpName] = useState(name);
    const [tmpAnnounce, setTmpAnnounce] = useState(announce);
    const [tmpRecommend, setTmpRecommend] = useState(recommend);
    useEffect(() => {
        api.getProfile(id).then(res => {
            if (res.success) {
                const d = res.data.domain;
                setDomain(d);
                setTmpName(d.name);
                setTmpAnnounce(d.announce);
                setTmpRecommend(d.recommend);
            }
        })
    }, [])
    const handleReset = () => {
        setTmpName(name);
        setTmpAnnounce(announce);
        setTmpRecommend(recommend);
    }
    const handleSubmit = async () => {
        if (tmpName === "") {
            Alert("域名不能为空");
            return;
        }
        const res = await api.changeProfile(id, tmpName, tmpAnnounce, tmpRecommend);
        if (res.success) {
            setDomain({ id: id, name: tmpName, announce: tmpAnnounce, recommend: tmpRecommend, });
            Toast("修改成功");
        }
    }
    return (
        <Card className="animate__slideInBottom">
            <div className="flex flex-col gap-4">
                <Card title="域名称修改">
                    <Input className={"h-11 text-lg"} value={tmpName} onChange={setTmpName} />
                </Card>
                <Card title="域首页公告修改">
                    <RichTextEditor value={tmpAnnounce} onChange={setTmpAnnounce} />
                </Card>
                <Card title="域首页推荐修改">
                    <RichTextEditor value={tmpRecommend} onChange={setTmpRecommend} />
                </Card>
                <div className="flex justify-center">
                    <button onClick={handleReset} className="border border-slate-200 p-2  hover:bg-slate-100 rounded-sm">重置</button>
                    <button onClick={handleSubmit} className="border border-slate-200 p-2  hover:bg-slate-100 rounded-sm">提交修改</button>
                </div>
            </div>
        </Card>
    )
}
export default DomainProfileManage;