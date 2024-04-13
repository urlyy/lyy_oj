import request from "@/utils/request";

const api = {
    add: async (domainID, { homeworkID = null, title, desc, pub, start, end, problemIDs }) => {
        const res = await request.postBody(`/homework?d=${domainID}`, {
            title, desc, pub, start, end, homeworkID, problemIDs
        })
        return res;
    },
    get: async (domainID, homeworkID) => {
        const res = await request.get(`/homework/${homeworkID}`, { d: domainID });
        return res;
    },
    list: async (domainID, pageNum, flag) => {
        const res = await request.get(`/homework/list`, { d: domainID, page: pageNum, flag });
        return res;
    },
    addProblems: async (domainID, homeworkID, problemIDs) => {
        const res = await request.postBody(`/homework/${homeworkID}?d=${domainID}`, { problemIDs });
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
    remove: async (domainID, homeworkID) => {
        const res = await request.delete(`/homework/${homeworkID}`, { d: domainID });
        return res;
    },
    getSubmissions: async (domainID, homeworkID) => {
        const res = await request.get(`/submission/special/rank`, { d: domainID, id: homeworkID, type: "homework" });
        return res;
    },
    getUsers: async (domainID) => {
        const res = await request.get(`/domain/${domainID}/users`)
        return res;
    },
}
export default api;