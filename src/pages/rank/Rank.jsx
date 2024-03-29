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
    const RightHeader = () => {
        return (
            <button className="border p-1 rounded-md text-white bg-blue-400 hover:bg-blue-500">过滤</button>
        )
    }
    return (
        <Card title={"过滤"} rightHeader={<RightHeader />}>
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
        <div className="flex w-3/5 h-full flex-col animate__slideInBottom">
            <Filter />
            <RankTable data={rankData} />
            <Pagination current={curPage} pageNum={pageNum} />
        </div>
    )
}
export default Rank;