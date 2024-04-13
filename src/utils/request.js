//1、引入axios
import axios from "axios";
import Toast from "./toast";
import Alert from "./alert";

//2、创建axios的实例
let instance = axios.create({
    baseURL: process.env.REACT_APP_API_BACKEND_URL,
    withCredentials: false,
});

//3、axios的拦截--request
instance.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem("user");
        if (userStr != null) {
            const user = JSON.parse(userStr);
            config.headers.Authorization = user.token;
        }
        return config;
    },
    (err) => {
        Promise.reject(err);
    }
);

//4、axios的拦截--response
instance.interceptors.response.use(
    (response) => {
        const data = response.data;
        if (data.success === false) {
            console.error(response.config.url, data.msg);
            Toast(data.msg, "error");
            if (data.msg === "请重新登录!") {
                Alert("登录凭证已过期,请保存当前正编写的代码,并手动重新登录!");
                return;
            }
        }
        return data;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const request = {
    get: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "get",
                params: params,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    delete: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "delete",
                params: params,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    putParam: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "put",
                params: params,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    putBody: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "put",
                data: params,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    postBody: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "post",
                data: params,
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    postParam: (url, params = {}) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "post",
                params: params,
                headers: { "Content-Type": "application/x-www-form-urlcoded" },
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    postForm: (url, formData) => {
        return new Promise((resolve, reject) => {
            instance({
                url: url,
                method: "post",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};


export default request;
