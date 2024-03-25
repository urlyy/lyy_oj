export const diff2text = (diff) => {
    if (diff === 1) {
        return "Easy"
    } else if (diff === 2) {
        return "Medium"
    } else if (diff === 3) {
        return "Hard";
    } else {
        return ""
    }
}

export const timeLimit2text = (limit) => {
    if (limit >= 1000) {
        return `${(limit / 1000).toFixed(1)}s`
    } else {
        return `${limit}ms`;
    }
}

export const memoryLimit2text = (limit) => {
    return `${limit}mb`;
}

export const dateFormat = (dateString) => {
    // 创建 Date 对象并解析输入字符串
    const inputDate = new Date(dateString);
    // 获取年、月、日、时、分的值
    const year = inputDate.getUTCFullYear();
    const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getUTCDate().toString().padStart(2, '0');
    const hours = inputDate.getUTCHours().toString().padStart(2, '0');
    const minutes = inputDate.getUTCMinutes().toString().padStart(2, '0');
    // 格式化为目标字符串
    const s = `${year}-${month}-${day} ${hours}:${minutes}`;
    return s
}

export const gender2text = (gender) => {
    if (gender === 1) {
        return "男"
    } else if (gender === 2) {
        return "女"
    } else {
        return "未知";
    }
}

export const str2date = (dateString) => {
    const inputDate = new Date(dateString);
    const year = inputDate.getUTCFullYear();
    const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getUTCDate().toString().padStart(2, '0');
    const s = `${year}-${month}-${day}`;
    return s
}

export const str2time = (dateString) => {
    const inputDate = new Date(dateString);
    const hours = inputDate.getUTCHours().toString().padStart(2, '0');
    const minutes = inputDate.getUTCMinutes().toString().padStart(2, '0');
    const s = `${hours}:${minutes}`;
    return s
}