import request from "@/utils/request";

const api = {
    getProfile: async (userID) => {
        const res = await request.get(`/user/${userID}/profile`);
        return res;
    },
    changeProfile: async (username, gender, school, website) => {
        const res = await request.postBody(`/user/profile`, {
            username, gender, school, website,
        });
        return res;
    },
}
export default api;