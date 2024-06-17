import { useState, useEffect } from "react";
import { ACMRank, IOIRank } from "@/utils/rank";
import { ms2time } from "@/utils/data2text";


const AC = 0;
const JUDGING = 6;
const ProblemItem = ({ problem, type }) => {
    const problemColor = (problem) => {
        if (problem) {
            const colorDepth = Math.min(100 + problem.errNum * 100, 900);
            if (problem.status === AC) {
                return `bg-green-${colorDepth}`
            } else if (problem.status !== JUDGING) {
                return `bg-red-${colorDepth}`
            }
        }
        return "bg-white"
    }

    if (type === "ACM") {
        return (
            <td className={`${problemColor(problem)} border-b p-1 text-center `}>
                {problem && <div>{problem.errNum > 0 ? `+${problem.errNum}` : "+"}</div>}
                {problem && problem.status === AC && <div>{ms2time(problem.acTime)}</div>}
            </td>
        )
    } else {
        return (
            <td className={`${problemColor(problem)} border-b p-1 text-center `}>
                {problem && problem.status !== JUDGING && <div>{problem.passPercent * 100}</div>}
            </td>
        )
    }

}

const RankTable = ({ data, onChangeData, submissions, problems, users, startTime, type = "ACM" }) => {
    useEffect(() => {
        if (submissions.length === 0 || problems.length === 0 || users.length === 0) return;
        let rankData;
        if (type === "ACM") {
            rankData = ACMRank(submissions, problems, users, startTime);
        } else {
            rankData = IOIRank(submissions, problems, users, startTime);
        }
        onChangeData(rankData);
    }, [submissions, problems, users]);
    if (type !== "ACM" && type !== "IOI") {
        console.error("排名类型异常");
        return;
    }
    return (
        <table className="border bg-white">
            <thead>
                <tr>
                    <th className="border-b p-1">排名</th>
                    <th className="border-b p-1">用户名</th>
                    <th className="border-b p-1">通过题数</th>
                    <th className="border-b p-1">总罚时</th>
                    {problems.map((problem, idx) => <th key={idx} className="border-b p-1 text-center bg-slate-100 ">{problem.title}</th>)}
                </tr>

            </thead>
            <tbody>
                {data.map((datum, idx) => (
                    <tr key={idx} className={``}>
                        <td className={`border-b border-l p-1 text-center`}>{idx + 1}</td>
                        <td className="border-b p-1 text-center">{datum.username}</td>
                        <td className="border-b p-1 text-center">{datum.acNum}</td>
                        <td className="border-b p-1 text-center">{ms2time(datum.penalty)}</td>
                        {datum.problems.map((problem, idx2) => (
                            <ProblemItem key={`${idx}-${idx2}`} problem={problem} type={type} />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RankTable;