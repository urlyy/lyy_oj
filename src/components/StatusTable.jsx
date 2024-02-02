import { useNavigate } from "react-router-dom"


const StatusTable = ({ data = [] }) => {
    const navigate = useNavigate();
    const computeStatusColor = (status) => {
        if (status === "Accepted") {
            return "text-green-500  border-l-green-500"
        } else if (status.includes("Wrong")) {
            return "text-red-500 border-l-red-500"
        }
    }
    return (
        <div className="grid grid-cols-7 border-l border-r border-t">
            <div className="col-span-7 grid grid-cols-7">
                <div className="border-b p-1">状态</div>
                <div className="border-b p-1">题目</div>
                <div className="border-b p-1 text-center">提交者</div>
                <div className="border-b p-1 text-center">时间</div>
                <div className="border-b p-1 text-center">内存</div>
                <div className="border-b p-1 text-center">语言</div>
                <div className="border-b p-1 text-center">提交时间</div>
            </div>

            {data.map((item, idx) => (
                <div key={idx} onClick={() => { navigate(`/status/${item.id}`) }} className="hover:bg-slate-100 cursor-pointer col-span-7 grid grid-cols-7">
                    <div className={`border-b border-l p-1 ${computeStatusColor(item.status)}`}>{item.status}</div>
                    <div className="border-b  p-1">{item.problemName}</div>
                    <div className="border-b  p-1 text-center">{item.submitterName}</div>
                    <div className="border-b  p-1 text-center">{item.spendTime}</div>
                    <div className="border-b  p-1 text-center">{item.spendMemory}</div>
                    <div className="border-b  p-1 text-center">{item.lang}</div>
                    <div className="border-b  p-1 text-center">{item.submitTime}</div>
                </div>
            ))}
        </div>
    )
}
export default StatusTable;