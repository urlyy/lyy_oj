import request from "@/utils/request";


const api = {
    add: async (domainID, title, content) => {
        const form = new FormData();
        form.append("title", title);
        form.append("content", content);
        const res = await request.postForm(`/notify/${domainID}`, form);
        return res;
    },
    list: async (domainID, page) => {
        const res = await request.get(`/notify/${domainID}/list`, { page });
        return res;
    },
    remove: async (domainID, id) => {
        const res = await request.delete(`/notify/${domainID}/${id}`);
        return res;
    }

}
export default api;