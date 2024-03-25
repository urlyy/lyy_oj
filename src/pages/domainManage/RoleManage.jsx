import Card from "@/components/Card";
import { useState, useEffect } from "react";
import api from './api';
import domainStore from "@/store/domain";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Input from "@/components/Input";


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
        let roleID = null, roleDesc, roleName;
        if (editedIdx !== -1) {
            const role = roles[editedIdx];
            roleID = role.id;
            roleDesc = editRoleDesc;
            roleName = editRoleName;
        } else {
            roleDesc = createRoleDesc;
            roleName = createRoleName;
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
            } else {
                setRoles(prev => [...prev, role]);
                setShowCreateInput(false);
            }
        }
    }

    return (
        <Card className="animate__slideInBottom">
            <div className="grid grid-cols-3 border-l border-r border-t w-full">
                <div className="grid col-span-3 grid-cols-3 border-b p-1">
                    <div className="">角色名</div>
                    <div className=" text-center">描述</div>
                    <div className="">操作</div>
                </div>
                {roles.map((role, idx) => (
                    <div key={idx} className="grid col-span-3 grid-cols-3 items-center border-b ">
                        {editedIdx !== idx ?
                            <>
                                <div className="p-1">{role.name}</div>
                                <div className="p-1 text-center">{role.desc}</div>
                                <div>
                                    <Button type="primary" onClick={handleStartEdit.bind(null, idx)}>编辑</Button>
                                    {/* <Button type="danger" onClick={handleRemove.bind(null, idx)}>删除</Button> */}
                                </div>
                            </> :
                            < >
                                <Input className={"m-1"} onChange={setEditRoleName} value={editRoleName} />
                                <Input className={"m-1"} onChange={setEditRoleDesc} value={editRoleDesc} />
                                <div className="flex gap-1 m-1">
                                    <Button type="default" onClick={() => { setEditedIdx(-1); }}>取消</Button>
                                    <Button type="primary" onClick={handleSubmit}>确定</Button>
                                </div>
                            </>
                        }

                    </div>
                ))}

                {showCreateInput ?
                    <div className="grid col-span-3 grid-cols-3 items-center border-b ">
                        <Input className={"m-1"} onChange={setCreateRoleName} value={createRoleName} />
                        <Input className={"m-1"} onChange={setCreateRoleDesc} value={createRoleDesc} />
                        <div className="flex gap-1">
                            <Button type="primary" onClick={handleSubmit}>确定</Button>
                            <Button type="danger" onClick={() => { setShowCreateInput(false); }}>取消</Button>
                        </div>

                    </div>
                    :
                    <div className="col-span-3">
                        <Button className="w-full" onClick={setShowCreateInput.bind(null, true)}>+新建角色</Button>
                    </div>
                }
            </div>
        </Card>
    )
}
export default RoleManage;