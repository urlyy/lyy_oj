const Input = ({ placeholder = "", value, onChange }) => {
    return (
        <input onChange={e => onChange(e.target.value)} className="w-full border h-7 bg-slate-200 rounded-md p-1" placeholder={placeholder} value={value} />
    )
}

export default Input;