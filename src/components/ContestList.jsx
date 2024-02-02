import { useNavigate } from "react-router-dom"

const ContestList = ({ data = [], onClick }) => {
    const navigate = useNavigate();
    const computeStatusColor = (status) => {
        if (status === 0) {
            return "bg-slate-400";
        } else if (status === 1) {
            return "bg-green-400"
        } else if (status === 2) {
            return "bg-red-400"
        }
    }
    const computeTypeColor = (type) => {
        if (type === "IO") {
            return "bg-sky-300";
        } else if (type === "ACM") {
            return "bg-green-400"
        } else {
            return "bg-slate-400"
        }
    }
    return (
        <div>
            {data.map((contest, idx) => (
                <div key={idx} onClick={onClick.bind(null, contest.id)} className="hover:bg-slate-100 cursor-pointer flex items-center h-24 gap-2 border-b border-b-slate-200">
                    <div className={`${computeStatusColor(contest.status)} p-1 rounded-lg flex items-center flex-col text-xl font-bold`}>
                        <div>{contest.startTime.substring(0, 10)}</div>
                        <div>{contest.startTime.substring(11, 16)}</div>
                    </div>
                    <div className="flex flex-col justify-between gap-2">
                        <div className="cursor-pointer text-xl">{contest.name}</div>
                        <div className="flex gap-2">
                            <div className={`${computeTypeColor(contest.type)} p-1 rounded-lg`}>{contest.type}</div>
                            <div className="p-1">{contest.duration}</div>
                            <div className="p-1">{contest.participant}人参加</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ContestList;