import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';
import domainStore from "@/store/domain";
import Select from "@/components/Select";
import userStore from "@/store/user";


const UserManage = ({ }) => {
    const [users, setUsers] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState([]);
    const [roles, setRoles] = useState([]);
    const { id: domainID } = domainStore();
    const { id: myID } = userStore();
    useEffect(() => {
        api.getUsers(domainID).then(res => {
            if (res.success) {
                const users = res.data.users;
                setUsers(users);
            }
        })
        api.getRoles(domainID).then(res => {
            if (res.success) {
                const roles = res.data.roles;
                console.log(roles);
                setRoles(roles);
            }
        })
    }, []);
    const handleSelect = (idx) => {
        const selected = selectedIdx.includes(idx)
        if (selected) {
            setSelectedIdx(prev => prev.filter(item => item != idx));
        } else {
            setSelectedIdx(prev => [...prev, idx]);
        }
    }

    const handleChangeRole = async (selected, roleID) => {
        if (selected.length === 0) {
            return;
        }
    }

    const handleRemoveUsers = async () => {
        if (selectedIdx.length === 0) {
            return;
        }
        const userIDs = selectedIdx.map(idx => roles[idx].id);
        const res = await api.removeUsers(domainID, userIDs);
        if (res.success) {
            alert("删除成功");
            setSelectedIdx([]);
        }
    }
    return (
        <Card className="animate__slideInBottom">
            {selectedIdx.length !== 0 &&
                <div className="flex flex-col gap-2">
                    <div>
                        <button onClick={handleRemoveUsers} className={`text-white border p-1 bg-red-400 hover:bg-red-500`}>移除所选用户</button>
                    </div>
                    <div>
                        <span>修改所选用户角色为</span>
                        {roles.length > 0 && <Select entries={roles.map(r => [r.name, r.id])}
                            onChange={(newRoleID) => { handleChangeRole(selectedIdx, newRoleID) }}
                            selectedValue={roles[roles.length - 1].id} >
                        </Select>}
                    </div>
                </div>
            }
            <div className="grid grid-cols-4 border-l border-r border-t w-full">
                <div className="grid col-span-4 grid-cols-4 border-b p-1">
                    <div className="">选择</div>
                    <div className="">用户ID</div>
                    <div className=" text-center">用户名</div>
                    <div className=" text-center">角色</div>
                </div>
                {users.map((user, idx) => (
                    <div key={idx} className="grid col-span-4 grid-cols-4 items-center border-b ">
                        <div className="p-1 flex items-center">
                            {<input type="checkbox"
                                checked={selectedIdx.includes(idx)}
                                onChange={handleSelect.bind(null, idx)}
                                className={`p-1 w-5 h-5 border rounded-sm `}
                            />}
                        </div>
                        <div className="p-1">{user.userID}</div>
                        <div className="p-1 text-center">{user.username}</div>
                        <div className="p-1 text-center">
                            <Select entries={roles.map(r => [r.name, r.id])}
                                onChange={(newRoleID) => { handleChangeRole([idx], newRoleID) }}
                                selectedValue={user.roleID} >
                            </Select>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}
export default UserManage;