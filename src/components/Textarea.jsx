import { useEffect, useRef } from "react";

const Textarea = ({ scroll = true, placeholder = "", value, onChange, className = "" }) => {
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            textareaRef.current.style.overflow = 'hidden';
        }
    }, [value])
    return (
        <textarea ref={textareaRef} placeholder={placeholder} value={value} className={`w-full border rounded-md p-1 resize-none ${className}`} onChange={e => onChange(e.target.value)} />
    )
}
export default Textarea