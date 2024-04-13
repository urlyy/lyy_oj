import { evaluate } from 'mathjs'

export const calculate = (exp) => {
    try {
        const res = evaluate(exp);
        return res;
    } catch (error) {
        // 处理异常情况，例如返回错误消息
        return null;
    }
}

