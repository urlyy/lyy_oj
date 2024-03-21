import request from "@/utils/request";

const api = {
    submit: async (domainID, { contestID = null, title, desc, type, pub, start, end, participants = [] }) => {
        const res = await request.postBody(`/contest?d=${domainID}`, {
            title, desc, pub, start, end, contestID, type, participants
        })
        return res;
    },
    getHomework: async (domainID, contestID) => {
        const res = await request.get(`/contest/${contestID}`, { d: domainID });
        return res;
    },
    getHomeworks: async (domainID, pageNum) => {
        const res = await request.get(`/contest/list`, { d: domainID, page: pageNum });
        return res;
    }
}
export default api;