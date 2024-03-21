import Card from '../../components/Card'
import { useState, useEffect } from "react"
import RichTextEditor from '@/components/RichTextEditor';


const Recommend = () => {
    const [content, setContent] = useState("推荐哦");
    return (
        <div className="mb-5">
            <Card title={"推荐"}>
                <RichTextEditor value={content} readonly={true} />
            </Card>
        </div>
    )
}

export default Recommend;