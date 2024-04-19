import { useCodeMirror } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { useRef, useEffect, useState } from 'react';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';


const CodeEditor = ({ code, readonly = true, onChange, className = "text-lg", placeholder = "" }) => {
    const editor = useRef();
    // const extensions = [langs.java(), langs.cpp(), langs.python()];
    const extensions = [langs.cpp()];
    const { setContainer } = useCodeMirror({
        container: editor.current,
        extensions,
        value: code,
        theme: vscodeDark,
        width: "100%",
        height: "100%",
        onChange: (val) => { onChange(val); },
        placeholder: "在这里写入代码",
        editable: !readonly,
        placeholder: placeholder,
    });

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    }, [editor.current]);

    return <div className={`flex w-full h-full ${className}`} ref={editor} />;
}

export default CodeEditor;