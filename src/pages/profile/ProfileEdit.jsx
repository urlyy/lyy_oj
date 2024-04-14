import { useState, useEffect } from "react"
import userStore from "@/store/user"
import Input from "@/components/Input"
import { useNavigate } from 'react-router-dom'
import api from "./api"
import Alert from "@/utils/alert"
import Toast from "@/utils/toast"
import Button from "@/components/Button"


const CheckboxGroup = ({ title, entries, selectedValue, onChange }) => {
    console.log(selectedValue, entries);
    return (
        <label className="flex-1">
            <div>{title}</div>
            <div className="flex gap-2">
                {
                    entries.map(({ label, value }, idx) => (
                        <div onClick={() => onChange(value)} key={idx} className={`text-center rounded-md p-1 cursor-pointer flex-1 ${selectedValue !== value ? "bg-slate-100" : selectedValue === 1 ? "bg-blue-400 text-white" : "text-white bg-red-400"}`}>
                            {label}
                        </div>
                    ))
                }
            </div>
        </label>
    )
}

const ProfileEdit = () => {
    const navigate = useNavigate();
    const { username, gender, website, school, id } = userStore();
    const [tmpUsername, setTmpUsername] = useState(username);
    const [tmpGender, setTmpGender] = useState(gender);
    const [tmpWebsite, setTmpWebsite] = useState(website);
    const [tmpSchool, setTmpSchool] = useState(school);
    const setProfile = userStore(state => state.setProfile)

    const handleSubmit = async () => {
        if (username === "") {
            Alert("个人资料不能为空");
            return;
        }
        const res = await api.changeProfile(tmpUsername, tmpGender, tmpSchool, tmpWebsite);
        if (res.success) {
            setProfile(tmpUsername, tmpGender, tmpSchool, tmpWebsite);
            Toast("修改个人资料成功");
            navigate(`/${id}/profile`);
        }
    }

    const handleReset = () => {
        setTmpGender(gender);
        setTmpWebsite(website);
        setTmpSchool(school);
        setTmpUsername(username);
    }

    return (
        <div className="bg-white flex flex-1 flex-col items-center  animate__slideInBottom">
            <div className="w-2/5 flex flex-col gap-2">
                <div className="flex w-full gap-6">
                    <label className="flex-1">
                        <div>用户名</div>
                        <Input disabled={true} value={tmpUsername} />
                    </label>
                    <CheckboxGroup
                        title={"性别"}
                        selectedValue={tmpGender}
                        onChange={setTmpGender}
                        entries={[{ label: "男性", value: 1 }, { label: "女性", value: 2 }]}>
                    </CheckboxGroup>
                </div>
                {/* <div className="flex w-full gap-6">
                    <label className="flex-1">
                        <div>简介</div>
                        <Input value={brief} onChange={(text) => setTmpForm(prev => ({ ...prev, brief: text }))} />
                    </label>
                </div> */}
                <div className="flex w-full gap-6">
                    <label className="flex-1">
                        <div>学校</div>
                        <Input onChange={setTmpSchool} value={tmpSchool} />
                    </label>
                    <label className="flex-1">
                        <div>个人网站</div>
                        <Input value={tmpWebsite} onChange={setTmpWebsite} />
                    </label>
                </div>
                <div className="flex w-full gap-6 justify-center">
                    <Button type="primary" onClick={handleSubmit} >保存</Button>
                    <Button onClick={() => navigate(`/${id}/profile`)} >取消</Button>
                    <Button type="danger" onClick={handleReset} >重置</Button>
                </div>
            </div>

        </div >
    )
}
export default ProfileEdit;