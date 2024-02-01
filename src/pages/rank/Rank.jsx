import { useState, useEffect } from "react";
import api from './api'
import Pagination from "@/components/Pagination";
import RankTable from "@/components/RankTable";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";


const Filter = ({ onClick }) => {
    const [cond, setCond] = useState({
        username_uid: "",
        group: "",
    })
    return (
        <Card title={"过滤"}>
            <div className="flex gap-5">
                <label className="flex-1">
                    <div>按用户名或UID</div>
                    <Input />
                </label>
                <label className="flex-1">
                    <div>按题目名或编号</div>
                    <Input />
                </label>
            </div>
        </Card>
    )
}

const Rank = () => {
    const [rankData, setRankData] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        const data = [
            {
                userID: 1, username: "1234", relativeProblems: 100, submit: 200, ac: 80
            },
            {
                userID: 2, username: "lyy", relativeProblems: 90, submit: 200, ac: 80
            },
        ]
        setRankData(data);
    }, [])
    return (
        <div className="flex flex-1 flex-col">
            <Filter />
            <RankTable data={rankData} />
            <Pagination current={curPage} pageNum={pageNum} />
        </div>
    )
}
export default Rank;