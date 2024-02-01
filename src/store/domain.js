import { create } from 'zustand'

let domain = null;

const domainStr = localStorage.getItem("domain");
if (domainStr) {
    domain = JSON.parse(domainStr);
}

const domainStore = create(set => ({
    id: domain ? domain.id : null,
    name: domain ? domain.username : null,

    set: (domain) => set(state => ({
        id: domain.id,
        name: domain.name
    })),
    setName: (newName) => set(prev => ({ ...prev, name: newName })),
    clear: () => set(state => ({
        id: null,
        name: null,
    }))
}))



export default domainStore;