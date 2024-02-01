import api from './api'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import userStore from '@/store/user'
import domainStore from '@/store/domain';


const Input = ({ label, onChange, value, isPassword }) => {
    return (
        <label className='group'>
            <div className='mr-1 group-hover:text-blue-400'>{label}</div>
            <input type={isPassword ? "password" : "text"} value={value} onChange={onChange} className='outline-none border-t-0 border-l-0 border-r-0 border-b border-slate-400 group-hover:border-blue-400' />
        </label>
    )
}

const Button = ({ onClick, children }) => {
    return (
        <button className='flex-1 text-white rounded-lg bg-blue-300 hover:bg-blue-400 p-2' type="button" onClick={onClick}>{children}</button>
    )
}

const LoginForm = ({ onToggle }) => {
    const navigate = useNavigate();
    const setUser = userStore(state => state.setUser);
    const setDomain = domainStore(state => state.setDomain)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const submit = async () => {
        const res = await api.login(username, password);
        const user = {
            token: "1234",
            id: 1,
            username: "lyy",
            avatar: "https://assets.leetcode.cn/aliyun-lc-upload/users/zui-shang-chuan-k/avatar_1609037031.png?x-oss-process=image%2Fformat%2Cwebp",
            role: 1,
            brief: "这是一条简介",
            gender: 1,
        };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        const domainNum = 1;
        if (domainNum === 1) {
            const domain = {
                id: 10,
                name: "一个域",
            }
            setDomain(domain)
            localStorage.setItem("domain", JSON.stringify(domain));
            navigate('/');
        } else {
            navigate("/domains")
        }
    }
    return (
        <>
            <div className='text-center text-lg text-blue-400'>登录</div>
            <form className='flex flex-col gap-2'>
                <Input value={username} label={"用户名"} onChange={(e) => { setUsername(e.target.value) }}></Input>
                <Input value={password} label={"密码"} onChange={(e) => { setPassword(e.target.value) }}></Input>
                <div className='flex gap-2'>
                    <Button onClick={submit}>提交</Button>
                    <Button onClick={onToggle.bind(null, "register")}>前往注册</Button>
                </div>
            </form>
        </>
    )
}

const RegisterForm = ({ onToggle }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const submit = async () => {
        const res = await api.register(username, password);
    }
    return (
        <>
            <div className='text-center text-lg text-blue-400'>注册</div>
            <form className='flex flex-col gap-2'>
                <Input value={username} label={"用户名"} onChange={(e) => { setUsername(e.target.value) }}></Input>
                <Input value={password} label={"密码"} onChange={(e) => { setPassword(e.target.value) }}></Input>
                <Input value={passwordConfirm} label={"密码确认"} onChange={(e) => { setPasswordConfirm(e.target.value) }}></Input>
                <div className='flex gap-2'>
                    <Button onClick={submit}>提交</Button>
                    <Button onClick={onToggle.bind(null, "login")}>前往登录</Button>
                </div>
            </form>
        </>
    )
}

const Entrance = () => {
    const [type, setType] = useState("login");
    const handleToggle = (type) => {
        setType(type);
    }
    return (
        <div className='shadow-lg p-3'>
            {type === "login" && <LoginForm onToggle={handleToggle}></LoginForm>}
            {type == "register" && <RegisterForm onToggle={handleToggle}></RegisterForm>}
        </div>
    )
}

export default Entrance;