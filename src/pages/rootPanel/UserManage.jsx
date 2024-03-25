import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';
import domainStore from "@/store/domain";
import Select from "@/components/Select";
import userStore from "@/store/user";
import Button from "@/components/Button";
import { dumpExcel, readExcel } from "@/utils/excel";


const UserManage = ({ }) => {
    const [users, setUsers] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState([]);
    const [roles, setRoles] = useState([]);
    const { id: domainID } = domainStore();
    const { id: myID } = userStore();
    useEffect(() => {

    }, []);

    const handleCreateUser = async (event) => {
        const file = event.target.files[0];
        const rows = await readExcel(file);
        if (rows === null) {
            alert("获取文件失败");
            return;
        }

        const data = rows.map(item => {
            let gender;
            if (item.性别 === "男") {
                gender = 1;
            } else if (item.性别 === "女") {
                gender = 2;
            } else {
                gender = 0;
            }
            return ({
                trueID: item["学号/工号"],
                school: item.学校 || "",
                gender: gender,
                username: item.用户名,
            })
        })
        const res = await api.createUser(data);
        if (res.success) {
            alert("创建成功，请等待用户数据文件下载");
            const users = res.data.users.map(u => ({
                "学号/工号": u[0],
                "用户名": u[1],
                "邮箱": u[2],
                "密码": u[3],
            }));
            dumpExcel(users, "用户数据");
        } else {
            alert("创建失败");
        }
        //手动清理
        event.target.value = null;
    }

    return (
        <Card className="animate__slideInBottom">
            <div className="flex gap-2 items-center">
                <div className="p-1 cursor-pointer relative w-36 h-10 bg-blue-400 hover:bg-blue-500 text-white rounded-md items-center flex justify-center">
                    Excel创建用户
                    <input className="absolute w-full h-full opacity-0" onChange={handleCreateUser} type="file"></input>
                </div>
                <div>
                    <div className="text-lg">表格样例</div>
                    <table>
                        <thead>
                            <tr className="border">
                                <th className="p-1 border">学号/工号</th>
                                <th className="p-1 border">用户名</th>
                                <th className="p-1 border">性别</th>
                                <th className="p-1 border">学校</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border">
                                <td className="p-1 border">2024xxxxx</td>
                                <td className="p-1 border">x班xxx</td>
                                <td className="p-1 border">男/女/未知(可选，没有该列即未知)</td>
                                <td className="p-1 border">xx大学(可选)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>


        </Card>
    )
}
export default UserManage;