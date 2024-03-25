const Button = ({ onClick = () => { }, type = "default", children, className = "" }) => {
    const type2style = () => {
        if (type === "primary") {
            return "bg-blue-400 hover:bg-blue-500 text-white"
        } else if (type === "danger") {
            return "bg-red-400 hover:bg-red-500 text-white"
        } else {
            return "bg-white hover:bg-slate-100"
        }
    }
    return (
        <button onClick={onClick} className={`${className} ${type2style(type)} p-1 rounded-md border`}>{children}</button>
    )
}

export default Button;