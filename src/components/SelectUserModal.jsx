import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
import Toast from "@/utils/toast";
import Button from "./Button";
import Input from "./Input";
import Pagination from "./Pagination";
import { gender2text } from "@/utils/data2text";
import Modal from "./Modal";
import request from "@/utils/request";


const getAllUsers = async (domainID, username = "", trueID = "", school = "", curPage) => {
    const res = await request.get(`/user/list`, { page: curPage, username, trueID, school, d: domainID });
    return res;
}

const SelectUserModal = ({ onClose, onAdd, buttons = [], getButtonsStatus = [] }) => {
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [searchUsername, setSearchUsername] = useState("");
    const [searchTrueID, setSearchTrueID] = useState("");
    const [searchSchool, setSearchSchool] = useState("");
    const [searchUsers, setSearchUsers] = useState([]);
    const { id: domainID } = domainStore();

    const handleSearchUsers = async (newPage) => {
        setCurPage(newPage);
        const res = await getAllUsers(domainID, searchUsername, searchTrueID, searchSchool, newPage)
        if (res.success) {
            const { pageNum, users } = res.data;
            setSearchUsers(users);
            setPageNum(pageNum);
            return true;
        }
        return false;
    }
    const handleFilter = async () => {
        setCurPage(1);
        const success = handleSearchUsers(1);
        if (success) {
            Toast("查询成功");
        }
    }
    useEffect(() => {
        handleSearchUsers(1);
    }, [])

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
                <div className="flex gap-4">
                    <Button onClick={handleFilter} type="primary">查询</Button>
                    <Button onClick={() => { setSearchUsername(""); setSearchSchool(""); setSearchTrueID(""); Toast("重置成功") }} type="default" >重置</Button>
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
                            {buttons.map((B, idx1) => (
                                <td key={`${idx}-${idx1}`} className="p-1 text-center">
                                    <B status={getButtonsStatus[idx1](user, idx)} user={user} idx={idx} setInnerUsers={setSearchUsers} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination current={curPage} pageNum={pageNum} onChange={(page) => { handleSearchUsers(page) }} />
        </Modal>
    )
}
export default SelectUserModal;