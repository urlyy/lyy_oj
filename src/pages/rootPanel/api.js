import request from "@/utils/request";

const api = {
    createUser: async (users) => {
        const res = await request.postBody("/user", { users });
        return res;
    },
    createDomain: async (name, ownerID) => {
        const res = await request.postBody("/domain", { name, ownerID });
        return res;
    },
    getConfig: async () => {
        const res = await request.get("/config");
        return res;
    },
    updateConfig: async (addressList, compilers, recommend, announce) => {
        const res = await request.postBody("/config", { addressList, compilers, recommend, announce });
        return res;
    },
    getPermissions: async () => {
        const res = await request.get(`/permission`);
        return res;
    },
    changeRolePermission: async (domainID, roleID, bit, newPermission) => {
        const havePermission = newPermission === true ? 1 : 0;
        const res = await request.postParam(`domain/${domainID}/role/${roleID}/permission/${bit}/${havePermission}`);
        return res;
    },
    getRoles: async (domainID) => {
        const res = await request.get(`/domain/${domainID}/role`)
        return res;
    },
}
export default api;