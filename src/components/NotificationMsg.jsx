import { dateFormat } from "@/utils/data2text";

const Msg = ({ title, content, sendTime }) => {
    return (
        <div >
            <div className="text-2xl font-bold">{title}</div>
            <div className="text-lg">{content}</div>
            <div>{dateFormat(sendTime)}</div>
        </div>
    )
}

export default Msg