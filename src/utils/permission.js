export const 创建题目 = 0
export const 递交题目 = 1
export const 修改题目 = 2
export const 查看未公开题目 = 3
export const 查看提交详情 = 4
export const 重新判题 = 5
export const 创建作业 = 6
export const 修改作业 = 7
export const 查看未公开作业 = 8
export const 创建比赛 = 9
export const 修改比赛 = 10
export const 查看未公开比赛 = 11
export const 创建讨论 = 12
export const 修改自己的讨论 = 13
export const 删除其他人的讨论 = 14
export const 删除其他人的评论 = 15
export const 创建通知 = 16
export const 删除通知 = 17

export const havePermission = (permission, bitPosition) => {
    return (permission & (1 << bitPosition)) !== 0;
}