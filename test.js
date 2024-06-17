// // 创建一个指定的 UTC 时间
const specifiedUTC = new Date("2024-04-20T00:35:00Z");

let d1 = new Date();
let d2 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());

// // 获取当前时间
// const currentTime = Date.parse(d2);;
// console.log(currentTime, specifiedUTC.getTime())
// console.log(currentTime > specifiedUTC.getTime())
// const timestamp1 = 1713537291000;
// const timestamp2 = 1713573300000;

// // 计算两个时间戳之间的时间差（以毫秒为单位）
// const timeDifference = timestamp2 - timestamp1;

// // 将时间差转换为秒、分钟、小时和天
// const seconds = timeDifference / 1000;
// const minutes = seconds / 60;
// const hours = minutes / 60;
// const days = hours / 24;

// // 输出时间差
// console.log(`时间差：${timeDifference} 毫秒`);
// console.log(`时间差：${seconds} 秒`);
// console.log(`时间差：${minutes} 分钟`);
// console.log(`时间差：${hours} 小时`);
// console.log(`时间差：${days} 天`);


const dateFormat = (dateString) => {
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

// console.log(dateFormat("2024-04-20T00:35:00Z"))
// console.log(dateFormat(new Date().toUTCString()))

const starttt = new Date("2024-04-20T00:29:00Z");
starttt.setUTCHours(starttt.getUTCHours() + starttt.getTimezoneOffset() / 60);
// console.log(starttt)
const noww = new Date();
console.log(noww > starttt);