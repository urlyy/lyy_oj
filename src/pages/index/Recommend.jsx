import Markdown from '../../components/Markdown'
import Card from '../../components/Card'
import { useState, useEffect } from "react"


const Recommend = ({ domainID }) => {
    const [content, setContent] = useState("");
    useEffect(() => {
        const getContent = (id) => {
            return `
### 中文
[LibreOJ]() [洛谷]() [UOJ]() [CometOJ]() [Vijos]()
### English
[Codeforces]() [AtCoder]() [CodeChef]() [SPOJ]() [TopCoder]() [OnlineJudge]()
### 工具
[OIerDb]()
    `
        }
        const tmpContent = getContent(domainID);
        setContent(tmpContent);
    }, [])
    return (
        <div className="mb-5">
            <Card title={"推荐"}>
                <Markdown content={content}></Markdown>
            </Card>
        </div>
    )
}

export default Recommend;