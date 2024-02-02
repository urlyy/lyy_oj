const Input = ({ placeholder = "", value, onChange }) => {
    return (
        <input onChange={e => onChange(e.target.value)} className="border rounded-md w-full h-7 p-1" placeholder={placeholder} value={value} />
    )
}

export default Input;