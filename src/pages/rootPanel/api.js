import request from "@/utils/request";

const api = {
    createUser: async (users) => {
        const res = await request.postBody("/user", { users });
        return res;
    }
}
export default api;