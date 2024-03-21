import { create } from 'zustand'

let user = null;

const userStr = localStorage.getItem("user");
if (userStr) {
    user = JSON.parse(userStr);
}

const userStore = create(set => ({
    token: user ? user.token : null,
    id: user ? user.id : null,
    trueID: user ? user.trueID : null,
    email: user ? user.email : null,
    username: user ? user.username : null,
    gender: user ? user.gender : null,
    school: user ? user.school : null,

    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("domain");
        set(state => ({
            token: null,
            id: null,
            trueID: null,
            email: null,
            username: null,
            gender: null,
            school: null,
        }))
    },
    set: (user) => {
        const u = {
            token: user.token,
            id: user.id,
            trueID: user.trueID,
            email: user.email,
            username: user.username,
            gender: user.gender,
            school: user.school,
        }
        localStorage.setItem("user", JSON.stringify(u));
        set(state => u)
    },
    setAvatar: (avatar) => {
        // localStorage.setItem("user", JSON.stringify(user));
        // set(prev => ({ ...prev, avatar: avatar }))
    }
}))



export default userStore;