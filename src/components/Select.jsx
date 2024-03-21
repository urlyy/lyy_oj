const Select = ({ className, entries = [], selectedValue, onChange }) => {
    return (
        <select onChange={e => { onChange(e.target.value) }} value={selectedValue} className={`border rounded-md min-h-7 p-1 ${className}`}>
            {entries.map((entry, idx) => <option key={idx} value={entry[1]}>{entry[0]}</option>)}
        </select>
    )
}
export default Select;