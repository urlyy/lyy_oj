import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';


const PermissionManage = ({ }) => {
    const [data, setData] = useState([]);
    const [permissions, setPermissions] = useState([]);
    useEffect(() => {
        const data = [
            {
                roleId: 1, roleName: "user", permissions:
                {
                    "创建题目": true,
                    "修改所有题目": true,
                    "仅修改自己创建的题目": true,
                    "查看未公开题目": true,
                    "查看题目所有测试数据": true,

                    "查看提交的代码": true,
                    "重新判题": true,
                    "手动修改判题结果": true,
                    "查看判题脚本输出": true,

                    "创建作业": true,
                    "修改所有作业": true,
                    "仅修改自己创建的作业": true,
                    "查看未公开作业": true,
                    "创建测验": true,
                    "修改所有测验": true,
                    "仅修改自己创建的测验": true,
                    "查看未公开测验": true,
                    "创建讨论": true,
                    "修改自己的讨论": true,
                    "删除自己的讨论": true,
                    "删除讨论": true,
                    "删除自己的回复": true
                }
            },
            {
                roleId: 2, roleName: "teacher", permissions:
                {
                    "创建题目": true,
                    "修改所有题目": true,
                    "仅修改自己创建的题目": true,
                    "查看未公开题目": true,
                    "查看题目所有测试数据": true,

                    "查看提交的代码": true,
                    "重新判题": true,
                    "手动修改判题结果": true,
                    "查看判题脚本输出": true,

                    "创建作业": true,
                    "修改所有作业": true,
                    "仅修改自己创建的作业": true,
                    "查看未公开作业": true,
                    "创建测验": true,
                    "修改所有测验": true,
                    "仅修改自己创建的测验": true,
                    "查看未公开测验": true,
                    "创建讨论": true,
                    "修改自己的讨论": true,
                    "删除自己的讨论": true,
                    "删除讨论": true,
                    "删除自己的回复": true
                }
            },
        ]
        setData(data);
        setPermissions([
            { name: "题库", permissions: ["创建题目", "递交题目", "修改所有题目", "仅修改自己创建的题目", "查看未公开题目", "查看题目所有测试数据"] },
            { name: "提交记录", permissions: ["查看提交的代码", "重新判题", "手动修改判题结果", "查看判题脚本输出"] },
            { name: "作业", permissions: ["创建作业", "修改所有作业", "仅修改自己创建的作业", "查看未公开作业"] },
            { name: "测验", permissions: ["创建测验", "修改所有测验", "仅修改自己创建的测验", "查看未公开测验"] },
            { name: "讨论", permissions: ["创建讨论", "修改自己的讨论", "删除自己的讨论", "删除讨论", "删除自己的回复"] },
        ]
        );
    }, [])

    const handleChange = (event, groupIdx, perIdx, datumIdx) => {
        const targetPermission = permissions[groupIdx].permissions[perIdx];
        console.log(targetPermission, data[datumIdx]);
        const newValue = event.target.checked;
        setData(prev => prev.map((datum, idx) => {
            if (idx == datumIdx) {
                const newDatum = { ...datum };
                newDatum.permissions[targetPermission] = newValue;
                console.log(newDatum)
                return newDatum;
            }
            return datum;
        }))
    }

    return (
        <Card className="animate__slideInBottom">
            <div className={`grid grid-cols-${data.length + 1} border-l border-t w-full rounded-sm`}>
                <div className={`grid col-span-${data.length + 1} grid-cols-${data.length + 1} border-b`}>
                    <div className="border-r p-1 text-lg">权限</div>
                    {data.map((datum, idx) => (
                        <div className="text-center border-r p-1 text-lg" key={idx}>{datum.roleName}</div>
                    ))}
                </div>
                {permissions.map((group, groupIdx) => (
                    <>
                        <div className={`items-center col-span-full border-b text-lg  p-1 bg-sky-400 text-white`}>
                            {group.name}
                        </div>
                        <div className={` items-center col-span-${data.length + 1}  border-b`}>
                            {group.permissions.map((per, perIdx) => (
                                <div className={`grid  grid-cols-${data.length + 1}`}>
                                    <div className="border-r text-lg p-1">{per}</div>
                                    {
                                        data.map((datum, datumIdx) => (
                                            <div className="items-center justify-center flex p-1 border-r">
                                                <input type="checkbox"
                                                    checked={datum.permissions[per]}
                                                    onChange={(e) => { handleChange(e, groupIdx, perIdx, datumIdx) }}
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