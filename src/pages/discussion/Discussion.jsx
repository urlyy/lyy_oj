import Card from "@/components/Card";
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import api from "./api";
import domainStore from "@/store/domain";
import RichTextEditor from "@/components/RichTextEditor";
import { dateFormat } from "@/utils/data2text";
import userStore from "@/store/user";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { havePermission, 删除其他人的讨论, 删除其他人的评论 } from "@/utils/permission";
import Alert from "@/utils/alert";
import Toast from "@/utils/toast";


//虽然是递归，但其实只有两层
const CommentItem = ({ discussionID, comment, onPushReply, onRemove }) => {
    const navigate = useNavigate();
    const [replies, setReplies] = useState([]);
    const [replyInput, setReplyInput] = useState("<p></p>");
    const [replying, setReplying] = useState(false);
    const { id: domainID, permission } = domainStore();
    const { id: myID, username: myUsername } = userStore();

    useEffect(() => {
        // 顶层评论，需要看有没有回复
        if (comment.floorID === comment.id) {
            console.log(comment)
            api.getReply(domainID, discussionID, comment.id).then(res => {
                if (res.success) {
                    const replies = res.data.replies;
                    setReplies(replies);
                }
            })
        }
    }, [])

    const handlePushReply = (reply) => {
        if (comment.floorID === comment.id) {
            setReplies(prev => [{ ...reply, creatorID: myID, creatorUsername: myUsername }, ...prev]);
        } else {
            onPushReply(reply);
        }
    }

    const handleAddReply = async () => {
        if (replyInput === "") {
            Alert("内容不能为空");
            return;
        }
        const tmp = replyInput;
        setReplyInput("");
        setReplying(false);
        const res = await api.addComment(domainID, discussionID, tmp, comment.floorID, comment.id);
        if (res.success) {
            Toast("评论成功");
            const newReply = res.data.comment;
            newReply.replyUsername = comment.creatorUsername;
            newReply.replyUserID = comment.creatorID;
            handlePushReply(newReply);
        }
    }


    const handleRemove = async () => {
        Alert("确定删除吗?", <></>, async () => {
            const res = await api.removeComment(domainID, discussionID, comment.id);
            if (res.success) {
                onRemove(comment.id);
                Toast("删除成功");
            }
        }, true)
    }
    return (
        <div className="bg-white flex pt-2 w-full gap-3 border-t">
            <div className="w-full">
                <div className="min-h-16 w-full">
                    <div className="flex gap-3 justify-between">
                        <div className="flex gap-2">
                            <button onClick={() => { navigate(`/${comment.creatorID}/profile`) }} className=" text-blue-400 hover:text-blue-500">{comment.creatorUsername}</button>
                            {comment.replyID !== comment.floorID &&
                                <>
                                    <span >回复</span>
                                    <button onClick={() => { navigate(`/${comment.replyUserID}/profile`) }} className="cursor-pointer text-blue-400 hover:text-blue-500">{comment.replyUsername}</button>
                                </>}
                            <div>{dateFormat(comment.createTime)}</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setReplying(prev => !prev); setReplyInput(""); }}>{replying ? "收起" : "回复"}</button>
                            {(myID === comment.creatorID || havePermission(permission, 删除其他人的评论)) && <button className="text-red-500 hover:text-red-600" onClick={handleRemove.bind(null, comment.id)}>删除</button>}
                        </div>
                    </div>
                    <RichTextEditor readonly={true} value={comment.content} />
                    {replying &&
                        <div >
                            <div className="flex gap-2 items-center">
                                <div>输入评论</div>
                                <Button type="primary" onClick={handleAddReply}>提交</Button>
                            </div>
                            <RichTextEditor value={replyInput} onChange={setReplyInput} />
                        </div>
                    }
                </div>
                <div className="pl-16">
                    {replies.map((reply, _) => (
                        <CommentItem key={comment.id} onRemove={(id) => setReplies(prev => prev.filter((c, _) => c.id !== id))} onPushReply={handlePushReply} discussionID={discussionID} comment={reply} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const CommentArea = ({ discussionID, commentNum }) => {
    const { id: domainID } = domainStore();
    const { id: myID, username: myUsername } = userStore();
    const [comments, setComments] = useState([]);
    const [curPage, setCurPage] = useState(1);
    // const [noMore, setNoMore] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [commentContent, setCommentContent] = useState("<p></p>");
    const handleGetComments = async (newPage) => {
        setCurPage(newPage);
        const res = await api.getComments(domainID, discussionID, curPage);
        if (res.success) {
            const comments = res.data.comments;
            setComments(comments);
        }
    }
    useEffect(() => {
        if (discussionID) {
            handleGetComments(1);
        }
    }, [discussionID]);

    const handleAddComment = async () => {
        if (commentContent === "") {
            Alert("内容不能为空");
            return;
        }
        const tmp = commentContent;
        setCommentContent("");
        setPublishing(false);
        const res = await api.addComment(domainID, discussionID, tmp);
        if (res.success) {
            Toast("回复成功");
            const newComment = res.data.comment;
            setComments(prev => {
                console.log([{ ...newComment, creatorID: myID, creatorUsername: myUsername }, ...prev])
                return [{ ...newComment, creatorID: myID, creatorUsername: myUsername }, ...prev]
            });
        }
    }


    return (
        <Card className="w-full flex-1" title={`${commentNum}条评论`} rightHeader={
            <button onClick={() => { setPublishing(prev => !prev) }} className={`bg-blue-400 hover:bg-blue-500 p-1 border rounded-md text-white  text-lg`}>{publishing ? "收起" : "发表评论"}</button>
        }>
            {publishing &&
                <div>
                    <div className="flex gap-2 items-center">
                        <div>输入评论</div>
                        <button className="border p-1 rounded-md hover:bg-slate-100" onClick={handleAddComment}>提交</button>
                    </div>
                    <RichTextEditor value={commentContent} onChange={setCommentContent} />

                </div>}
            <div className="w-full border-b">
                {comments.map((comment, idx) => (
                    <CommentItem key={comment.id} onRemove={(id) => setComments(prev => prev.filter((c, _) => c.id !== id))} discussionID={discussionID} comment={comment} />
                ))}
            </div>
            {/* <div className="flex justify-center w-full"><button>点击展开更多</button></div> */}
        </Card>
    )
}

const Discussion = () => {
    const navigate = useNavigate();
    const { discussionID = null } = useParams();
    const [discussion, setDiscussion] = useState({});
    const { id: domainID, permission } = domainStore();
    const { id: myID } = userStore();

    useEffect(() => {
        if (discussionID === null) {
            Toast("不存在该讨论!")
            navigate("/discussions")
        } else {
            api.getDiscussion(domainID, discussionID).then(res => {
                if (res.success) {
                    const discussion = res.data.discussion;
                    setDiscussion(discussion);
                }
            })
        }

    }, []);

    const handleRemove = async () => {
        const res = await api.remove(domainID, discussionID);
        if (res.success) {
            navigate("/discussions")
        }
    }

    return (
        <div className="flex w-3/5 h-full justify-center flex-col animate__slideInBottom">
            <div className="border  w-full flex items-center p-2">
                <div className="font-bold text-xl ">{discussion.title}</div>
                <div className="ml-auto">
                    {(myID === discussion.creatorID || havePermission(permission, 删除其他人的讨论)) && <Button onClick={handleRemove} type="danger" >删除讨论</Button>}
                    {myID === discussion.creatorID && <Button type="primary" onClick={() => { navigate(`/discussion/edit/${discussionID}`) }}>编辑</Button>}
                </div>
            </div>
            <div className="flex flex-col gap-2 border">
                <div className="flex gap-5 items-center p-2">
                    <button onClick={() => { navigate(`/${discussion.creatorID}/profile`) }} className="hover:text-blue-400" >{discussion.creatorUsername}</button>
                    <div>{dateFormat(discussion.createTime)}</div>
                </div>
                <div className="p-2 w-full">
                    {discussion.content && <RichTextEditor readonly={true} value={discussion.content} />}
                </div>
            </div>
            <CommentArea commentNum={discussion.commentNum} discussionID={discussionID} />
        </div>
    )
}
export default Discussion;