import Card from "@/components/Card";
import Input from "@/components/Input";

const Button = ({ children, onClick = () => { } }) => {
    return (
        <button className="bg-blue-400 hover:bg-blue-500 text-white  p-2 text-lg rounded-lg" onClick={onClick} type="button">{children}</button>
    )
}

const Security = () => {
    return (
        <div className="w-3/5 h-full flex gap-2 animate__slideInBottom">
            <Card className={"flex flex-1 bg-red-100 gap-2"} title={"修改电子邮箱"}>
                <label>
                    <div>当前电子邮箱</div>
                    <Input />
                </label>
                <label>
                    <div>当前密码</div>
                    <Input />
                </label>
                <label>
                    <div>新电子邮箱</div>
                    <Input />
                </label>
                <Button>修改电子邮箱</Button>
            </Card>
            <Card className={"flex gap-2 flex-1"} title={"修改密码"}>
                <label>
                    <div>当前密码</div>
                    <Input />
                </label>
                <label>
                    <div>新密码</div>
                    <Input />
                </label>
                <label>
                    <div>重复密码</div>
                    <Input />
                </label>
                <Button>修改密码</Button>
            </Card>
        </div>
    )
}
export default Security;