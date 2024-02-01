const RankTable = ({ data = [] }) => {

    return (
        <div className="grid grid-cols-5 border-l border-r border-t">
            <div className="border-b p-1">排名</div>
            <div className="border-b p-1">用户名</div>
            <div className="border-b p-1 text-center">题目</div>
            <div className="border-b p-1 text-center">总提交</div>
            <div className="border-b p-1 text-center">通过</div>

            {data.map((datum, idx) => (
                <>
                    <div className={`border-b border-l p-1 `}>{idx + 1}</div>
                    <div className="border-b  p-1">{datum.username}</div>
                    <div className="border-b  p-1 text-center">{datum.relativeProblems}</div>
                    <div className="border-b  p-1 text-center">{datum.submit}</div>
                    <div className="border-b  p-1 text-center">{datum.ac}</div>
                </>
            ))}
        </div>
    )
}
export default RankTable;