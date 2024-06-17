import { useNavigate } from 'react-router-dom'
import { diff2text } from '@/utils/data2text';

const ProblemTable = ({ tableRef, data = [], situationType, situationID, className = "" }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        if (situationType) {
            navigate(`/problem/${id}/${situationType}/${situationID}`);
        } else {
            navigate(`/problem/${id}`);
        }
    }
    return (
        <div ref={tableRef} className={`${className} grid grid-cols-4 border-l border-r border-t`}>
            <div className="col-span-4  border-b grid grid-cols-4">
                <div className="p-1  text-center">编号</div>
                <div className="p-1  text-center">题目</div>
                <div className="p-1 text-center">AC/尝试</div>
                <div className="p-1 text-center">难度</div>
            </div>
            {data.map((datum, idx) => (
                <div key={idx} className="col-span-4 border-b grid grid-cols-4">
                    <div className="p-1  text-center">{datum.id}</div>
                    <div onClick={() => handleClick(datum.id)} className=" text-center hover:text-blue-400 cursor-pointer p-1">{datum.title}</div>
                    <div className="p-1 text-center">{datum.acNum}/{datum.submitNum}</div>
                    {/* <div className="p-1 text-center">{datum.ac}/{datum.submit}</div> */}
                    <div className="p-1 text-center">{diff2text(datum.diff)}</div>
                </div>
            ))}
        </div>
    )
}
export default ProblemTable;