import Card from "@/components/Card"
import PermissionManage from './PermissionManage'
import RoleManage from './RoleManage'
import UserManage from './UserManage'
import ProfileManage from './ProfileManage'
import { useState } from "react"


const DomainManage = () => {
    const [currentUrl, setCurrentUrl] = useState("域资料管理");
    const menus =
    {
        "域资料管理": <ProfileManage />,
        "用户管理": <UserManage />,
        "角色管理": <RoleManage />,
        "权限管理": <PermissionManage />,
    }


    return (
        <div className="h-full gap-2 w-3/5 flex justify-center animate__slideInBottom">
            <div className="w-1/5">
                <ol className="w-full bg-white border border-slate-200 shadow-md rounded-sm ">
                    {Object.keys(menus).map(
                        (item, idx) => <li key={idx} onClick={setCurrentUrl.bind(null, item)} className={`${item == currentUrl ? "bg-red-300 text-white border-r-red-500" : "border-r-transparent text-black hover:bg-slate-100"} border-r-4   text-lg cursor-pointer p-3 `}>{item}</li>
                    )}
                </ol>
            </div>

            <div className="w-4/5 ">
                {menus[currentUrl]}
            </div>

        </div>
    )
}
export default DomainManage;