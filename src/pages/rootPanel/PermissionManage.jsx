import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';
import { havePermission } from '@/utils/permission'
import Toast from "@/utils/toast";

const PermissionManage = ({ }) => {
    const [data, setData] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const domainID = 0;
    useEffect(() => {
        api.getRoles(domainID).then(res => {
            if (res.success) {
                const roles = res.data.roles;
                setRoles(roles);
            }
        })
        api.getPermissions().then(res => {
            if (res.success) {
                const p = res.data.permissions;
                setPermissions(p);
            }
        })
    }, [])



    const groups = ([
        {
            name: "题库", permissions: ["创建题目", "递交题目", "修改题目", "查看未公开题目"]
        },
        { name: "提交记录", permissions: ["查看提交详情", "重新判题"] },
        { name: "作业", permissions: ["创建作业", "修改作业", "查看未公开作业",] },
        { name: "比赛", permissions: ["创建比赛", "修改比赛", "查看未公开比赛",] },
        { name: "讨论", permissions: ["创建讨论", "修改自己的讨论", "删除其他人的讨论", "删除其他人的评论"] },
        { name: "通知", permissions: ["创建通知", "删除通知"] },
    ]);

    const handleChange = async (event, groupIdx, perIdx, roleIdx) => {
        const permissionBit = permissions[groups[groupIdx].permissions[perIdx]];
        const newValue = event.target.checked;
        const role = roles[roleIdx];
        const res = await api.changeRolePermission(domainID, role.id, permissionBit, newValue)
        if (res.success) {
            const newPermission = res.data.permission;
            setRoles(prev => {
                const tmp = [...prev];
                tmp[roleIdx].permission = newPermission;
                return tmp;
            })
            Toast("修改权限成功", "success");
        }
    }

    return (
        <Card className="animate__slideInBottom">
            <table className="w-full">
                <thead>
                    <tr className="border">
                        <th className="border-r p-1 text-lg">权限</th>
                        {roles.map((datum, idx) => (
                            <th className="text-center border-r p-1 text-lg" key={idx}>{datum.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group, groupIdx) => (
                        <>
                            <tr>
                                <td colSpan={roles.length + 1} key={`g-${groupIdx}`} className={` items-center border-b text-xl  p-1 bg-sky-400 text-white`}>
                                    {group.name}
                                </td>
                            </tr>
                            {group.permissions.map((per, perIdx) => (
                                <tr key={`p-${perIdx}`} className={`hover:bg-slate-100`}>
                                    <td className="border-r text-lg p-1">{per}</td>
                                    {
                                        roles.map((role, roleIdx) => (
                                            <td key={`r-${roleIdx}`} className="justify-center p-1 border-r">
                                                <input type="checkbox"
                                                    checked={havePermission(role.permission, permissions[per])}
                                                    onChange={(e) => { handleChange(e, groupIdx, perIdx, roleIdx) }}
                                                    className={`cursor-pointer p-1 h-5 border rounded-sm flex items-center w-full`}
                                                />
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
        </Card >
    )
}
export default PermissionManage;