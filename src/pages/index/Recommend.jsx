import Card from '../../components/Card'
import RichTextEditor from '@/components/RichTextEditor';
import domainStore from '@/store/domain';

const Recommend = () => {
    const { recommend } = domainStore();
    return (
        <div className="mb-5">
            <Card title={"推荐"}>
                {recommend && <RichTextEditor value={recommend} readonly={true} />}
            </Card>
        </div>
    )
}

export default Recommend;