import request from "@/utils/request";

const api = {
    getRank: async (domainID, pageNum, username) => {
        const res = await request.get(`/submission/rank`, { d: domainID, page: pageNum, username });
        return res;
    },
}
export default api;