import { create } from 'zustand'

let domain = null;

const domainStr = localStorage.getItem("domain");
if (domainStr) {
    domain = JSON.parse(domainStr);
}

const domainStore = create(set => ({
    id: domain ? domain.id : null,
    name: domain ? domain.name : null,
    announce: domain ? domain.announce : null,
    permission: domain ? domain.permission : null,
    set: (domain) => set(state => {
        localStorage.setItem("domain", JSON.stringify(domain));
        return ({
            id: domain.id,
            name: domain.name,
            announce: domain.announce,
            permission: domain.permission,
        })
    }),
    setName: (newName) => set(prev => ({ ...prev, name: newName })),
    clear: () => set(state => {
        localStorage.removeItem("domain");
        return ({
            id: null,
            name: null,
            announce: null,
            permissions: null,
        })
    }),
}))



export default domainStore;