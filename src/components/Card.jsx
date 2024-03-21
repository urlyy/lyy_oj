const Card = ({ title = "", children, className = "", rightHeader = <></> }) => {
    return (
        <div className={`flex-col justify-start items-start p-3 bg-white border border-slate-200 shadow-md rounded-sm ${className}`}>
            {title != undefined && <div className="text-xl mb-1 flex">
                <div>{title}</div>
                <div className="ml-auto">{rightHeader}</div>
            </div>
            }
            {children}
        </div>
    )
}

export default Card;