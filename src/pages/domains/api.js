import request from "@/utils/request";

const api = {
    getDomains: async () => {
        const res = await request.get("/domain/list")
        console.log(res);
        return res;
    }
}
export default api;