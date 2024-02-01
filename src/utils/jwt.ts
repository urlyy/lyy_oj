const jwt = require('jsonwebtoken')
const util = require('util');

// 你的秘密密钥，用于签名和验证JWT
const secretKey = 'urlyy-2023-12-27';


const generate = (payload = {}) => {
    // 要包含在JWT中的信息
    // const payload = {
    //     userId: '123',
    //     username: 'john_doe',
    //     role: 'user',
    // };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

const verify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                console.error(`JWT Verification Failed: ${error.message}`);
                reject(null);
            } else {
                resolve(decoded);
            }
        });
    });
};

export { generate, verify }