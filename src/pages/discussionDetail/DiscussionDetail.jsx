import Card from "@/components/Card";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Markdown from "@/components/Markdown";

const CommentItem = ({ comment }) => {
    const isComment = () => {
        return comment.reply != undefined;
    }
    return (
        <div className="flex pt-2 w-full gap-3 border-t">
            <img className="w-16 h-16 rounded-full mb-2" />
            <div className="w-full">
                <div className="min-h-16 w-full">
                    <div className="flex gap-3 justify-between">
                        <div>
                            <div>{comment.username}</div>
                            <div>{comment.createTime}</div>
                        </div>
                        <div>
                            <button>评论</button>
                        </div>
                    </div>
                    <div>{comment.content}</div>
                </div>

                {isComment() && comment.reply.map((reply, idx) => (

                    <CommentItem comment={reply} key={idx} />


                ))}
            </div>
        </div>
    )
}

const CommentArea = () => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const data = [
            { id: 1, username: "刘宇阳", userID: 1, content: "1234", avatar: "1234", createTime: "2022-10-10 10:00", reply: [] },
            {
                id: 2, username: "刘宇阳", userID: 1, content: "666", avatar: "1234", createTime: "2022-10-10 11:00", reply: [{
                    id: 2, username: "刘宇阳", userID: 1, content: "666", avatar: "1234", createTime: "2022-10-10 11:00"
                }]
            }
        ]
        setComments(data);
    }, []);
    return (
        <Card className="w-full flex-1" title={`${comments.length}条评论`}>
            <div className="w-full border-b">
                {comments.map((comment, idx) => (
                    <CommentItem key={idx} comment={comment} />
                ))}
            </div>
            <div className="flex justify-center w-full"><button>点击展开更多</button></div>
        </Card>
    )
}

const DiscussionDetail = () => {
    const { discussionID } = useParams();
    const [discussion, setDiscussion] = useState({});
    useEffect(() => {
        const data = {
            title: "这是一个好标题",
            content: "一堆html,用md吧",
            createTime: "2022-10-11 10:00",
            creatorID: 1,
            creatorUsername: "刘宇阳",
            creatorAvatar: "1234"
        }
        setDiscussion(data);
    }, []);

    return (
        <div className="flex w-3/5 h-full justify-center flex-col">
            <div className="border  w-full flex items-center p-2">
                <div className="font-bold text-xl ">{discussion.title}</div>
                <div className="ml-auto">
                    <button className="border p-1 rounded-md text-white bg-red-500 hover:bg-red-600">删除讨论</button>
                </div>
            </div>
            <div className="flex flex-col gap-2 border">
                <div className="flex gap-5 items-center p-2">
                    <img className="w-10 h-10" />
                    <div>{discussion.creatorUsername}</div>
                    <div>{discussion.createTime}</div>
                </div>
                <div className="p-2 w-full">
                    <Markdown content={discussion.content} />
                </div>

            </div>
            <CommentArea />
        </div>
    )
}
export default DiscussionDetail;