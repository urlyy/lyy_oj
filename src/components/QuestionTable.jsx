const QuestionTable = ({ data = [] }) => {
    return (
        <div className="grid grid-cols-4 border-l border-r border-t">
            <div className="border-b p-1">题目编号</div>
            <div className="border-b p-1">题目</div>
            <div className="border-b p-1 text-center">AC/尝试</div>
            <div className="border-b p-1 text-center">难度</div>

            <div className="border-b  p-1">1</div>
            <div className="border-b  p-1">第一个题目</div>
            <div className="border-b  p-1 text-center">1/2</div>
            <div className="border-b  p-1 text-center">EASY</div>

            <div className="border-b  p-1">2</div>
            <div className="border-b  p-1">第二个题目</div>
            <div className="border-b  p-1 text-center">0/0</div>
            <div className="border-b  p-1 text-center">HARD</div>
        </div>
    )
}
export default QuestionTable;