import { headers } from 'next/headers'
import Card from '@/components/Card'
import Link from 'next/link';

export default () => {
    const headersList = headers()
    // const referer = headersList.get('referer')
    const token = "qwer";
    if (token == undefined) {
        return (
            <div>Referer: {referer}</div>
        )
    } else {
        const domains = [
            { name: " 2020级", id: 10 },
            { name: "2021级", id: 3 },
        ];
        return (
            <>
                <Card title={"请选择要进入的域"}>
                    <div className='grid grid-cols-4 gap-4'>
                        {domains.map((d, index) => (
                            <Link key={index} className="text-2xl w-full bg-blue-500 text-white p-4 text-center" href={`/${d.id}`}>{d.name}</Link>
                        ))}
                    </div>
                </Card>
            </>
        )
    }
}