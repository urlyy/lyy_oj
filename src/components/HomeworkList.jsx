const HomeworkList = ({ data = [], onClick = () => { } }) => {
    const computeStatusColor = (finished, expire) => {
        if (finished) {
            return "bg-green-200 hover:bg-green-300";
        } else if (expire) {
            return "bg-red-200 hover:bg-red-300"
        } else {
            return "bg-slate-200 hover:bg-slate-300";
        }
    }
    const computeStatusText = (finished, expire) => {
        if (finished) {
            return "已完成";
        } else if (!expire) {
            return "待完成";
        } else {
            return "已过期";
        }
    }
    return (
        <div>
            {data.map((homework, idx) => (
                <div key={idx} onClick={onClick} className={`rounded-md  p-2 ${computeStatusColor(homework.finished, false)} cursor-pointer flex justify-between items-center h-24 gap-2 border-b border-b-slate-200`}>
                    <div className="flex flex-col justify-between gap-2">
                        <div className="text-xl">{homework.name}</div>
                        <div>{homework.startTime} ~ {homework.endTime}</div>
                    </div>
                    <div>
                        {computeStatusText(homework.finished, false)}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default HomeworkList;