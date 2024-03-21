import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';


const UserManage = ({ }) => {
    const [users, setUsers] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState([]);
    const [roles, setRoles] = useState([])
    useEffect(() => {
        const data = [
            { id: 1, username: "刘宇阳", roleId: 1 },
            { id: 2, username: "西欧洋洋", roleId: 2 }
        ]
        setUsers(data);
        setRoles([
            { id: 1, name: "student", },
            { id: 2, name: "teacher", }
        ])
    }, [])
    const roleId2name = (id) => {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].id == id) {
                return roles[i].name;
            }
        }
        return null;
    }
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
            <div className="grid grid-cols-4 border-l border-r border-t w-full">
                <div className="grid col-span-4 grid-cols-4 border-b p-1">
                    <div className="">选择</div>
                    <div className="">用户ID</div>
                    <div className=" text-center">用户名</div>
                    <div className=" text-center">角色</div>
                </div>
                {users.map((user, idx) => (
                    <div key={idx} className="grid col-span-4 grid-cols-4 items-center border-b ">
                        <div className="p-1">
                            <input type="checkbox"
                                checked={selectedIdx.includes(idx)}
                                onChange={handleSelect.bind(null, idx)}
                                className={`p-1 w-5 h-5 border rounded-sm `}
                            />
                        </div>
                        <div className="p-1">{user.id}</div>
                        <div className="p-1 text-center">{user.username}</div>
                        <div className="p-1 text-center">
                            <select className="border rounded-sm p-1" value={user.roleId}>
                                {roles.map((role, idx2) => <option key={`${idx}-${idx2}`} value={role.id}>{role.name}</option>)}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
export default UserManage;