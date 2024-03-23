import request from "@/utils/request";

const api = {
    add: async (domainID, { contestID = null, title, desc, type, pub, start, end, problemIDs }) => {
        const res = await request.postBody(`/contest?d=${domainID}`, {
            title, desc, pub, start, end, contestID, type, problemIDs
        })
        return res;
    },
    get: async (domainID, contestID) => {
        const res = await request.get(`/contest/${contestID}`, { d: domainID });
        return res;
    },
    list: async (domainID, pageNum) => {
        const res = await request.get(`/contest/list`, { d: domainID, page: pageNum });
        return res;
    },
    addProblems: async (domainID, contestID, problemIDs) => {
        const res = await request.postBody(`/contest/${contestID}?d=${domainID}`, { problemIDs });
        return res;
    },
    listProblem: async (domainID, page = 1) => {
        const res = await request.get(`/problem/list`, { d: domainID, page: page });
        return res;
    },
    getProblem: async (domainID, problemID) => {
        const res = await request.get(`/problem/${problemID}`, { d: domainID });
        return res;
    },
    remove: async (domainID, contestID) => {
        const res = await request.delete(`/contest/${contestID}`, { d: domainID });
        return res;
    }
}
export default api;