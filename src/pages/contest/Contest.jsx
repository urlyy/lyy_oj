import QuestionTable from "@/components/ProblemTable"
import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import RichTextEditor from "@/components/RichTextEditor";
import api from "./api";

const Contest = () => {
    const navigate = useNavigate();
    const [problems, setProblems] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const { contestID } = useParams();
    const { id: domainID } = domainStore();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState(null);


    useEffect(() => {
        api.get(domainID, contestID).then(res => {
            if (res.success) {
                const contest = res.data.contest;
                setTitle(contest.title);
                setDesc(contest.desc);
                const problemIDs = contest.problemIDs;
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

    }, [])
    return (
        <div className="flex h-full w-3/5 justify-center">
            <div className="h-full w-full">
                <Card title={title}>
                    {desc && <RichTextEditor readonly={true} value={desc} />}
                    <div className="flex gap-3">
                        <button>查看排名</button>
                        <button onClick={() => { navigate(`/contest/edit/${contestID}`) }}>编辑</button>
                    </div>
                </Card>
                <QuestionTable data={problems} />
            </div >
        </div>

    )
}
export default Contest;