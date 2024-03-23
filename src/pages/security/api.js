import request from "@/utils/request";

const api = {
    changePassword: async (oldPassword, newPassword) => {
        const res = await request.postBody("/user/pass", { oldPassword, newPassword });
        return res;
    },
    changeEmail: async (password, newEmail) => {
        const res = await request.postBody("/user/email", { password, newEmail });
        return res;
    },
}
export default api;