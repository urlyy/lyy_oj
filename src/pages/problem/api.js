import request from "@/utils/request";

const api = {
    list: async (domainID, page = 1, keyword = "", diff = 0, flag) => {
        const res = await request.get(`/problem/list`, { d: domainID, page: page, keyword, diff, flag });
        return res;
    },
    get: async (domainID, problemID, isEdit) => {
        const res = await request.get(`/problem/${problemID}`, { d: domainID, edit: isEdit });
        return res;
    },
    add: async (domainID, {
        problemID = null, title, desc, pub, diff,
        memoryLimit, timeLimit,
        inputFormat, outputFormat, other, testCases, judgeType, specialCode,
    }) => {
        const res = await request.postBody(`/problem?d=${domainID}`, {
            problemID, title, desc, pub, diff,
            memoryLimit, timeLimit,
            inputFormat, outputFormat, other, testCases, judgeType, specialCode,
        });
        return res;
    },
    remove: async (domainID, problemID) => {
        const res = await request.delete(`/problem/${problemID}?d=${domainID}`);
        return res;
    },
    submitTest: async (domainID, problemID, code, lang, testInput) => {
        const res = await request.postBody(`/judge/${problemID}/test?d=${domainID}`, { code, testInput, compiler: lang });
        return res;
    },
    submitJudge: async (domainID, problemID, lang, code, type, fromID) => {
        const res = await request.postBody(`/judge/${problemID}?d=${domainID}`, { code, compiler: lang, type, fromID });
        return res;
    },
    getCompilers: async () => {
        const res = await request.get(`/judge/compiler`);
        return res;
    }
}
export default api;