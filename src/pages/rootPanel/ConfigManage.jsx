import { useState, useEffect } from "react";
import api from "./api";
import Button from "@/components/Button";
import Card from "@/components/Card";
import RichTextEditor from "@/components/RichTextEditor";
import Input from "@/components/Input";
import Toast from "@/utils/toast";
import Alert from "@/utils/alert";



const Item = ({ value, onChange, onRemove }) => {
    return (
        <div className="flex gap-1">
            <div className="flex-1">
                <Input value={value} onChange={onChange} />
            </div>
            <Button onClick={onRemove} type="danger" >移除</Button>
        </div>
    )
}

const ConfigManage = () => {
    const [recommend, setRecommend] = useState(null);
    const [tmpRecommend, setTmpRecommend] = useState(null);
    const [announce, setAnnounce] = useState(null);
    const [tmpAnnounce, setTmpAnnounce] = useState(null);
    const [compilers, setCompilers] = useState([]);
    const [tmpCompilers, setTmpCompilers] = useState([]);
    const [addressList, setAddressList] = useState([]);
    const [tmpAddressList, setTmpAddressList] = useState([]);
    useEffect(() => {
        api.getConfig().then(res => {
            if (res.success) {
                const { announce, recommend, compilers, addressList } = res.data.config;
                setAnnounce(announce);
                setTmpAnnounce(announce);
                setRecommend(recommend);
                setTmpRecommend(recommend);
                setAddressList(addressList);
                setTmpAddressList(addressList);
                setCompilers(compilers);
                setTmpCompilers(compilers);
            }
        })
    }, [])
    const handleReset = () => {
        setTmpAddressList(addressList);
        setTmpAnnounce(announce);
        setTmpCompilers(compilers);
        setTmpRecommend(recommend);
        Toast("已重置");
    }
    const handleSubmit = async () => {
        if (tmpAddressList.length === 0 || tmpCompilers.length === 0) {
            Alert("判题机和编译器列表不能为空");
            return;
        }
        for (let i = 0; i < tmpAddressList.length; i++) {
            if (tmpAddressList[i] === "") {
                Alert("判题机不能为空");
                return;
            }
        }
        for (let i = 0; i < tmpCompilers.length; i++) {
            if (tmpCompilers[i] === "") {
                Alert("编译器不能为空");
                return;
            }
        }
        const res = await api.updateConfig(tmpAddressList, tmpCompilers, tmpRecommend, tmpAnnounce);
        if (res.success) {
            Toast("修改成功", "success");
        }
    }
    return (
        <Card className="animate__slideInBottom">
            <div className="flex flex-col gap-4">
                <Card title="编译器列表修改" rightHeader={<button onClick={() => { setTmpCompilers(prev => [...prev, ["", ""]]) }} className="text-blue-400 hover:text-blue-500">新增</button>}>
                    {tmpCompilers.map((c, idx) =>
                        <div key={idx} className="flex items-end gap-1">
                            <div className="flex-1">
                                <div>编译器名称</div>
                                <Input value={c[0]} onChange={(val) => {
                                    setTmpCompilers(prev => {
                                        const newCompilers = [...prev];
                                        const tmp = newCompilers[idx]
                                        newCompilers[idx] = [val, tmp[1]];
                                        return newCompilers
                                    })
                                }} />
                            </div>
                            <div className="flex-1">
                                <div>编译器容器标签</div>
                                <Input value={c[1]} onChange={(val) => {
                                    setTmpCompilers(prev => {
                                        const newCompilers = [...prev];
                                        const tmp = newCompilers[idx]
                                        newCompilers[idx] = [tmp[0], val];
                                        return newCompilers
                                    })
                                }} />
                            </div>
                            <Button type="danger" onClick={() => {
                                setTmpCompilers(prev => {
                                    const res = prev.filter((_, i) => i !== idx);
                                    return res;
                                })
                            }}>移除</Button>
                        </div>
                    )}
                </Card>
                <Card title="判题机列表修改" rightHeader={<button onClick={() => { setTmpAddressList(prev => [...prev, ""]) }} className="text-blue-400 hover:text-blue-500">新增</button>}>
                    <div className="grid grid-cols-3 gap-y-3">
                        {tmpAddressList.map((c, idx) => <Item value={c} onChange={(val) => {
                            setTmpAddressList(prev => {
                                const newAddressList = [...prev];
                                newAddressList[idx] = val;
                                return newAddressList
                            })
                        }} onRemove={() => { setTmpAddressList(prev => prev.filter((_, i) => i !== idx)) }} />)}
                    </div>
                </Card>
                <Card title="默认首页公告修改">
                    {tmpAnnounce && <RichTextEditor value={tmpAnnounce} onChange={setTmpAnnounce} />}
                </Card>
                <Card title="默认首页推荐修改">
                    {tmpRecommend && <RichTextEditor value={tmpRecommend} onChange={setTmpRecommend} />}
                </Card>
                <div className="flex justify-center gap-2">
                    <Button onClick={handleReset} >重置</Button>
                    <Button onClick={handleSubmit} type="primary">提交修改</Button>
                </div>
            </div>
        </Card>
    )
}
export default ConfigManage;