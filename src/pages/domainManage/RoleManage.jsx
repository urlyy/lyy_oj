import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';
import domainStore from "@/store/domain";
import Select from "@/components/Select";


const RoleManage = ({ }) => {
    const { id: domainID } = domainStore();
    const [selectedIdx, setSelectedIdx] = useState([]);
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        api.getRoles(domainID).then(res => {
            if (res.success) {
                const roles = res.data.roles;
                setRoles(roles);
            }
        })
    }, [])

    const handleSelect = (idx) => {
        const selected = selectedIdx.includes(idx)
        if (selected) {
            setSelectedIdx(prev => prev.filter(item => item != idx));
        } else {
            setSelectedIdx(prev => [...prev, idx]);
        }
    }

    const handleRemoveRoles = async () => {
        const roleIDs = selectedIdx.map(idx => roles[idx].id)
        const res = await api.removeRoles(domainID, roleIDs);
        if (res.success) {
            alert("删除成功");
            setSelectedIdx([]);
        }
    }

    return (
        <Card className="animate__slideInBottom">
            <div>
                <button onClick={handleRemoveRoles} disabled={selectedIdx.length == 0} className={`text-white border p-1 ${selectedIdx.length == 0 ? "bg-slate-300" : "bg-red-400 hover:bg-red-500"}`}>删除所选角色</button>
            </div>
            <div className="grid grid-cols-3 border-l border-r border-t w-full">
                <div className="grid col-span-3 grid-cols-3 border-b p-1">
                    <div className="">选择</div>
                    <div className="">角色名</div>
                    <div className=" text-center">描述</div>
                </div>
                {roles.map((role, idx) => (
                    <div key={idx} className="grid col-span-3 grid-cols-3 items-center border-b ">
                        <div className="p-1">
                            {role.domainID !== 0 ? <input type="checkbox"
                                checked={selectedIdx.includes(idx)}
                                onChange={handleSelect.bind(null, idx)}
                                className={`p-1 w-5 h-5 border rounded-sm `}
                            /> : <></>}
                        </div>
                        <div className="p-1">{role.name}</div>
                        <div className="p-1 text-center">{role.desc}</div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
export default RoleManage;