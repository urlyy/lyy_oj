import request from "@/utils/request";

const api = {
    login: async (email, trueID, password) => {
        const res = await request.postBody("/user/login", {
            email, password, trueID,
        })
        return res;
    },
    register: async (username, password) => {
        console.log(username, password);
    },
    sendForgetPasswordCaptcha: async (email) => {
        const res = await request.postParam("/user/forget-pass/captcha", { email })
        return res;
    },
    getDomain: async (domainID) => {
        const res = await request.get(`/domain/${domainID}`)
        return res;
    },
    forgetPass: async (email, captcha, password) => {
        const res = await request.postForm("/user/forget-pass", { email, captcha, password })
        return res;
    }
}
export default api;