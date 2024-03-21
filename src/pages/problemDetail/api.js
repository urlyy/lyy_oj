import request from "@/utils/request";
const api = {
    getProblem: async (domainID, problemID) => {
        const res = await request.get(`/problem/${problemID}`, { d: domainID });
        return res;
    },
}
export default api;