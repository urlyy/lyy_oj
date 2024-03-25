import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';
import domainStore from "@/store/domain";
import havePermission from '@/utils/permission'

const PermissionManage = ({ }) => {
    const [data, setData] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const { id: domainID } = domainStore();
    useEffect(() => {
        api.getRoles(domainID).then(res => {
            if (res.success) {
                const roles = res.data.roles;
                console.log(roles);
                setRoles(roles);
            }
        })
        api.getPermissions().then(res => {
            if (res.success) {
                const p = res.data.permissions;
                console.log(p);
                setPermissions(p);
            }
        })
        // const data = [
        //     {
        //         roleId: 1, roleName: "user", permissions:
        //         {
        //             "创建题目": true,
        //             "修改所有题目": true,
        //             "仅修改自己创建的题目": true,
        //             "查看未公开题目": true,
        //             "查看题目所有测试数据": true,

        //             "查看提交的代码": true,
        //             "重新判题": true,
        //             "手动修改判题结果": true,
        //             "查看判题脚本输出": true,

        //             "创建作业": true,
        //             "修改所有作业": true,
        //             "仅修改自己创建的作业": true,
        //             "查看未公开作业": true,
        //             "创建测验": true,
        //             "修改所有测验": true,
        //             "仅修改自己创建的测验": true,
        //             "查看未公开测验": true,
        //             "创建讨论": true,
        //             "修改自己的讨论": true,
        //             "删除自己的讨论": true,
        //             "删除讨论": true,
        //             "删除自己的回复": true
        //         }
        //     },
        //     {
        //         roleId: 2, roleName: "teacher", permissions:
        //         {
        //             "创建题目": true,
        //             "修改所有题目": true,
        //             "仅修改自己创建的题目": true,
        //             "查看未公开题目": true,
        //             "查看题目所有测试数据": true,

        //             "查看提交的代码": true,
        //             "重新判题": true,
        //             "手动修改判题结果": true,
        //             "查看判题脚本输出": true,

        //             "创建作业": true,
        //             "修改所有作业": true,
        //             "仅修改自己创建的作业": true,
        //             "查看未公开作业": true,
        //             "创建测验": true,
        //             "修改所有测验": true,
        //             "仅修改自己创建的测验": true,
        //             "查看未公开测验": true,
        //             "创建讨论": true,
        //             "修改自己的讨论": true,
        //             "删除自己的讨论": true,
        //             "删除讨论": true,
        //             "删除自己的回复": true
        //         }
        //     },
        // ]
        // setData(data);
        // setPermissions([
        //     { name: "题库", permissions: ["创建题目", "递交题目", "修改所有题目", "仅修改自己创建的题目", "查看未公开题目", "查看题目所有测试数据"] },
        //     { name: "提交记录", permissions: ["查看提交的代码", "重新判题", "手动修改判题结果", "查看判题脚本输出"] },
        //     { name: "作业", permissions: ["创建作业", "修改所有作业", "仅修改自己创建的作业", "查看未公开作业"] },
        //     { name: "测验", permissions: ["创建测验", "修改所有测验", "仅修改自己创建的测验", "查看未公开测验"] },
        //     { name: "讨论", permissions: ["创建讨论", "修改自己的讨论", "删除自己的讨论", "删除讨论", "删除自己的回复"] },
        // ]);
        // 详情见数据库
        // const groups = [
        //     { name: "题库", permissions: [0, 1, 2, 3, 4, 5] },
        //     { name: "提交记录", permissions: [6, 7, 8, 9] },
        //     { name: "作业", permissions: [10, 11, 12, 13] },
        //     { name: "测验", permissions: [14, 15, 16, 17] },
        //     { name: "讨论", permissions: [18, 19, 20, 21, 22] },
        // ]

    }, [])
    const groups = ([
        { name: "题库", permissions: ["创建题目", "递交题目", "修改所有题目", "仅修改自己创建的题目", "查看未公开题目", "查看题目所有测试数据"] },
        { name: "提交记录", permissions: ["查看提交的代码", "重新判题", "手动修改判题结果", "查看判题脚本输出"] },
        { name: "作业", permissions: ["创建作业", "修改所有作业", "仅修改自己创建的作业", "查看未公开作业"] },
        { name: "测验", permissions: ["创建测验", "修改所有测验", "仅修改自己创建的测验", "查看未公开测验"] },
        { name: "讨论", permissions: ["创建讨论", "修改自己的讨论", "删除自己的讨论", "删除讨论", "删除自己的回复"] },
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
        }
    }

    return (
        <Card className="animate__slideInBottom">
            <div className={`grid grid-cols-${roles.length + 1} border-l border-t w-full rounded-sm`}>
                <div className={`grid col-span-${roles.length + 1} grid-cols-${roles.length + 1} border-b`}>
                    <div className="border-r p-1 text-lg">权限</div>
                    {roles.map((datum, idx) => (
                        <div className="text-center border-r p-1 text-lg" key={idx}>{datum.name}</div>
                    ))}
                </div>
                {groups.map((group, groupIdx) => (
                    <>
                        <div className={`items-center col-span-full border-b text-lg  p-1 bg-sky-400 text-white`}>
                            {group.name}
                        </div>
                        <div className={` items-center col-span-${roles.length + 1}  border-b`}>
                            {group.permissions.map((per, perIdx) => (
                                <div className={`grid  grid-cols-${roles.length + 1}`}>
                                    <div className="border-r text-lg p-1">{per}</div>
                                    {
                                        roles.map((role, roleIdx) => (
                                            <div className="items-center justify-center flex p-1 border-r">
                                                <input type="checkbox"
                                                    checked={havePermission(role.permission, permissions[per])}
                                                    onChange={(e) => { handleChange(e, groupIdx, perIdx, roleIdx) }}
                                                    className={`p-1 w-5 h-5 border rounded-sm `}
                                                />
                                            </div>

                                        ))
                                    }
                                </div>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </Card>
    )
}
export default PermissionManage;