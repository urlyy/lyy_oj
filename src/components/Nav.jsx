import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/user';
import domainStore from '../store/domain';
import { VscAccount } from "react-icons/vsc";


const NavItem = ({ onClick, active = false, alignRight, children }) => {
    return (
        <li onClick={onClick} className={`border-b-2  hover:border-b-blue-400 ${active ? "border-b-red-400" : "border-b-transparent"} hover:bg-slate-100 px-4  text-slate-700 rounded-sm flex items-center font-medium cursor-pointer ${alignRight === true ? ' ml-auto' : ""}`}>
            {children}
        </li>
    )
}

const Dropdown = ({ alignRight, children, title, active }) => {
    return (
        <li className={` ${active ? "border-b-2 border-b-red-400" : ""} z-50 group relative hover:border-b-2 hover:border-b-blue-400  hover:bg-slate-100 px-4  text-slate-700 rounded-sm flex items-center font-medium ${alignRight === true ? ' ml-auto' : ""}`}>
            <div className='relative cursor-pointer flex items-center gap-1'><VscAccount />{title}</div>
            <ul className={`mt-[2px] invisible group-hover:visible flex flex-col w-28 justify-center absolute right-0 top-full bg-white border border-slate-200`}>
                {children}
            </ul>
        </li>
    )
}

const DropdownItem = ({ children, onClick }) => {
    return (
        <li onClick={onClick} className='z-50 cursor-pointer px-2 py-2 border border-slate-200 hover:bg-slate-200'>
            {children}
        </li>
    )
}

const Nav = () => {
    const navigate = useNavigate();
    const logout = userStore(state => state.logout);
    const leaveDomain = domainStore(state => state.clear);
    const { name: domainName, ownerID } = domainStore();
    const { id: userID, username } = userStore();
    const [activeIdx, setActiveIdx] = useState(0);
    // const routes = (path) => {
    //     if (domainID == undefined) {
    //         return `/${domainID}/${path}`;
    //     } else {
    //         return '/';
    //     }
    // }
    const handleNavigate = (url, idx = 0) => {
        setActiveIdx(idx);
        navigate(url);
    }
    const handleLogout = () => {
        logout();
        localStorage.removeItem("user");
        leaveDomain();
        localStorage.removeItem("domain");
    }
    const handleLeaveDomain = () => {
        leaveDomain();
        localStorage.removeItem("domain");
    }

    const navItems = () => {
        const items = [
            ['首页', handleNavigate.bind(null, "/")],
            ['题库', handleNavigate.bind(null, `/problems`)],
            ['作业', handleNavigate.bind(null, `/homeworks`)],
            ['比赛', handleNavigate.bind(null, `/contests`)],
            ['排名', handleNavigate.bind(null, `/rank`)],
            ['判题记录', handleNavigate.bind(null, `/submissions`)],
            ['讨论', handleNavigate.bind(null, '/discussions')],
        ]
        if (ownerID === userID) {
            items.push(['管理当前域', handleNavigate.bind(null, '/admin')])
        }
        if (domainName === "ROOT") {
            items.push(['root面板', handleNavigate.bind(null, '/root')])
        }
        return items;
    }

    return (
        <nav className='flex w-full justify-center bg-white rounded-sm shadow-md'>
            <div className="flex w-3/5 items-center">
                <ul className='flex h-full w-full'>
                    <NavItem onClick={handleNavigate.bind(null, `/`, 0)}>
                        <img
                            src="/logo.png"
                            className='w-10 aspect-square '
                        />
                    </NavItem>
                    {navItems().map(([title, handleClick], idx) => (
                        <NavItem active={activeIdx === idx} onClick={handleClick.bind(null, idx)} key={idx}>{title}</NavItem>
                    ))}

                    <Dropdown active={activeIdx === -1} title={username} alignRight={true}>
                        <DropdownItem onClick={() => handleNavigate(`/${userID}/profile`, -1)}>我的资料</DropdownItem>
                        <DropdownItem onClick={() => handleNavigate('/security', -1)}>安全设置</DropdownItem>
                        <DropdownItem onClick={handleLeaveDomain}>切换域</DropdownItem>
                        <DropdownItem onClick={handleLogout}>登出</DropdownItem>
                    </Dropdown>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;