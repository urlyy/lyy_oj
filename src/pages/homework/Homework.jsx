import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from './api'
import domainStore from "@/store/domain";
import Card from "@/components/Card";
import RichTextEditor from "@/components/RichTextEditor";
import ProblemTable from "@/components/ProblemTable";


const Homework = () => {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState(null);
    const { homeworkID } = useParams();
    const { id: domainID } = domainStore();


    useEffect(() => {
        if (homeworkID !== null) {
            api.get(domainID, homeworkID).then(res => {
                if (res.success) {
                    const homework = res.data.homework;
                    setTitle(homework.title);
                    setDesc(homework.desc);
                    const problemIDs = homework.problemIDs;
                    setProblems(Array.from({ length: problemIDs.length }).fill({}))
                    problemIDs.forEach(async (id, idx) => {
                        const r = await api.getProblem(domainID, id);
                        if (r.success) {
                            const p = r.data.problem;
                            const newProblems = [...problems];
                            newProblems[idx] = p;
                            setProblems(newProblems);
                        }
                    })
                }
            })
        }
    }, [])
    return (
        <div className="flex h-full w-3/5 justify-center">
            <div className="h-full w-full">
                <Card title={title}>
                    {desc && <RichTextEditor readonly={true} value={desc} />}
                    <div className="flex gap-3">
                        <button>查看排名</button>
                        <button onClick={() => { navigate(`/homework/edit/${homeworkID}`) }}>编辑</button>
                    </div>
                </Card>
                <ProblemTable data={problems} />
            </div >
        </div>

    )
}
export default Homework;