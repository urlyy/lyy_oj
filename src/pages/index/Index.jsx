import Announcement from './Announcement'
import Recommend from './Recommend'
import domainStore from '@/store/domain';

const Index = () => {
  const { id: domainID } = domainStore();
  return (
    <div className="gap-5 flex">
      <div className="w-3/4">
        <Announcement domainID={domainID}></Announcement>
      </div>
      <div className="w-1/4">
        <Recommend domainID={domainID}></Recommend>
      </div>
    </div>
  )
}

export default Index;