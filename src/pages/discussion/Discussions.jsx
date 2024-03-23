import Card from "@/components/Card";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom"
import domainStore from "@/store/domain";
import api from "./api";
import { dateFormat } from "@/utils/data2text";

const DiscussionList = ({ data = [] }) => {
    const navigate = useNavigate();

    const handleClick = (discussionID) => {
        navigate(`/discussion/${discussionID}`)
    }


    return (
        <div>
            {data.map((discussion, idx) => (
                <div key={idx} onClick={handleClick.bind(null, discussion.id)} className={`rounded-md  p-2 cursor-pointer flex items-center h-24 gap-2 border-b border-b-slate-200`}>
                    <div className="text-center">
                        <div className="text-3xl">{discussion.commentNum}</div>
                        <div>条评论</div>

                    </div>
                    <div className="flex flex-col justify-between gap-2">
                        <div className="text-xl">{discussion.title}</div>
                        <div className="flex justify-between gap-3">
                            <div>创建于{dateFormat(discussion.createTime)}</div>
                            <div>{discussion.creatorUsername}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const Discussions = () => {
    const { id: domainID } = domainStore();
    const [discussions, setDiscussions] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const navigate = useNavigate();
    const handleGetDiscussions = async (newPage) => {
        setCurPage(newPage);
        api.getDiscussions(domainID, newPage).then(res => {
            if (res.success) {
                const discussions = res.data.discussions;
                setDiscussions(discussions);
            }
        })
    }
    useEffect(() => {
        handleGetDiscussions(1);
    }, [])
    const RightHeader = () => {
        return (
            <button onClick={() => { navigate("/discussion/edit") }} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新建讨论</button>
        )
    }
    return (
        <div className="flex w-3/5 h-full justify-center animate__slideInBottom">
            <div className="w-full h-full ">
                <Card title="讨论广场" rightHeader={<RightHeader />}>
                    <DiscussionList data={discussions} />
                    <Pagination current={curPage} pageNum={pageNum} />
                </Card>
            </div>
        </div>
    )
}
export default Discussions;