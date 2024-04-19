import { useEffect, useRef, memo } from "react";

const Textarea = ({ scroll = true, placeholder = "", value, onChange, className = "", disabled = false }) => {
    const textareaRef = useRef(null);
    useEffect(() => {
        if (textareaRef.current) {
            if (scroll === false) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                textareaRef.current.style.overflow = 'hidden';
            }
        }
    }, [value])
    return (
        <textarea disabled={disabled} ref={textareaRef} placeholder={placeholder} value={value} className={`overflow-auto w-full border min-h-10 rounded-md p-1 resize-none ${className}`} onChange={e => onChange(e.target.value)} />
    )
}

export default Textarea