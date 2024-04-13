import request from "@/utils/request";

const api = {
    list: async (domainID, curPage, username, problemTitle, compiler, status) => {
        const res = await request.get("/submission/list", { d: domainID, page: curPage, username, problemTitle, compiler, status })
        return res;
    },
    rejudge: async (submissionID) => {
        const res = await request.postBody(`/judge/re/${submissionID}`)
        return res;
    },
    get: async (submissionID) => {
        const res = await request.get(`/submission/${submissionID}`)
        return res;
    },
    getCompilers: async () => {
        const res = await request.get(`/judge/compiler`);
        return res;
    }
}
export default api;