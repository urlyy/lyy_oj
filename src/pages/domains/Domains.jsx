import Card from "@/components/Card";
import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
import userStore from "@/store/user";
import api from "./api";
import { useNavigate } from "react-router-dom";
const Domains = () => {
    const navigate = useNavigate();
    const [domains, setDomains] = useState([]);
    const setDomain = domainStore(state => state.set);
    const logout = userStore(state => state.logout);
    useEffect(() => {
        api.getDomains().then(res => {
            const domains = res.data.domains;
            setDomains(domains);
        })
    }, []);
    const handleClick = (idx) => {
        const target = domains[idx];
        const domain = { id: target.id };
        setDomain(domain);
        navigate("/");
    }
    const handleLogout = () => {
        logout();
    }
    return (
        <div className="w-3/5 h-full flex animate__slideInBottom">
            <Card className={"flex-1 mt-3"} title={"域列表"} rightHeader={
                <button onClick={handleLogout} className="border p-1 text-lg rounded-md hover:bg-slate-100">登出</button>
            }>
                <div className="grid grid-cols-5 w-full gap-4">
                    {domains.map((domain, idx) => (
                        <div onClick={handleClick.bind(null, idx)} key={idx} className="bg-sky-300 rounded-lg flex hover:bg-sky-400  w-full h-32 border shadow-xl cursor-pointer">
                            <div className="flex text-xl flex-1 justify-center items-center text-white font-bold">
                                {domain.name}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>



    )
}
export default Domains;