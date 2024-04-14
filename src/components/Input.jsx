const Input = ({ disabled = false, className = "", placeholder = "", value, onChange, type = "text" }) => {
    return (
        <input disabled={disabled} type={type} onChange={e => { onChange(e.target.value) }} className={`border rounded-md w-full min-h-7 p-1 ${className}`} placeholder={placeholder} value={value} />
    )
}

export default Input;