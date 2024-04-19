import Card from "@/components/Card"

import { useState } from "react"
import Button from '@/components/Button'
import Input from "@/components/Input"
import Alert from "@/utils/alert"
import domainStore from "@/store/domain"
import Toast from "@/utils/toast"
import SelectUserModal from "@/components/SelectUserModal"
import api from "./api"
import { gender2text } from "@/utils/data2text"


const SelectOwnerModal = ({ onClose, setOwner, owner }) => {
    // const { domainID } = domainStore();

    const handleSetOwner = (user, idx, setInnerUsers) => {
        setOwner(user);
    }

    const SetOwnerButton = ({ user, idx, setInnerUsers, status }) => {
        if (status === true) {
            return <Button type="primary" onClick={handleSetOwner.bind(null, user, idx, setInnerUsers)}>设为域主</Button>
        } else {
            return <Button type="danger" disabled={true}>当前选择</Button>
        }
    }
    const setOwnerButtonVisible = (ownerID, user, idx) => {
        return user.id !== ownerID;
    }
    const trueSetOwnerButtonVisible = setOwnerButtonVisible.bind(null, owner ? owner.id : null);
    return <SelectUserModal onClose={onClose} buttons={[SetOwnerButton]} getButtonsStatus={[trueSetOwnerButtonVisible]} />
}

const DomainManage = () => {
    const [name, setName] = useState("");
    const [owner, setOwner] = useState(null);
    const [showUserSelectModal, setShowUserSelectModal] = useState(false);
    const handleAddDomain = async () => {
        console.log(name)
        if (name === "") {
            Alert("域名不能为空")
            return;
        }
        if (name === "ROOT") {
            Alert("域名不能为ROOT");
            return;
        }
        if (owner === null) {
            Alert("请先选择域主");
            return;
        }
        Alert("确定创建域吗?", <div className="text-lg">
            <div>域名:{name}</div>
            <div>域主: id:{owner.id} 用户名:{owner.username}</div>
        </div>, async () => {
            const res = await api.createDomain(name, owner.id);
            if (res.success) {
                Alert("添加成功", <></>);
                setName("");
                setOwner(null);
            }
        }, true)

    }

    const handleSelectOwner = (user) => {
        setOwner({
            id: user.id,
            username: user.username,
            school: user.school,
            trueID: user.trueID,
            email: user.email,
            gender: user.gender,
        })
    }

    return (
        <Card className="animate__slideInBottom">
            <label>
                <span className="text-lg">填写域名</span>
                <Input value={name} onChange={setName} />
            </label>
            <div>
                <span className="text-lg">选择域主</span>
                <Button type="primary" onClick={setShowUserSelectModal.bind(null, true)}>选择域主</Button>
                {owner && <Button type="danger" onClick={setOwner.bind(null, null)}>移除当前选择</Button>}
            </div>
            {owner && <table className="w-full">
                <thead>
                    <tr className="border">
                        <th className="p-1">学号/工号</th>
                        <th className="p-1 text-center">用户名</th>
                        <th className="p-1 text-center">学校</th>
                        <th className="p-1 text-center">性别</th>
                        <th className="p-1 text-center">邮箱</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border">
                        <td className="p-1">{owner.trueID}</td>
                        <td className="p-1">{owner.username}</td>
                        <td className="p-1 text-center">{owner.school}</td>
                        <td className="p-1 text-center">{gender2text(owner.gender)}</td>
                        <td className="p-1 text-center">{owner.email}</td>
                    </tr>
                </tbody>
            </table>}
            <div className="mt-2">
                <Button onClick={handleAddDomain} type="success">提交创建</Button>
            </div>
            {
                showUserSelectModal && <SelectOwnerModal owner={owner} setOwner={handleSelectOwner} onClose={setShowUserSelectModal.bind(null, false)} />
            }
        </Card>
    )
}
export default DomainManage;