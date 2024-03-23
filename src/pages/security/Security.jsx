import Card from "@/components/Card";
import Input from "@/components/Input";
import { useState, useNavigate } from "react";
import api from "./api";
import userStore from "@/store/user";

const Button = ({ children, onClick = () => { } }) => {
    return (
        <button className="bg-blue-400 hover:bg-blue-500 text-white  p-2 text-lg rounded-lg" onClick={onClick} type="button">{children}</button>
    )
}

const PasswordChangeForm = () => {
    const logout = userStore(state => state.logout);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const handleSubmit = async () => {
        if (oldPassword === "" || password === "" || passwordConfirm === "") {
            alert("不能为空");
            return;
        }
        if (password !== passwordConfirm) {
            alert("两次密码不一致");
            return;
        }
        const res = await api.changePassword(oldPassword, password);
        if (res.success) {
            alert("修改成功，请重新登录");
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
            <Button onClick={handleSubmit}>修改密码</Button>
        </Card>
    )
}

const EmailChangeForm = () => {
    const logout = userStore(state => state.logout);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = async () => {
        if (email === "" || password === "") {
            alert("不能为空");
            return;
        }
        const res = await api.changeEmail(password, email);
        if (res.success) {
            alert("修改成功，请重新登录");
            logout();
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
                <Input value={email} onChange={setEmail} />
            </label>
            <Button onClick={handleSubmit}>修改电子邮箱</Button>
        </Card>
    )

}

const Security = () => {

    return (
        <div className="w-3/5 h-full flex gap-2 animate__slideInBottom p-">
            <EmailChangeForm />
            <PasswordChangeForm />
        </div>
    )
}
export default Security;