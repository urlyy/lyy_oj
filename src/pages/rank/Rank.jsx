import { useState, useEffect, useRef } from "react";
import api from './api'
import domainStore from "@/store/domain";
import Card from "@/components/Card"
import Input from "@/components/Input"
import Pagination from "@/components/Pagination"
import Button from "@/components/Button";
import Toast from "@/utils/toast";
import { useNavigate } from "react-router-dom";

const Filter = ({ username, onUsernameChange, onFilter }) => {


    return (
        <Card title={"过滤"} rightHeader={<Button type="primary" onClick={onFilter}>过滤</Button>}>
            <div className="flex gap-5">
                <label className="">
                    <div>按用户名</div>
                    <Input value={username} onChange={onUsernameChange} />
                </label>
            </div>
        </Card>
    )
}

const RankTable = ({ data, pageNum, pageSize }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-5 border-l border-r border-t">
            <div className="grid col-span-5 grid-cols-5 border-r border-l">
                <div className="border-b p-1">排名</div>
                <div className="border-b p-1">用户名</div>
                <div className="border-b p-1 text-center">总提交</div>
                <div className="border-b p-1 text-center">答案正确次数</div>
                <div className="border-b p-1 text-center">通过题目</div>
            </div>
            {data.map((datum, idx) => (
                <div key={idx} className="grid col-span-5 grid-cols-5">
                    <div className={`border-b border-l p-1 `}>{(pageNum - 1) * pageSize + idx + 1}</div>
                    <div onClick={() => { navigate(`/${datum.userID}/profile`) }} className="border-b  p-1 cursor-pointer hover:text-blue-400">{datum.username}</div>
                    <div className="border-b  p-1 text-center">{datum.submit}</div>
                    <div className="border-b p-1 text-center">{datum.totalAC}</div>
                    <div className="border-b  p-1 text-center">{datum.ac}</div>
                </div>
            ))}
        </div>
    )
}

const Rank = () => {
    const [rankData, setRankData] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const pageSize = useRef(1);
    const [filterUsername, setFilterUsername] = useState("");

    const { id: domainID } = domainStore();
    const handleGetRank = async (newPage) => {
        setCurPage(newPage);
        const res = await api.getRank(domainID, newPage, filterUsername)
        if (res.success) {
            const { rankData, pageNum, pageSize: size } = res.data;
            setPageNum(pageNum);
            setRankData(rankData);
            pageSize.current = size;
            return true;
        }
        return false;
    }

    useEffect(() => {
        handleGetRank(1);
    }, [])
    const handleFilter = async () => {
        setCurPage(1);
        const res = await handleGetRank(1);
        if (res) {
            Toast("过滤排名数据成功", "success");
        }
    }
    return (
        <div className="flex w-3/5 h-full flex-col animate__slideInBottom">
            <Filter onFilter={handleFilter} username={filterUsername} onUsernameChange={setFilterUsername} />
            <RankTable data={rankData} pageNum={pageNum} pageSize={pageSize.current} />
            <Pagination current={curPage} pageNum={pageNum} />
        </div>
    )
}
export default Rank;