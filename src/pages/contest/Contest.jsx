import ProblemTable from "@/components/ProblemTable"
import { useState, useEffect, useMemo } from "react";
import domainStore from "@/store/domain";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import RichTextEditor from "@/components/RichTextEditor";
import api from "./api";
import Button from "@/components/Button";
import RankTable from "@/components/RankTable";
import { havePermission, 修改比赛 } from "@/utils/permission";

import { exportRank } from "@/utils/rank";


const Rank = ({ contestID, problems, type, startTime, rankData, onChangeRankData }) => {
    const [submissions, setSubmissions] = useState([]);
    const [users, setUsers] = useState([]);
    // const [curPage, setCurPage] = useState(1);
    // const [pageNum, setPageNum] = useState(1);
    const { id: domainID } = domainStore();
    useEffect(() => {
        api.getSubmissions(domainID, contestID).then(res => {
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
            <RankTable data={rankData} onChangeData={onChangeRankData} type={type} startTime={startTime} submissions={submissions} problems={problems} users={users} />
        </div>
    )
}

const Contest = () => {
    const navigate = useNavigate();
    const { id: domainID, permission } = domainStore();
    const { contestID } = useParams();
    const [problems, setProblems] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState(null);
    const [type, setType] = useState(null);
    const [pageType, setPageType] = useState("p");
    const [startTime, setStartTime] = useState(null);
    const [rankData, setRankData] = useState([]);

    useEffect(() => {
        (async () => {
            const { data, success } = await api.get(domainID, contestID);
            if (success) {
                const contest = data.contest;
                setTitle(contest.title);
                setDesc(contest.desc);
                setType(contest.type);
                setStartTime(contest.startTime);
                setProblems(Array.from({ length: contest.problemIDs.length }).fill({}));
                contest.problemIDs.forEach(async (id, idx) => {
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
        })()
    }, []);
    const handleExportRank = () => {
        // console.log(rankData);
        exportRank(rankData, problems, type);
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
                        {havePermission(permission, 修改比赛) && <Button Button type="primary" onClick={() => { navigate(`/contest/edit/${contestID}`) }}>编辑</Button>}
                    </div>
                </Card>
                {pageType === "p" && <ProblemTable data={problems} situationType="contest" situationID={contestID} />}
                {pageType === "r" && <Rank rankData={rankData} onChangeRankData={setRankData} startTime={startTime} type={type} problems={problems} contestID={contestID} onChangePageType={setPageType} />}
            </div >
        </div >
    )
}
export default Contest;