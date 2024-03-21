import request from "@/utils/request";

const api = {
    getProblems: async (domainID, page = 1) => {
        const res = await request.get(`/problem/list`, { d: domainID, page: page });
        return res;
    },
    getProblem: async (domainID, problemID) => {
        const res = await request.get(`/problem/${problemID}`, { d: domainID });
        return res;
    },
    submitProblem: async (domainID, {
        problemID = null, title, desc, pub, diff,
        memoryLimit, timeLimit,
        inputFormat, outputFormat, other,
    }) => {
        const res = await request.postBody(`/problem?d=${domainID}`, {
            problemID, title, desc, pub, diff,
            memoryLimit, timeLimit,
            inputFormat, outputFormat, other,
        });
        return res;
    }
}
export default api;