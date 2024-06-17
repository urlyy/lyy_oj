import { ms2time } from "./data2text";
import { writeFile, utils } from 'xlsx-js-style';

const PENALTY = 1000 * 60 * 20;//20分钟
const AC = 0;
const JUDGING = 6;

const transSubmissions = (submissions, problems, users, startTime) => {
    const rankData = [];
    const tmp = {};
    // 分组一下
    submissions.forEach((item) => {
        const { userID, passPercent, problemID, status, submitTime, submissionID } = item;
        if (!tmp[userID]) {
            tmp[userID] = {};
        }
        if (!tmp[userID][problemID]) {
            tmp[userID][problemID] = [];
        }
        tmp[userID][item.problemID].push({ status, submitTime, passPercent });
    });
    // 遍历与填充 
    for (const userID in tmp) {
        for (const problemID in tmp[userID]) {
            const submissions = tmp[userID][problemID];
            const problemRes = { status: -1, passPercent: 0, errNum: 0, acTime: -1, maxPassPercent: 0 };
            for (const { status, submitTime, passPercent } of submissions) {
                problemRes.status = status;
                problemRes.passPercent = passPercent;
                // 跳过判题中的任务
                if (status === JUDGING) continue;
                // 给IOI用来算分的
                problemRes.maxPassPercent = Math.max(problemRes.maxPassPercent, passPercent);
                // 做出来才算罚时
                if (status === AC) {
                    // const spendTime = new Date(submitTime) - new Date(startTime);
                    // problemRes.acTime = new Date(spendTime).getTime();
                    problemRes.acTime = new Date(submitTime) - new Date(startTime) + 8 * 60 * 60 * 1000;
                    // 第一次ac时的耗时+罚时
                    break;
                } else {
                    problemRes.errNum += 1;
                }
            }
            tmp[userID][problemID] = problemRes;
        }
    }
    // 构建rank矩阵
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        rankData[i] = { userID: user.userID, username: user.username, problems: new Array(problems.length).fill(null), penalty: 0, acNum: 0, totalPassPercent: 0 };
        for (let j = 0; j < problems.length; j++) {
            let problem = problems[j];
            if (tmp[user.userID] && tmp[user.userID][problem.id]) {
                const problemRes = tmp[user.userID][problem.id];
                rankData[i].problems[j] = problemRes;
                // IOI的直接相加，默认每个题分数比例一样
                rankData[i].totalPassPercent += problemRes.passPercent;
                if (problemRes.status === AC) {
                    rankData[i].acNum += 1;
                    // 只有ac才算时间
                    rankData[i].penalty += problemRes.acTime + PENALTY * problemRes.errNum;
                }
            }
        }
    }
    return rankData;
}

//按ac数和罚时
export const ACMRank = (submissions, problems, users, startTime) => {
    const rankData = transSubmissions(submissions, problems, users, startTime);
    // 最后按ac数降序和罚时升序
    rankData.sort((a, b) => {
        if (a.acNum !== b.acNum) {
            // 降序排序
            return b.acNum - a.acNum;
        } else {
            // 升序排序
            return a.penalty - b.penalty;
        }
    });
    return rankData;
}


// 优先按每题最大得分的累加降序排序，分数相同再看ac数降序，再看罚时升序
export const IOIRank = (submissions, problems, users, startTime) => {
    const rankData = transSubmissions(submissions, problems, users, startTime);
    rankData.sort((a, b) => {
        if (a.totalPassPercent !== b.totalPassPercent) {
            // 降序排序
            return b.totalPassPercent - a.totalPassPercent;
        }
        if (a.acNum !== b.acNum) {
            // 降序排序
            return b.acNum - a.acNum;
        }
        // 升序排序
        return a.penalty - b.penalty;
    });
    return rankData;
}

export const exportRank = (rank, problems, type) => {
    const FILENAME = "排名";
    const header = ["排名", "用户名", "通过题数", "总罚时", ...problems.map((p) => p.title)];
    let data;
    if (type === "ACM") {
        data = rank.map((r, idx) => {
            const tmp = {
                "排名": idx + 1,
                "用户名": r.username,
                "通过题数": r.acNum,
                "总罚时": ms2time(r.penalty),
            }
            problems.forEach((p, idx) => {
                const real = r.problems[idx];
                if (real) {
                    let s;
                    if (real.status === AC) {
                        s = `${ms2time(real.acTime)}`;
                        if (real.errNum > 0) {
                            s = `+${real.errNum}\r\n${s}`;
                            // \r\n
                        }
                    } else {
                        s = `+${real.errNum}`;
                    }
                    tmp[p.title] = s;
                } else {
                    tmp[p.title] = "";
                }
            })
            return tmp;
        })
    } else {
        data = rank.map((r, idx) => {
            const tmp = {
                "排名": idx + 1,
                "用户名": r.username,
                "通过题数": r.acNum,
                "总罚时": ms2time(r.penalty),
            }
            problems.forEach((p, idx) => {
                const real = r.problems[idx];
                if (real) {
                    tmp[p.title] = real.passPercent * 100;
                } else {
                    tmp[p.title] = "";
                }
            })
            return tmp;
        })
    }
    //开始导出
    const ws = utils.json_to_sheet(data, { header: header });
    for (const key in ws) {
        if (key === "!ref") {
            continue;
        }
        const cell = ws[key];
        if (key.startsWith("A") || key.startsWith("B") || key.startsWith("C") || key.startsWith("D") || (key.length === 2 && key.charAt(1) === "1") || cell.v === "") {
            cell.s = {
                alignment: {
                    horizontal: 'center', //水平居中对齐
                    vertical: 'center',//垂直居中
                    wrapText: 1,//自动换行
                }
            }
        } else {
            const RED = "F87171";
            const GREEN = "4ADE80";
            const WHITE = "FFFFFF"
            if (type === "ACM") {
                // 是AC
                if (cell.v.includes(":")) {
                    cell.s = {
                        font: { color: { rgb: WHITE } },
                        fill: { fgColor: { rgb: GREEN } },
                        alignment: {
                            horizontal: 'center', //水平居中
                            wrapText: 1,//自动换行
                        }
                    };
                } else {
                    cell.s = {
                        font: { color: { rgb: WHITE } },
                        fill: { fgColor: { rgb: RED } },
                        alignment: {
                            horizontal: 'center', //水平居中
                            wrapText: 1,//自动换行
                        }
                    };
                }
            } else {
                if (cell.v !== 100) {
                    cell.s = {
                        font: { color: { rgb: WHITE } },
                        fill: { fgColor: { rgb: RED } },
                        alignment: {
                            horizontal: 'center', //水平居中
                            wrapText: 1,//自动换行
                        }
                    };
                } else {
                    cell.s = {
                        font: { color: { rgb: WHITE } },
                        fill: { fgColor: { rgb: GREEN } },
                        alignment: {
                            horizontal: 'center', //水平居中
                            wrapText: 1,//自动换行
                        }
                    };
                }
            }
        }
    }
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, `${FILENAME}.xlsx`);
}
