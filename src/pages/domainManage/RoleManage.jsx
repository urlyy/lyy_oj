import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';


const RoleManage = ({ }) => {
    const [selectedIdx, setSelectedIdx] = useState([]);
    const [roles, setRoles] = useState([])
    useEffect(() => {
        const data = [
            { id: 1, name: "student", desc: "" },
            { id: 2, name: "teacher", desc: "" }
        ]
        setRoles(data);
    }, [])

    const handleSelect = (idx) => {
        const selected = selectedIdx.includes(idx)
        if (selected) {
            setSelectedIdx(prev => prev.filter(item => item != idx));
        } else {
            setSelectedIdx(prev => [...prev, idx]);
        }
    }

    return (
        <Card className="animate__slideInBottom">
            <div className="grid grid-cols-3 border-l border-r border-t w-full">
                <div className="grid col-span-3 grid-cols-3 border-b p-1">
                    <div className="">选择</div>
                    <div className="">角色名</div>
                    <div className=" text-center">描述</div>
                </div>
                {roles.map((role, idx) => (
                    <div key={idx} className="grid col-span-3 grid-cols-3 items-center border-b ">
                        <div className="p-1">
                            <input type="checkbox"
                                checked={selectedIdx.includes(idx)}
                                onChange={handleSelect.bind(null, idx)}
                                className={`p-1 w-5 h-5 border rounded-sm `}
                            />
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