import request from "@/utils/request";

const api = {
    changePassword: async (oldPassword, newPassword) => {
        const res = await request.postBody("/user/pass", { oldPassword, newPassword });
        return res;
    },
    changeEmail: async (password, newEmail, captcha) => {
        const res = await request.postBody("/user/email", { password, newEmail, captcha });
        return res;
    },
    removeUsers: async (domainID, userIDs) => {
        const res = await request.postBody(`/domain/${domainID}/user/delete`, { userIDs });
        return res;
    },
    sendChangeEmailCaptcha: async (email) => {
        const res = await request.postParam(`/user/change-email/captcha`, { email });
        return res;
    }
}
export default api;