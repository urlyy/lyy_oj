import { create } from 'zustand'

let user = null;

const userStr = localStorage.getItem("user");
if (userStr) {
    user = JSON.parse(userStr);
}

const userStore = create(set => ({
    token: user ? user.token : null,
    id: user ? user.id : null,
    username: user ? user.username : null,
    avatar: user ? user.avatar : null,
    gender: user ? user.gender : null,
    brief: user ? user.brief : null,
    role: user ? user.role : null,

    logout: () => set(state => ({
        token: null,
        id: null,
        username: null,
        avatar: null,
        role: null,
        gender: null,
        brief: null,
    })),
    setUser: (user) => set(state => ({
        id: user.id,
        username: user.username,
        token: user.token,
        avatar: user.avatar,
        role: user.role,
        gender: user.gender,
        brief: user.brief,
    })),
    setAvatar: (avatar) => set(prev => ({ ...prev, avatar: avatar }))
}))



export default userStore;