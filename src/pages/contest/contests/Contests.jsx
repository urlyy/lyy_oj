import Card from "@/components/Card";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import ContestList from "@/components/ContestList";
import { useNavigate } from "react-router-dom"
import api from '../api'
import domainStore from "@/store/domain";
const Contests = () => {
    const { id: domainID } = domainStore();
    const [contests, setContests] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const navigate = useNavigate();
    const handleGetHomeworks = async (newPage) => {
        setCurPage(newPage);
        const res = await api.getHomeworks(domainID, newPage);
        if (res.success) {
            const contests = res.data.contests;
            setContests(contests);
        }
    }
    useEffect(() => {
        handleGetHomeworks(1);
    }, [])
    const RightHeader = () => {
        return (
            <button onClick={() => { navigate(`/contest/edit`) }} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新建测验</button>
        )
    }
    return (
        <div className="h-full w-3/5 flex justify-center animate__slideInBottom">
            <Card className="w-full h-full " title="所有测验" rightHeader={<RightHeader />}>
                <ContestList data={contests} onClick={(contestID) => { console.log(contestID); navigate(`/problems/contest/${contestID}`) }} />
                <Pagination current={curPage} pageNum={pageNum} />
            </Card>
        </div>
    )
}
export default Contests;