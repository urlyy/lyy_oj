import request from "@/utils/request";

const api = {
    changeProfile: async (domainID, name, announce, recommend) => {
        const res = await request.postBody(`/domain/${domainID}/profile`, {
            announce, name, recommend
        })
        return res;
    },
    getProfile: async (domainID) => {
        const res = await request.get(`/domain/${domainID}`)
        return res;
    },
    getUsers: async (domainID, page, username, trueID) => {
        const res = await request.get(`/domain/${domainID}/users`, { page, username, trueID })
        return res;
    },
    getRoles: async (domainID) => {
        const res = await request.get(`/domain/${domainID}/role`)
        return res;
    },
    changeUsersRole: async (domainID, userIDs, roleID) => {
        const res = await request.postBody(`/domain/${domainID}/user/role`, { userIDs, roleID });
        return res;
    },
    removeRole: async (domainID, roleID) => {
        const res = await request.delete(`/domain/${domainID}/role/${roleID}`);
        return res;
    },
    removeUsers: async (domainID, userIDs) => {
        const res = await request.postBody(`/domain/${domainID}/user/delete`, { userIDs });
        return res;
    },
    upsertRole: async (domainID, { roleID, roleName, roleDesc }) => {
        const res = await request.postParam(`/domain/${domainID}/role`, { id: roleID, name: roleName, desc: roleDesc });
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

    addUser2Domain: async (domainID, userID) => {
        const res = await request.postBody(`/domain/${domainID}/user/${userID}`);
        return res;
    },


}
export default api;