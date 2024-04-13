

import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect, useRef } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import axios from 'axios'

const editorStyle = `
flex flex-col
prose prose-sm rounded-sm max-w-none
prose-th:border
prose-td:border
prose-a:no-underline
hover:prose-a:underline
prose-a:text-blue-400
hover:prose-a:text-red-400
`



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


const RichTextEditor = ({ onChange = (newText) => { }, readonly = false, value = "" }) => {
    const [editor, setEditor] = useState(null);
    const isShowEdit = useRef(false)
    useEffect(() => {
        isShowEdit.value = true
    }, [])
    useEffect(() => {
        return () => {
            if (editor !== null) {
                editor.destroy()
                setEditor(null)
            }
        }
    }, [editor])

    const editorConfig = {
        placeholder: readonly ? "" : '',
        autoFocus: false,
        scroll: false,
        hoverbarKeys: {
            formula: {
                menuKeys: ['editFormula'], // “编辑公式”菜单
            },
        },
        readonly: readonly,
        MENU_CONF: {
            'uploadImage': {
                server: `${process.env.REACT_APP_API_File_STORE_URL}/static`,
                onSuccess(file, res) {
                    console.log(`${file.name} 上传成功`, res)
                },
                async customUpload(file, insertFn) {
                    const formData = new FormData();
                    formData.append("file", file);
                    axios.post(`${process.env.REACT_APP_API_File_STORE_URL}/upload`, formData)
                        .then(response => {
                            insertFn(response.data, "", "")
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }

        }
    }
    const toolbarConfig = {
        excludeKeys: ["group-video", "fullScreen"],
        insertKeys: {
            index: 0,
            keys: [
                'insertFormula', // “插入公式”菜单
                'editFormula' // “编辑公式”菜单
            ],
        },

    }
    if (!isShowEdit) {
        return <></>
    }
    if (editor !== null && readonly === true) {
        editor.disable();
    }
    if (!readonly) {
        return (
            <div className='border min-h-96 flex flex-col'>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    className="border-b"
                />
                <Editor
                    className={`flex-1  min-h-[301px] text-lg ${editorStyle} ${readonly ? "" : "p-2"}`}
                    defaultConfig={editorConfig}
                    value={value}
                    onCreated={setEditor}
                    onChange={editor => { onChange(editor.getHtml()) }}
                    mode="simple"
                />
            </div>
        )
    } else {
        return (
            <div className='flex flex-col'>
                <Editor
                    className={`flex-1  text-lg p-0 ${editorStyle}`}
                    defaultConfig={editorConfig}
                    value={value}
                    onCreated={setEditor}
                    onChange={editor => { onChange(editor.getHtml()) }}
                    mode="simple"
                />
            </div>
        )
    }
}




export default RichTextEditor;