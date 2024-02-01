import { useState, useEffect } from "react"
import userStore from "@/store/user"
import Input from "@/components/Input"

const CheckboxGroup = ({ title, entries, selectedValue, onClick }) => {
    return (
        <label className="flex-1">
            <div>{title}</div>
            <div className="flex gap-2">
                {
                    entries.map(({ label, value }, idx) => (
                        <div key={idx} className={` rounded-md p-1 cursor-pointer flex-1 ${selectedValue === value ? "bg-blue-400" : "bg-slate-200"}`} onClick={onClick.bind(null, value)}>
                            {label}
                        </div>
                    ))
                }
            </div>
        </label>
    )
}

const ProfileEdit = () => {
    const { username, gender, brief, avatar } = userStore();
    const [tmpForm, setTmpForm] = useState({
        username: username,
        gender: gender,
        brief: brief,
        avatar: avatar,
    });
    return (
        <div className="flex flex-1 flex-col items-center">
            <div className="w-2/3 flex flex-col gap-2">
                <div className="flex justify-center  ">
                    <div className="relative cursor-pointer">
                        <img className="rounded-full w-28 h-28" src={avatar} />
                        <div className="absolute right-0 bottom-0">修改</div>
                    </div>
                </div>
                <div className="flex w-full gap-6">
                    <label className="flex-1">
                        <div>用户名</div>
                        <Input value={tmpForm.username} />
                    </label>
                    <CheckboxGroup title={"性别"} selectedValue={tmpForm.gender} onClick={(newGender) => setTmpForm(prev => ({ ...prev, gender: newGender }))} entries={[{ label: "男性", value: 0 }, { label: "女性", value: 1 }]}></CheckboxGroup>
                </div>
                <div className="flex w-full gap-6">
                    <label className="flex-1">
                        <div>简介</div>
                        <Input value={brief} onChange={(text) => setTmpForm(prev => ({ ...prev, brief: text }))} />
                    </label>
                </div>
                <div className="flex w-full gap-6">
                    <label className="flex-1">
                        <div>学校</div>
                        <Input value={brief} onChange={(text) => setTmpForm(prev => ({ ...prev, gender: text }))} />
                    </label>
                    <label className="flex-1">
                        <div>个人网站</div>
                        <Input value={brief} onChange={(text) => setTmpForm(prev => ({ ...prev, gender: text }))} />
                    </label>
                </div>
                <div className="flex w-full gap-6">
                    <button className="w-full bg-green-400 hover:bg-green-500 p-2">保存</button>
                </div>
            </div>

        </div>
    )
}
export default ProfileEdit;