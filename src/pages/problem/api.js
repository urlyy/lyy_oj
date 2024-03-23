import request from "@/utils/request";

const api = {
    list: async (domainID, page = 1, keyword = "", diff = 0) => {
        const res = await request.get(`/problem/list`, { d: domainID, page: page, keyword, diff });
        return res;
    },
    get: async (domainID, problemID) => {
        const res = await request.get(`/problem/${problemID}`, { d: domainID });
        return res;
    },
    add: async (domainID, {
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
    },
    remove: async (domainID, problemID) => {
        const res = await request.delete(`/problem/${problemID}?d=${domainID}`);
        return res;
    }
}
export default api;