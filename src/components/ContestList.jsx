import { useNavigate } from "react-router-dom"

const ContestList = ({ data = [], onClick }) => {
    const navigate = useNavigate();

    const computeStatusColor = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const now = new Date();
        if (start > now) {
            return "bg-slate-400";
        } else if (start <= now && now < end) {
            return "bg-green-400"
        } else if (end >= now) {
            return "bg-red-400"
        }
    }
    const computeTypeColor = (type) => {
        if (type === "OI") {
            return "bg-sky-300";
        } else if (type === "ACM") {
            return "bg-green-400"
        } else {
            return "bg-slate-400"
        }
    }
    const computeDuration = (startStr, endStr) => {
        const duration = (new Date(endStr) - new Date(startStr)) / 1000;
        if (duration >= 3600) {
            return `${(duration / 3600)}小时`
        } else {
            return `${(duration / 60)}分钟`
        }
    }
    return (
        <div>
            {data.map((contest, idx) => (
                <div key={idx} onClick={onClick.bind(null, contest.id)} className="hover:bg-slate-100 cursor-pointer flex items-center h-24 gap-2 border-b border-b-slate-200">
                    <div className={`${computeStatusColor(contest.startTime, contest.endTime)} p-1 rounded-lg flex items-center flex-col text-xl font-bold`}>
                        <div>{contest.startTime.substring(0, 10)}</div>
                        <div>{contest.startTime.substring(11, 16)}</div>
                    </div>
                    <div className="flex flex-col justify-between gap-2">
                        <div className="cursor-pointer text-xl">{contest.title}</div>
                        <div className="flex gap-2">
                            <div className={`${computeTypeColor(contest.type)} p-1 rounded-lg`}>{contest.type}</div>
                            <div className="p-1">{computeDuration(contest.startTime, contest.endTime)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ContestList;