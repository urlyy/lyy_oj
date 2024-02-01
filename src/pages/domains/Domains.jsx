import Card from "@/components/Card";
import { useState, useEffect } from "react";
import domainStore from "@/store/domain";
import api from "./api";
import { useNavigate } from "react-router-dom";
const Domains = () => {
    const navigate = useNavigate();
    const [domains, setDomains] = useState([]);
    const enterDomain = domainStore(state => state.set);
    useEffect(() => {
        // api.getDomains().then(res => {
        //     setDomains(res.data);
        // })
        const data = [
            { id: 1, name: "20级软件三班" },
            { id: 2, name: "20级软件四班" }
        ]
        setDomains(data);
    }, []);
    const handleClick = (idx) => {
        const target = domains[idx];
        const domain = { id: target.id, name: target.name };
        enterDomain(domain);
        localStorage.setItem("domain", JSON.stringify(domain));
        navigate("/");
    }
    return (
        <div className="w-3/5 h-full flex">
            <Card className={"flex-1 mt-3"} title={"域列表"}>
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