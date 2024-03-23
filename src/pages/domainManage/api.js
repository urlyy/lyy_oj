import request from "@/utils/request";

const api = {
    changeProfile: async (domainID, name, announce) => {
        const res = await request.postBody(`/domain/${domainID}/profile`, {
            announce, name
        })
        return res;
    },
    getProfile: async (domainID) => {
        const res = await request.get(`/domain/${domainID}`)
        return res;
    },
    getUsers: async (domainID) => {
        const res = await request.get(`/domain/${domainID}/user`)
        return res;
    },
    getRoles: async (domainID) => {
        const res = await request.get(`/domain/${domainID}/role`)
        return res;
    },
    removeRoles: async (domainID, roleIDs) => {
        const res = await request.postBody(`/domain/${domainID}/role/delete`, { roleIDs });
        return res;
    },
    removeUsers: async (domainID, userIDs) => {
        const res = await request.postBody(`/domain/${domainID}/user/delete`, { userIDs });
        return res;
    }
}
export default api;