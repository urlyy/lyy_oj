import { useNavigate } from 'react-router-dom'
import { diff2text } from '@/utils/data2text';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import request from '@/utils/request';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import Pagination from './Pagination';
import domainStore from '@/store/domain';
import Toast from '@/utils/toast';

const listProblem = async (domainID, page = 1, title, diff) => {
    const res = await request.get(`/problem/list`, { d: domainID, page, keyword: title, diff, flag: true });
    return res;
}

const ProblemSelectModal = ({ onAdd, alreadyIn = [], onClose, className = "" }) => {
    const navigate = useNavigate();
    const [pageNum, setPageNum] = useState(1);
    const [curPage, setCurPage] = useState(1);
    const [problems, setProblems] = useState([]);
    const [title, setTitle] = useState("");
    const [diff, setDiff] = useState(0);
    const { id: domainID } = domainStore();
    const handleGetProblems = async (newPage) => {
        setCurPage(newPage);
        const res = await listProblem(domainID, newPage, title, diff);
        if (res.success) {
            const { problems, pageNum } = res.data;
            setProblems(problems);
            setPageNum(pageNum);
            return true;
        }
        return false;
    }
    useEffect(() => {
        handleGetProblems(1);
    }, [])
    const handleFilter = async () => {
        setCurPage(1);
        const res = await handleGetProblems(1);
        if (res) {
            Toast("查询成功");
        }
    }
    const handleAdd = async (idx) => {
        const p = problems[idx];
        console.log(p)
        onAdd(p.id, p.title);
        Toast("添加问题成功", "success");
    }
    return (
        <>
            <Modal onClose={onClose}>
                <div className='flex gap-2 mb-2 items-end'>
                    <label>
                        <span>标题</span>
                        <Input value={title} onChange={setTitle} />
                    </label>
                    <label>
                        <span>难度</span>
                        <Select entries={[
                            ["全部", 0],
                            [diff2text(1), 1],
                            [diff2text(2), 2],
                            [diff2text(3), 3],
                        ]} selectedValue={diff} onChange={(str) => setDiff(parseInt(str))} className={`w-full`} />
                    </label>
                    <Button type='primary' onClick={handleFilter} >查询</Button>
                </div>
                <table className={`${className} w-full`}>
                    <tr className="border hover:bg-slate-100">
                        <th className="p-1 text-center">编号</th>
                        <th className="p-1 text-center">题目</th>
                        <th className="p-1 text-center">AC/尝试</th>
                        <th className="p-1 text-center">难度</th>
                        <th className="p-1 text-center">操作</th>
                    </tr>
                    {problems.map((datum, idx) => (
                        <tr key={idx} className="border">
                            <td className="p-1 text-center">{datum.id}</td>
                            <td onClick={() => navigate(`/problem/${datum.id}`)} className=" text-center hover:text-blue-400 cursor-pointer p-1">{datum.title}</td>
                            <td className="p-1 text-center">{datum.acNum}/{datum.submitNum}</td>
                            <td className="p-1 text-center">{diff2text(datum.diff)}</td>
                            {!alreadyIn.includes(datum.id) && <td className='flex justify-center'>
                                <Button type='primary' onClick={handleAdd.bind(null, idx)}>添加</Button>
                            </td>}
                        </tr>
                    ))}
                </table>
                <div className="border">
                    <Pagination onChange={handleGetProblems} current={curPage} pageNum={pageNum} />
                </div>
            </Modal>
        </>


    )
}
export default ProblemSelectModal;