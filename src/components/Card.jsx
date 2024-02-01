const Card = ({ title, children, className }) => {
    return (
        <div className={`flex-col justify-start items-start p-3 bg-white border border-slate-200 shadow-md rounded-sm ${className}`}>
            {title !== undefined && <div className="text-xl mb-1">{title}</div>}
            {children}
        </div>
    )
}

export default Card;