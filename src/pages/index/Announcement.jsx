import Card from '../../components/Card'
import RichTextEditor from '@/components/RichTextEditor';
import domainStore from '@/store/domain';

const Announcement = () => {
  const { announce } = domainStore();
  return (
    <div className="mb-5">
      <Card title='公告'>
        {announce !== null && <RichTextEditor value={announce} readonly={true} />}
      </Card>
    </div>
  )
}

export default Announcement;