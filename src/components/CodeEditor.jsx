import { useCodeMirror } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { useRef, useEffect, useState } from 'react';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';


// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.


const CodeEditor = ({ code, editable = true, onChange }) => {
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
        editable: editable,
    });

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    }, [editor.current]);

    return <div className={'flex w-full h-full text-xl '} ref={editor} />;
}

export default CodeEditor;