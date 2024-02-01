import Markdown from "../../components/Markdown"
import Card from '../../components/Card'
import { useState, useEffect } from "react"


const Announcement = ({ domainID }) => {
    const [content, setContent] = useState("");
    useEffect(() => {
        const getContent = (id) => {
            return `
  # Markdown 示例

这是一个**Markdown**的示例文档，演示了一些常见的标记语法。

## 标题

## 文本样式

*斜体* 文本使用单个星号或下划线。
**粗体** 文本使用两个星号或下划线。
~~删除线~~ 使用两个波浪线。


| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ 'remark-gfm' |

## 列表

无序列表可以使用星号、加号或减号：
- 项目 1
- 项目 2
- 项目 3
  - 项目3.1

有序列表使用数字和点：
1. 项目 A
2. 项目 B
3. 项目 C

## 链接和图片

[链接到Google](https://www.google.com)
![图片](https://via.placeholder.com/150)
`
        }
        const tmpContent = getContent(domainID);
        setContent(tmpContent);
    }, [])
    return (
        <div className="mb-5">
            <Card>
                <Markdown content={content}></Markdown>
            </Card>
        </div>
    )
}

export default Announcement;