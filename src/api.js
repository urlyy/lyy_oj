import request from "@/utils/request";

const api = {
    getDomain: async (id) => {
        const res = await request.get(`/domain/${id}`)
        return res;
    }
}

export default api;