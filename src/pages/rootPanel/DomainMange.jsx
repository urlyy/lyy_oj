import Card from "@/components/Card"

import { useState } from "react"
import Button from '@/components/Button'
import Input from "@/components/Input"

const DomainManage = () => {
    const [name, setName] = useState("");
    const handleAddDomain = () => {
        console.log(name)
    }
    const handleRemove = (idx) => {
        console.log(name)
    }
    return (
        <Card className="animate__slideInBottom">
            <Input value={name} onChange={setName} />
            <Button>新建域</Button>
        </Card>
    )
}
export default DomainManage;