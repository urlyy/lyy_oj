import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from './api'
import domainStore from "@/store/domain";
import Card from "@/components/Card";
import RichTextEditor from "@/components/RichTextEditor";
import Button from "@/components/Button";
import RankTable from "@/components/RankTable";
import ProblemTable from "@/components/ProblemTable"
import { exportRank } from "@/utils/rank";
import { havePermission, 修改作业 } from "@/utils/permission";

const Rank = ({ homeworkID, problems, startTime, rankData, onChangeRankData }) => {
    const [submissions, setSubmissions] = useState([]);
    const [users, setUsers] = useState([]);
    // const [curPage, setCurPage] = useState(1);
    // const [pageNum, setPageNum] = useState(1);
    const { id: domainID } = domainStore();
    useEffect(() => {
        api.getSubmissions(domainID, homeworkID).then(res => {
            if (res.success) {
                // console.log(res.data.submissions);
                setSubmissions(res.data.submissions);
            }
        });
        api.getUsers(domainID).then(res => {
            if (res.success) {
                setUsers(res.data.users);
            }
        })
    }, [])
    return (
        <div className="flex flex-col">
            <RankTable data={rankData} onChangeData={onChangeRankData} type={"IOI"} startTime={startTime} submissions={submissions} problems={problems} users={users} />
        </div>
    )
}


const Homework = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState(null);
    const { homeworkID } = useParams();
    const [problems, setProblems] = useState([]);
    const [pageType, setPageType] = useState("p");
    const [startTime, setStartTime] = useState(null);
    const [rankData, setRankData] = useState([]);

    const { id: domainID, permission } = domainStore();

    useEffect(() => {
        if (homeworkID !== null) {
            api.get(domainID, homeworkID).then(res => {
                if (res.success) {
                    const homework = res.data.homework;
                    setTitle(homework.title);
                    setDesc(homework.desc);
                    setStartTime(homework.startTime);
                    setProblems(Array.from({ length: homework.problemIDs.length }).fill({}));
                    homework.problemIDs.forEach(async (id, idx) => {
                        const r = await api.getProblem(domainID, id);
                        if (r.success) {
                            const p = r.data.problem;
                            setProblems(prev => {
                                const newProblems = [...prev];
                                newProblems[idx] = p;
                                return newProblems;
                            });
                        }
                    })
                }
            })
        }
    }, [])

    const handleExportRank = () => {
        exportRank(rankData, problems, "IOI");
    }
    return (
        <div className="bg-white flex h-full w-3/5 justify-center  animate__slideInBottom">
            <div className="h-full w-full">
                <Card title={title}>
                    {desc && <RichTextEditor readonly={true} value={desc} />}
                    <div className="flex gap-3">
                        {pageType === "p" && <Button type="success" onClick={setPageType.bind(null, "r")}>查看排名</Button>}
                        {pageType === "r" && <>
                            <Button type="success" onClick={setPageType.bind(null, "p")}>返回题目</Button>
                            <Button onClick={handleExportRank}>导出排名</Button>
                        </>}
                        {havePermission(permission, 修改作业) && <Button Button type="primary" onClick={() => { navigate(`/homework/edit/${homeworkID}`) }}>编辑</Button>}
                    </div>
                </Card>
                {pageType === "p" && <ProblemTable data={problems} situationType="homework" situationID={homeworkID} />}
                {pageType === "r" && <Rank rankData={rankData} onChangeRankData={setRankData} startTime={startTime} problems={problems} homeworkID={homeworkID} onChangePageType={setPageType} />}
            </div >
        </div >

    )
}
export default Homework;