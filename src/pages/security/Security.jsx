import Card from "@/components/Card";
import Input from "@/components/Input";
import { useState } from "react";
import api from "./api";
import userStore from "@/store/user";
import Alert from "@/utils/alert";
import Toast from "@/utils/toast";
import Button from "@/components/Button";
import domainStore from "@/store/domain";
import { useNavigate } from "react-router-dom"

const PasswordChangeForm = () => {
    const logout = userStore(state => state.logout);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const handleSubmit = async () => {
        if (oldPassword === "" || password === "" || passwordConfirm === "") {
            Alert("不能为空");
            return;
        }
        if (password !== passwordConfirm) {
            Alert("两次密码不一致");
            return;
        }
        const res = await api.changePassword(oldPassword, password);
        if (res.success) {
            Alert("修改成功，请重新登录");
            logout();
        }
    }
    return (
        <Card className={"flex gap-2 flex-1"} title={"修改密码"}>
            <label>
                <div>当前密码</div>
                <Input type="password" value={oldPassword} onChange={setOldPassword} />
            </label>
            <label>
                <div>新密码</div>
                <Input type="password" value={password} onChange={setPassword} />
            </label>
            <label>
                <div>重复密码</div>
                <Input type="password" value={passwordConfirm} onChange={setPasswordConfirm} />
            </label>
            <Button className="mt-2" type="primary" onClick={handleSubmit}>提交修改</Button>
        </Card>
    )
}

const EmailChangeForm = () => {
    const logout = userStore(state => state.logout);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [captcha, setCaptcha] = useState("");
    const handleSubmit = async () => {
        if (email === "" || password === "" || captcha === "") {
            Alert("信息不能为空");
            return;
        }
        const res = await api.changeEmail(password, email, captcha);
        if (res.success) {
            Toast("修改成功，请重新登录");
            logout();
        }
    }
    const handleSendEmail = async () => {
        if (email === "") {
            Alert("邮箱不能为空");
            return;
        }
        const res = await api.sendChangeEmailCaptcha(email);
        if (res.success) {
            Toast("发送成功，请前往邮箱查看验证码", "success");
        }
    }
    return (
        <Card className={"flex flex-1 bg-red-100 gap-2"} title={"修改电子邮箱"}>
            <label>
                <div>当前密码</div>
                <Input type="password" value={password} onChange={setPassword} />
            </label>
            <label>
                <div>新电子邮箱</div>
                <div className="flex gap-2">
                    <div> <Input value={email} onChange={setEmail} /></div>
                    <Button onClick={handleSendEmail} type="primary">发送验证码</Button>
                </div>
            </label>
            <label>
                <div>验证码</div>
                <Input value={captcha} onChange={setCaptcha} />
            </label>
            <Button className="mt-2" type="primary" onClick={handleSubmit}>提交修改</Button>
        </Card>
    )

}

const LeaveDomainArea = () => {
    const { id: domainID } = domainStore();
    const clear = domainStore(state => state.clear);
    const { id: myID } = userStore();
    const handleLeave = async () => {
        Alert("你确定要脱离当前域吗?", <>脱离后将无法进入当前域</>, async () => {
            const res = await api.removeUsers(domainID, [myID]);
            if (res.success) {
                Toast("已脱离当前域,请重新选择域");
                clear();
            }
        }, true)
    }
    return (
        <Card className={"flex flex-1 bg-red-100 gap-2"} title={"退出域"}>
            <Button type="danger" onClick={handleLeave}>脱离当前域</Button>
        </Card>
    )

}

const Security = () => {
    const { ownerID } = domainStore();
    const { id: myID } = userStore();
    return (
        <div className="w-3/5 h-full flex gap-2 animate__slideInBottom p-">
            <EmailChangeForm />
            <PasswordChangeForm />
            {ownerID !== myID && <LeaveDomainArea />}
        </div>
    )
}
export default Security;