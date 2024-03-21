import request from "@/utils/request";

const api = {
    submit: async (domainID, { homeworkID = null, title, desc, pub, start, end }) => {
        const res = await request.postBody(`/homework?d=${domainID}`, {
            title, desc, pub, start, end, homeworkID
        })
        return res;
    },
    getHomework: async (domainID, homeworkID) => {
        const res = await request.get(`/homework/${homeworkID}`, { d: domainID });
        return res;
    },
    getHomeworks: async (domainID, pageNum) => {
        const res = await request.get(`/homework/list`, { d: domainID, page: pageNum });
        return res;
    }
}
export default api;