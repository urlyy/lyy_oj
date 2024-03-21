import { useNavigate } from 'react-router-dom'
import { diff2text } from '@/utils/data2text';

const QuestionTable = ({ data = [] }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-4 border-l border-r border-t">
            <div className="col-span-4  border-b grid grid-cols-4">
                <div className="p-1">序号</div>
                <div className="p-1">题目</div>
                <div className="p-1 text-center">AC/尝试</div>
                <div className="p-1 text-center">难度</div>
            </div>
            {data.map((datum, idx) => (
                <div key={idx} className="col-span-4 border-b grid grid-cols-4">
                    <div className="p-1">{idx + 1}</div>
                    <div onClick={() => { navigate(`/problem/${datum.id}`) }} className="hover:text-blue-400 cursor-pointer p-1">{datum.title}</div>
                    <div className="p-1 text-center">{datum.ac}/{datum.submit}</div>
                    {/* <div className="p-1 text-center">{datum.ac}/{datum.submit}</div> */}
                    <div className="p-1 text-center">{diff2text(datum.diff)}</div>
                </div>
            ))}
        </div>
    )
}
export default QuestionTable;