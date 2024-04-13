const Card = ({ title = "", children, className = "", rightHeader = <></> }) => {
    return (
        <div className={`flex flex-col justify-start items-start p-3 bg-white border border-slate-200 shadow-md rounded-sm ${className}`}>
            {title != undefined && <div className="text-xl mb-1 flex w-full">
                <div className="text-2xl">{title}</div>
                <div className="ml-auto">{rightHeader}</div>
            </div>
            }
            <div className="flex-1 w-full">{children}</div>
        </div>
    )
}

export default Card;