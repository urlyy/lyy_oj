import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';
import domainStore from "@/store/domain";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Alert from "@/utils/alert";
import Toast from "@/utils/toast";


const RoleManage = ({ }) => {
    const { id: domainID } = domainStore();
    const [roles, setRoles] = useState([]);
    const [editedIdx, setEditedIdx] = useState(-1);
    const [editRoleName, setEditRoleName] = useState("");
    const [editRoleDesc, setEditRoleDesc] = useState("");
    const [showCreateInput, setShowCreateInput] = useState(false);
    const [createRoleName, setCreateRoleName] = useState("");
    const [createRoleDesc, setCreateRoleDesc] = useState("");
    const [excludeUsers, setExcludeUsers] = useState([]);
    useEffect(() => {
        api.getRoles(domainID).then(res => {
            if (res.success) {
                const roles = res.data.roles;
                setRoles(roles);
            }
        })
    }, [])

    // const handleRemove = async (selectIdx) => {
    //     const role = roles[selectIdx];
    //     const res = await api.removeRole(domainID, role.id);
    //     if (res.success) {
    //         alert("删除成功");
    //         setRoles(prev => prev.filter((_, idx) => idx !== selectIdx))
    //     }
    // }
    const handleStartEdit = (idx) => {
        setEditedIdx(idx);
        setEditRoleName(roles[idx].name);
        setEditRoleDesc(roles[idx].desc);

    }
    const handleSubmit = async () => {
        let roleID = null;
        let roleDesc, roleName;
        if (editedIdx !== -1) {
            const role = roles[editedIdx];
            roleID = role.id;
            roleDesc = editRoleDesc;
            roleName = editRoleName;
        } else {
            roleDesc = createRoleDesc;
            roleName = createRoleName;
        }
        if (roleDesc === "" || roleName === "") {
            Alert("角色信息请填写完整");
            return;
        }
        if (roleName === "owner" || roleName === "default") {
            Alert("角色名称不能为owner和default");
            return;
        }
        const res = await api.upsertRole(domainID, { roleID, roleDesc, roleName });
        if (res.success) {
            const role = res.data.role;
            if (roleID !== null) {
                setRoles(prev => {
                    const tmp = [...prev];
                    tmp[editedIdx] = role;
                    return tmp;
                })
                setEditedIdx(-1);
                Toast("修改成功", "success")
            } else {
                setRoles(prev => [...prev, role]);
                setShowCreateInput(false);
                Toast("新增角色成功", "success")
            }
        }
    }

    return (
        <Card className="animate__slideInBottom">
            <table className="w-full">
                <thead>
                    <tr className="border">
                        <td className="text-center">角色名</td>
                        <td className=" text-center">描述</td>
                        <td className="text-center">操作</td>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, idx) => (
                        <tr key={idx} className="border hover:bg-slate-100">
                            {editedIdx !== idx ?
                                <>
                                    <td className="p-1 text-center">{role.name}</td>
                                    <td className="p-1 text-center">{role.desc}</td>
                                    <td className="flex justify-center">
                                        {role.domainID !== 0 && <Button type="primary" onClick={handleStartEdit.bind(null, idx)}>编辑</Button>}
                                        {/* <Button type="danger" onClick={handleRemove.bind(null, idx)}>删除</Button> */}
                                    </td>
                                </> :
                                < >
                                    <td>
                                        <Input className={"m-1"} onChange={setEditRoleName} value={editRoleName} />
                                    </td>
                                    <td>
                                        <Input className={"m-1"} onChange={setEditRoleDesc} value={editRoleDesc} />

                                    </td>
                                    <td className="flex gap-1 m-1 justify-center">
                                        <Button type="default" onClick={() => { setEditedIdx(-1); }}>取消</Button>
                                        <Button type="primary" onClick={handleSubmit}>确定</Button>
                                    </td>
                                </>
                            }
                        </tr>
                    ))}

                    {showCreateInput ?
                        <tr className="border-b">
                            <td>
                                <Input className={"m-1"} onChange={setCreateRoleName} value={createRoleName} />
                            </td>
                            <td>
                                <Input className={"m-1"} onChange={setCreateRoleDesc} value={createRoleDesc} />
                            </td>
                            <td className="flex gap-1">
                                <Button type="primary" onClick={handleSubmit}>确定</Button>
                                <Button type="danger" onClick={() => { setShowCreateInput(false); }}>取消</Button>
                            </td>
                        </tr>
                        :
                        <td colSpan={3}>
                            <Button className="w-full" onClick={setShowCreateInput.bind(null, true)}>+新建角色</Button>
                        </td>
                    }
                </tbody>
            </table>
        </Card>
    )
}
export default RoleManage;