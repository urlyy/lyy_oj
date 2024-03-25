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

const AddUserModal = ({ onClose }) => {
    const [curPage, setCurPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchTrueID, setSearchTrueID] = useState("");
    const [searchSchool, setSearchSchool] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);
    const handleSearchUsers = (newPage) => {
        api.getAllUsers(searchKeyword, searchTrueID, searchSchool, curPage).then(res => {
            if (res.success) {
                setSearchUsers(res.data.users);
            }
        })
    }
    useEffect(() => {
        handleSearchUsers(1);
    }, [])

    return (
        <Modal onClose={onClose}>
            <div className="flex gap-1 items-end">
                <div>
                    <span>搜索关键词</span>
                    <Input value={searchKeyword} onChange={setSearchKeyword} />
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
                    <Button onClick={() => { handleSearchUsers(curPage) }} type="primary">搜索</Button>
                    <Button onClick={() => { setSearchKeyword(""); setSearchSchool(""); setSearchTrueID("") }} type="default">重置</Button>
                </div>
            </div>
            <div className="grid grid-cols-7 border-l border-r border-t">
                <div className="col-span-7  border-b grid grid-cols-7">
                    <div className="p-1">序号</div>
                    <div className="p-1">学号/工号</div>
                    <div className="p-1 text-center">用户名</div>
                    <div className="p-1 text-center">学校</div>
                    <div className="p-1 text-center">性别</div>
                    <div className="p-1 text-center">邮箱</div>
                    <div className="p-1 text-center">操作</div>
                </div>
                {searchUsers.map((user, idx) => (
                    <div key={idx} className="col-span-7 border-b grid grid-cols-7">
                        <div className="p-1">{idx + 1}</div>
                        <div className="p-1">{user.trueID}</div>
                        <div className="p-1">{user.username}</div>
                        <div className="p-1 text-center">{user.school}</div>
                        <div className="p-1 text-center">{gender2text(user.gender)}</div>
                        <div className="p-1 text-center">{user.email}</div>
                        <div className="p-1 text-center">
                            <Button>加入</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination current={curPage} pageNum={10} onChange={(page) => { handleSearchUsers(page) }} />
        </Modal>
    )
}


const UserManage = ({ }) => {
    const [users, setUsers] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState([]);
    const [roles, setRoles] = useState([]);
    const { id: domainID } = domainStore();
    const [showUserSelectModal, setShowUserSelectModal] = useState(false);

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
        console.log(selected.length)
        if (selected.length === 0) {
            return;
        }
        console.log(selected, users, selected.map(idx => users[idx].id));
        const userIDs = selected.map(idx => users[idx].userID);
        const res = await api.changeUsersRole(domainID, userIDs, roleID);
        if (res.success) {
            alert("修改成功");
            setSelectedIdx([]);
            const us = [...users];
            selected.forEach(idx => {
                us[idx] = { ...us[idx], roleID };
            })
            setUsers(us);
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
    return (
        <Card className="animate__slideInBottom">
            {
                showUserSelectModal && <AddUserModal onClose={setShowUserSelectModal.bind(null, false)} />
            }
            {selectedIdx.length === 0 &&
                <Button onClick={setShowUserSelectModal.bind(null, true)} type="primary">添加用户</Button>
            }
            {
                selectedIdx.length !== 0 &&
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
                                onChange={(newRoleID) => { const roleID = parseInt(newRoleID); handleChangeRole([idx], roleID) }}
                                selectedValue={user.roleID} >
                            </Select>
                        </div>
                    </div>
                ))}
            </div>
        </Card >
    )
}
export default UserManage;