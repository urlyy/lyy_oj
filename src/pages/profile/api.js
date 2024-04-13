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
    getPieData: async (domainID, userID) => {
        const res = await request.get(`/submission/pie/${userID}`, { d: domainID });
        return res;
    },
    getRecords: async (domainID, userID, page, title) => {
        const res = await request.get(`/submission/records/${userID}`, { d: domainID, page, title });
        return res;
    },
    getRecordSubmissions: async (domainID, userID, problemID) => {
        const res = await request.get(`/submission/record/${userID}/${problemID}`, { d: domainID });
        return res;
    }
}
export default api;