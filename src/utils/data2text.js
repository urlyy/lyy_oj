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

export const status2text = (status, passPercent = -1) => {
    let text = "";
    if (status === 0) text = "答案正确";
    else if (status === 1) text = "编译错误";
    else if (status === 2) text = "答案错误";
    else if (status === 3) text = "运行错误";
    else if (status === 4) text = "时间超限";
    else if (status === 5) text = "内存超限";
    else if (status === 6) text = "正在判题";
    else {
        text = "未知状态";
    }
    if (passPercent >= 0) {
        if (status !== 0 && status !== 1 && status !== 6) {
            let percent = passPercent * 100;
            text = text + percent + "%";
        }
    }
    return text;
}

export const dateFormat = (dateString) => {
    // 创建 Date 对象并解析输入字符串
    const inputDate = new Date(dateString);
    // 获取年、月、日、时、分的值
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
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

export const fromType2text = (fromType) => {
    if (fromType === "problem") {
        return "题库";
    } else if (fromType === "contest") {
        return "比赛";
    } else if (fromType === "homework") {
        return "作业";
    } else {
        return "未知";
    }
}

export const ms2time = (ms) => {
    const hour = Math.floor(ms / 3600000);
    ms -= hour * 3600000;
    const minute = Math.floor(ms / 60000);
    ms -= minute * 60000;
    const second = Math.floor(ms / 1000);
    return `${hour.toFixed(0)}:${minute.toFixed(0).padStart(2, "0")}:${second.toFixed(0).padStart(2, "0")}`;
}