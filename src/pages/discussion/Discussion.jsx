import Card from "@/components/Card";
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Markdown from "@/components/Markdown";
import api from "./api";
import domainStore from "@/store/domain";
import RichTextEditor from "@/components/RichTextEditor";
import { dateFormat } from "@/utils/data2text";
import userStore from "@/store/user";
import Input from "@/components/Input";


const CommentItem = ({ discussionID, comment, onPushReply, onRemove }) => {
    const { id: domainID } = domainStore();
    const { id: myID, username: myUsername } = userStore();
    const [replies, setReplies] = useState([]);
    const [replyInput, setReplyInput] = useState("");
    const [replying, setReplying] = useState(false);
    useEffect(() => {
        // 顶层评论，需要看有没有回复
        if (comment.floorID === comment.id) {
            api.getReply(domainID, discussionID, comment.id).then(res => {
                if (res.success) {
                    const replies = res.data.replies;
                    console.log(replies)
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
            alert("不能为空");
            return;
        }
        const tmp = replyInput;
        setReplyInput("");
        setReplying(false);
        const res = await api.addComment(domainID, discussionID, tmp, comment.floorID, comment.id);
        if (res.success) {
            const newReply = res.data.comment;
            console.log(newReply);
            handlePushReply(newReply);
        }
    }


    return (
        <div className="flex pt-2 w-full gap-3 border-t">
            <div className="w-full">
                <div className="min-h-16 w-full">
                    <div className="flex gap-3 justify-between">
                        <div className="flex gap-2">
                            <span className="cursor-pointer text-blue-400 hover:text-blue-500">{comment.creatorUsername}</span>
                            {comment.replyUsername !== "" &&
                                <>
                                    <span>回复</span>
                                    <span className="cursor-pointer text-blue-400 hover:text-blue-500">{comment.replyUsername}</span>
                                </>}
                            <div>{dateFormat(comment.createTime)}</div>
                        </div>
                        <div>
                            <button onClick={() => { setReplying(prev => !prev); setReplyInput(""); }}>{replying ? "收起" : "回复"}</button>
                        </div>
                    </div>
                    <RichTextEditor readonly={true} value={comment.content} />
                    {replying &&
                        <div >
                            <div className="flex gap-2 items-center">
                                <div>输入评论</div>
                                <button className="border p-1 rounded-md hover:bg-slate-100" onClick={handleAddReply}>提交</button>
                            </div>
                            <RichTextEditor value={replyInput} onChange={setReplyInput} />
                        </div>
                    }
                </div>
                <div className="pl-16">
                    {replies.map((reply, idx) => (
                        <CommentItem onPushReply={handlePushReply} discussionID={discussionID} comment={reply} key={idx} />
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
            alert("不能为空");
            return;
        }
        const tmp = commentContent;
        setCommentContent("");
        setPublishing(false);
        const res = await api.addComment(domainID, discussionID, tmp);
        if (res.success) {
            const newComment = res.data.comment;
            setComments(prev => [{ ...newComment, creatorID: myID, creatorUsername: myUsername }, ...prev]);
        }
    }
    return (
        <Card className="w-full flex-1" title={`${commentNum}条评论`} rightHeader={
            <button onClick={() => { setPublishing(prev => !prev) }} className={`${publishing ? "bg-slate-400 hover:bg-slate-500" : "bg-blue-400 hover:bg-blue-500"} p-1 border rounded-md text-white  text-lg`}>发表评论</button>
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
                    <CommentItem discussionID={discussionID} key={idx} comment={comment} />
                ))}
            </div>
            <div className="flex justify-center w-full"><button>点击展开更多</button></div>
        </Card>
    )
}

const Discussion = () => {
    const navigate = useNavigate();
    const { id: domainID } = domainStore();
    const { discussionID = null } = useParams();
    const [discussion, setDiscussion] = useState({});

    useEffect(() => {
        if (discussionID === null) {
            alert("不存在该讨论!")
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
        <div className="flex w-3/5 h-full justify-center flex-col">
            <div className="border  w-full flex items-center p-2">
                <div className="font-bold text-xl ">{discussion.title}</div>
                <div className="ml-auto">
                    <button onClick={handleRemove} className="border p-1 rounded-md text-white bg-red-400 hover:bg-red-500">删除讨论</button>
                    <button onClick={() => { navigate(`/discussion/edit/${discussionID}`) }} className="border p-1 rounded-md text-white bg-blue-400 hover:bg-blue-500">编辑</button>
                </div>
            </div>
            <div className="flex flex-col gap-2 border">
                <div className="flex gap-5 items-center p-2">
                    <div>{discussion.creatorUsername}</div>
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