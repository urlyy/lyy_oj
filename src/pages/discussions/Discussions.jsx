import Card from "@/components/Card";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom"

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
                        <div className="text-xl">{discussion.name}</div>
                        <div className="flex justify-between gap-3">
                            <div>创建于{discussion.createTime}</div>
                            <div>{discussion.creatorUsername}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        const data = [
            { id: 1, name: "这个代码有什么问题吗?", createTime: "2024-01-01 14:00", commentNum: 3, creatorID: 1, creatorUsername: "lyy" },
            { id: 2, name: "环境搭建不起来", createTime: "2024-01-02 14:00", commentNum: 5, creatorID: 1, creatorUsername: "lyy" },
        ]
        setDiscussions(data);
    }, [])
    const RightHeader = () => {
        return (
            <button className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新建讨论</button>
        )
    }
    return (
        <div className="flex w-3/5 h-full justify-center">
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