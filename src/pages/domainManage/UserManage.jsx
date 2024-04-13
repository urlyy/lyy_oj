import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';
import domainStore from "@/store/domain";
import Select from "@/components/Select";
import userStore from "@/store/user";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { gender2text } from "@/utils/data2text";
import Pagination from "@/components/Pagination";
import Toast from "@/utils/toast";

const AddUserModal = ({ onClose }) => {
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [searchUsername, setSearchUsername] = useState("");
    const [searchTrueID, setSearchTrueID] = useState("");
    const [searchSchool, setSearchSchool] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);
    const { id: domainID } = domainStore();

    const handleSearchUsers = async (newPage) => {
        setCurPage(newPage);
        const res = await api.getAllUsers(searchUsername, searchTrueID, searchSchool, newPage)
        if (res.success) {
            const { pageNum, users } = res.data;
            setSearchUsers(users);
            setPageNum(pageNum);
            return true;
        }
        return false;
    }
    const handleFilter = async () => {
        const success = handleSearchUsers(1);
        if (success) {
            Toast("查询成功");
        }
    }
    useEffect(() => {
        handleSearchUsers(1);
    }, [])
    const handleAddUser = (idx) => {
        const u = searchUsers[idx];
        api.addUser2Domain(domainID, u.id).then(res => {
            if (res.success) {

            }
        })
    }
    return (
        <Modal onClose={onClose}>
            <div className="flex gap-1 items-end mb-2">
                <div>
                    <span>用户名</span>
                    <Input value={searchUsername} onChange={setSearchUsername} />
                </div>
                <div>
                    <span>学号/工号</span>
                    <Input value={searchTrueID} onChange={setSearchTrueID} />
                </div>
                <div>
                    <span>学校</span>
                    <Input value={searchSchool} onChange={setSearchSchool} />
                </div>
                <div>
                    <Button onClick={handleFilter} type="primary">查询</Button>
                    <Button onClick={() => { setSearchUsername(""); setSearchSchool(""); setSearchTrueID("") }} type="default" >重置</Button>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border">
                        <th className="p-1">学号/工号</th>
                        <th className="p-1 text-center">用户名</th>
                        <th className="p-1 text-center">学校</th>
                        <th className="p-1 text-center">性别</th>
                        <th className="p-1 text-center">邮箱</th>
                        <th className="p-1 text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {searchUsers.map((user, idx) => (
                        <tr key={idx} className="border">
                            <td className="p-1">{user.trueID}</td>
                            <td className="p-1">{user.username}</td>
                            <td className="p-1 text-center">{user.school}</td>
                            <td className="p-1 text-center">{gender2text(user.gender)}</td>
                            <td className="p-1 text-center">{user.email}</td>
                            <td className="p-1 text-center">
                                <Button onClick={handleAddUser.bind(null, idx)}>加入</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination current={curPage} pageNum={pageNum} onChange={(page) => { handleSearchUsers(page) }} />
        </Modal>
    )
}


const UserManage = ({ }) => {
    const [users, setUsers] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState([]);
    const [roles, setRoles] = useState([]);
    const { id: domainID } = domainStore();
    const [showUserSelectModal, setShowUserSelectModal] = useState(false);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [username, setUsername] = useState("");
    const [trueID, setTrueID] = useState("");

    const { id: myID } = userStore();

    const handleGetUsers = async (newPage) => {
        setCurPage(newPage);
        const res = await api.getUsers(domainID, newPage, username, trueID)
        if (res.success) {
            const { users, pageNum } = res.data;
            setPageNum(pageNum);
            setUsers(users);
            return true;
        }
        return false;
    }

    useEffect(() => {
        handleGetUsers(1);
        api.getRoles(domainID).then(res => {
            if (res.success) {
                const roles = res.data.roles;
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
        const userIDs = selected.map(idx => users[idx].userID);
        const res = await api.changeUsersRole(domainID, userIDs, roleID);
        if (res.success) {
            setSelectedIdx([]);
            const us = [...users];
            selected.forEach(idx => {
                us[idx] = { ...us[idx], roleID };
            })
            setUsers(us);
            Toast("修改成功", "success");
        }
    }

    const handleRemoveUsers = async () => {
        if (selectedIdx.length === 0) {
            return;
        }
        const userIDs = selectedIdx.map(idx => users[idx].userID);
        const res = await api.removeUsers(domainID, userIDs);
        if (res.success) {
            alert("删除成功");
            setUsers(users.filter((_, idx) => !selectedIdx.includes(idx)));
            setSelectedIdx([]);
        }
    }

    const handleFilter = async () => {
        const res = await handleGetUsers(1);
        if (res) {
            Toast("查询成功", "success")
        }
    }


    return (
        <Card className="animate__slideInBottom">
            {
                showUserSelectModal && <AddUserModal onClose={setShowUserSelectModal.bind(null, false)} />
            }
            {selectedIdx.length === 0 &&
                <Button className="mb-3" onClick={setShowUserSelectModal.bind(null, true)} type="primary">添加用户</Button>
            }
            {selectedIdx.length !== 0 &&
                <div className="flex gap-2 justify-between mb-3">
                    <div>
                        <button onClick={handleRemoveUsers} className={`text-white border p-1 bg-red-400 hover:bg-red-500`}>移除所选用户</button>
                    </div>
                    <div className="flex items-center">
                        <div >修改所选用户角色为</div>
                        {roles.length > 0 && <Select entries={roles.map(r => [r.name, r.id])}
                            onChange={(newRoleID) => { const roleID = parseInt(newRoleID); handleChangeRole(selectedIdx, roleID) }}
                            selectedValue={null} >
                        </Select>}
                    </div>
                </div>
            }
            <div className="flex gap-2 mb-2 items-end">
                <label>
                    <span>用户名</span>
                    <Input value={username} onChange={setUsername} />
                </label>
                <label>
                    <span>学号</span>
                    <Input value={trueID} onChange={setTrueID} />
                </label>
                <Button type="primary" onClick={handleFilter}>查询</Button>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border">
                        <th className="">选择</th>
                        <th className="">用户ID</th>
                        <th className="">学号/工号</th>
                        <th className=" text-center">用户名</th>
                        <th className=" text-center">角色</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr className="border" key={idx} >
                            <td className="p-1 h-full">
                                {myID !== user.userID && <input type="checkbox"
                                    checked={selectedIdx.includes(idx)}
                                    onChange={handleSelect.bind(null, idx)}
                                    className={`p-1 h-5 border rounded-sm flex items-center justify-center w-full`}
                                />}
                            </td>
                            <td className="p-1 text-center">{user.userID}</td>
                            <td className="p-1 text-center">{user.trueID}</td>
                            <td className="p-1 text-center">{user.username}</td>
                            <td className="p-1 text-center">
                                {myID !== user.userID && <Select entries={roles.filter(r => r.name !== "owner").map(r => [r.name, r.id])}
                                    onChange={(newRoleID) => { const roleID = parseInt(newRoleID); handleChangeRole([idx], roleID) }}
                                    selectedValue={user.roleID} >
                                </Select>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination current={curPage} pageNum={pageNum} onChange={handleGetUsers} />
        </Card >
    )
}
export default UserManage;