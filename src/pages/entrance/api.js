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
        const res = await request.postParam("/user/forget-pass/captcha", { email: email })
        return res;
    },
    getDomain: async (domainID) => {
        const res = await request.get(`/domain/${domainID}`)
        return res;
    }
}
export default api;