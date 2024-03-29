// import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

// const MyMarkdown = ({ content = "1234" }) => {
//     const style = `
// flex flex-col
// prose prose-sm rounded-sm max-w-none
// prose-th:border
// prose-td:border
// prose-a:no-underline
// hover:prose-a:underline
// prose-a:text-blue-400 
// hover:prose-a:text-red-400

// prose-headings:mt-0
// prose-lead:mt-0
// prose-p:mt-0
// prose-a:mt-0
// prose-blockquote:mt-0
// prose-figure:mt-0
// prose-figcaption:mt-0
// prose-strong:mt-0
// prose-em:mt-0
// prose-code:mt-0
// prose-pre:mt-0
// prose-ol:mt-0
// prose-ul:mt-0
// prose-li:mt-0
// prose-table:mt-0
// prose-thead:mt-0
// prose-tr:mt-0
// prose-th:mt-0
// prose-td:mt-0
// prose-img:mt-0
// prose-video:mt-0
// prose-hr:mt-0

// prose-headings:mb-0
// prose-lead:mb-0
// prose-p:mb-0
// prose-a:mb-0
// prose-blockquote:mb-0
// prose-figure:mb-0
// prose-figcaption:mb-0
// prose-strong:mb-0
// prose-em:mb-0
// prose-code:mb-0
// prose-pre:mb-0
// prose-ol:mb-0
// prose-ul:mb-0
// prose-li:mb-0
// prose-table:mb-0
// prose-thead:mb-0
// prose-tr:mb-0
// prose-th:mb-0
// prose-td:mb-0
// prose-img:mb-0
// prose-video:mb-0
// prose-hr:mt-0
//     `
//     return (
//         <div className={style}>
//             <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
//         </div>
//     )
// }

// export default MyMarkdown;


import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor } from '@wangeditor/editor'

function Markdown({ content = "1234", onChange }) {

    const [editor, setEditor] = useState(null);
    useEffect(() => {

    }, [])
    const style = `
flex flex-col
prose prose-sm rounded-sm max-w-none
prose-th:border
prose-td:border
prose-a:no-underline
hover:prose-a:underline
prose-a:text-blue-400 
hover:prose-a:text-red-400

prose-headings:mt-0
prose-lead:mt-0
prose-p:mt-0
prose-a:mt-0
prose-blockquote:mt-0
prose-figure:mt-0
prose-figcaption:mt-0
prose-strong:mt-0
prose-em:mt-0
prose-code:mt-0
prose-pre:mt-0
prose-ol:mt-0
prose-ul:mt-0
prose-li:mt-0
prose-table:mt-0
prose-thead:mt-0
prose-tr:mt-0
prose-th:mt-0
prose-td:mt-0
prose-img:mt-0
prose-video:mt-0
prose-hr:mt-0

prose-headings:mb-0
prose-lead:mb-0
prose-p:mb-0
prose-a:mb-0
prose-blockquote:mb-0
prose-figure:mb-0
prose-figcaption:mb-0
prose-strong:mb-0
prose-em:mb-0
prose-code:mb-0
prose-pre:mb-0
prose-ol:mb-0
prose-ul:mb-0
prose-li:mb-0
prose-table:mb-0
prose-thead:mb-0
prose-tr:mb-0
prose-th:mb-0
prose-td:mb-0
prose-img:mb-0
prose-video:mb-0
prose-hr:mt-0
`

    const editorConfig = {
        placeholder: '请输入内容...',
        readOnly: true,
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor !== null) {
                editor.destroy()
                setEditor(null)
            }
        }
    }, [editor])
    return (
        <>
            <div className={style}>
                <Editor
                    defaultConfig={editorConfig}
                    value={content}
                    onCreated={setEditor}
                    onChange={editor => onChange(editor.getHtml())}
                    mode="simple"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default Markdown;