import Card from "@/components/Card";
import { useState, useEffect, useRef } from "react";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom"
import domainStore from "@/store/domain";
import api from "./api";
import { dateFormat } from "@/utils/data2text";
import { havePermission, 创建讨论 } from "@/utils/permission";
import Button from "@/components/Button";

const DiscussionList = ({ data = [], listRef }) => {
    const navigate = useNavigate();

    const handleClick = (discussionID) => {
        navigate(`/discussion/${discussionID}`)
    }

    return (
        <div ref={listRef}>
            {data.map((discussion, idx) => (
                <div key={idx} onClick={handleClick.bind(null, discussion.id)} className={`hover:bg-slate-100 rounded-md  p-2 cursor-pointer flex items-center h-24 gap-2 border-b border-b-slate-200`}>
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
    const { id: domainID, permission } = domainStore();
    const [discussions, setDiscussions] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const inited = useRef(false);
    const listRef = useRef(null);
    const navigate = useNavigate();

    const handleGetDiscussions = async (newPage) => {
        listRef.current.classList.remove("animate__slideInBottom")
        setCurPage(newPage);
        const res = await api.getDiscussions(domainID, newPage)
        if (res.success) {
            const { discussions, pageNum } = res.data;
            if (inited.current) {
                listRef.current.classList.add("animate__slideInBottom");
            }
            setDiscussions(discussions);
            setPageNum(pageNum);
        }
    }
    useEffect(() => {
        handleGetDiscussions(1).then(_ => inited.current = true);
    }, [])
    const RightHeader = () => {
        return (
            <>
                {havePermission(permission, 创建讨论) && <Button type="success" onClick={() => { navigate("/discussion/edit") }} className="border p-1 rounded-md text-white bg-green-500 hover:bg-green-600">新建讨论</Button>}
            </>
        )
    }
    return (
        <div className="bg-white flex w-3/5 h-full justify-center animate__slideInBottom">
            <div className="w-full h-full ">
                <Card title="讨论广场" rightHeader={<RightHeader />}>
                    <DiscussionList listRef={listRef} data={discussions} />
                    <Pagination onChange={(page) => handleGetDiscussions(page)} current={curPage} pageNum={pageNum} />
                </Card>
            </div>
        </div>
    )
}
export default Discussions;