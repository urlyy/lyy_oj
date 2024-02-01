import { useState } from "react";
import NavItem from './NavItem';

const LoginDialog = ({ visible, onClose }) => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePassChange = (event) => {
        setPass(event.target.value);
    };

    const handleSubmit = () => {
        alert(username)
        alert(pass)
    }

    return (
        <>
            {visible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-900 opacity-50 backdrop-filter backdrop-blur-xl"></div>
                    <div className="bg-white rounded-sm p-6 z-10 relative shadow-2xl">
                        <button onClick={onClose} className="absolute right-2 top-2  text-black">
                            关闭
                        </button>
                        <div className="text-center">登录</div>
                        <div>学号/工号</div>
                        <input onChange={handleUsernameChange} value={username} type="text" className="border-b border-gray-300 focus:outline-none focus:border-blue fp" placeholder="请输入用户名" />
                        <div>密码</div>
                        <input onChange={handlePassChange} value={pass} type="password" className="border-b border-gray-300 focus:outline-none focus:border-blue" placeholder="请输入密码" />
                        <div onClick={handleSubmit} className="bg-blue text-white text-center rounded-lg mt-2">登录</div>
                        <button>忘记密码?</button>
                    </div>
                </div>
            )}
        </>
    )
}

const LoginDialogButton = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const handleVisible = () => {
        setVisible(!visible);
    };
    return (
        <>
            <NavItem alignRight={true} onClick={handleVisible}>{children}</NavItem>
            <LoginDialog visible={visible} onClose={handleVisible} />
        </>
    );
};

export default LoginDialogButton;