const StatusTable = ({ data = [] }) => {
    const computeStatusColor = (status) => {
        if (status === "Accepted") {
            return "text-green-500  border-l-green-500"
        } else if (status.includes("Wrong")) {
            return "text-red-500 border-l-red-500"
        }
    }
    return (
        <div className="grid grid-cols-7 border-l border-r border-t">
            <div className="border-b p-1">状态</div>
            <div className="border-b p-1">题目</div>
            <div className="border-b p-1 text-center">提交者</div>
            <div className="border-b p-1 text-center">时间</div>
            <div className="border-b p-1 text-center">内存</div>
            <div className="border-b p-1 text-center">语言</div>
            <div className="border-b p-1 text-center">提交时间</div>

            <div className={`border-b border-l p-1 ${computeStatusColor('Accepted')}`}>Accepted</div>
            <div className="border-b  p-1">第一个题目</div>
            <div className="border-b  p-1 text-center">urlyy</div>
            <div className="border-b  p-1 text-center">5ms</div>
            <div className="border-b  p-1 text-center">376KB</div>
            <div className="border-b  p-1 text-center">C++</div>
            <div className="border-b  p-1 text-center">2023-10-12 10:00</div>

            <div className={`border-b border-l  p-1 ${computeStatusColor('80 Wrong')}`}>80 Wrong</div>
            <div className="border-b  p-1">第二个题目</div>
            <div className="border-b  p-1 text-center">urlyy</div>
            <div className="border-b  p-1 text-center">5ms</div>
            <div className="border-b  p-1 text-center">376KB</div>
            <div className="border-b  p-1 text-center">C++</div>
            <div className="border-b  p-1 text-center">2023-10-12 10:00</div>

        </div>
    )
}
export default StatusTable;