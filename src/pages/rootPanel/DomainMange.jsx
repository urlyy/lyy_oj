import Card from "@/components/Card"

import { useState } from "react"
import Button from '@/components/Button'
import Input from "@/components/Input"
import Alert from "@/utils/alert"

const DomainManage = () => {
    const [name, setName] = useState("");
    const handleAddDomain = () => {
        console.log(name)
        if (name === "") {
            Alert("域名不能为空")
            return;
        }
        if (name === "ROOT") {
            Alert("域名不能为ROOT");
            return;
        }

    }

    return (
        <Card className="animate__slideInBottom">
            <label>
                <span className="text-lg">域名</span>
                <Input value={name} onChange={setName} />
            </label>
            <div className="mt-2">
                <Button type="primary">提交创建</Button>
            </div>
        </Card>
    )
}
export default DomainManage;