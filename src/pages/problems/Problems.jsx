import QuestionTable from "@/components/QuestionTable"
import Pagination from "@/components/Pagination";
import { useState, useEffect } from "react";

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {

    }, [])
    return (
        <div className="flex flex-1 justify-center">
            <div className="h-full w-full">
                <div className="border flex h-10">
                    <input placeholder="搜索" className="flex-1 h-full pl-1" />
                    <button className="h-full p-2 bg-blue-500 text-white">搜</button>
                </div>
                {/* <div className="border">
                    <Pagination current={curPage} pageNum={pageNum} />
                </div> */}


                <QuestionTable />

                <div className="border">
                    <Pagination current={curPage} pageNum={pageNum} />
                </div>
            </div >
        </div>

    )
}
export default Problems;