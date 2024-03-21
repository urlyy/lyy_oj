import request from "@/utils/request";

const api = {
    submit: async (domainID, { discussionID = null, title, content }) => {
        const res = await request.postBody(`/discussion?d=${domainID}`, {
            title, content, discussionID
        })
        return res;
    },
    getDiscussion: async (domainID, discussionID) => {
        const res = await request.get(`/discussion/${discussionID}`, { d: domainID });
        return res;
    },
    getDiscussions: async (domainID, pageNum) => {
        const res = await request.get(`/discussion/list`, { d: domainID, page: pageNum });
        return res;
    },
    getComments: async (domainID, discussionID, pageNum) => {
        const res = await request.get(`/discussion/${discussionID}/comment`, {
            d: domainID, page: pageNum
        });
        return res;
    },
    getReply: async (domainID, discussionID, floorID) => {
        const res = await request.get(`/discussion/${discussionID}/comment/${floorID}/reply`, {
            d: domainID, floorID
        });
        return res;
    },
    addComment: async (domainID, discussionID, content, floorID = 0, replyID = 0) => {
        const res = await request.postBody(`/discussion/${discussionID}/comment`, {
            d: domainID, content, replyID, floorID
        });
        return res;
    },
}
export default api;