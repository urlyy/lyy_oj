import Announcement from './Announcement'
import Recommend from './Recommend'
import domainStore from '@/store/domain';
import api from './api';
import { useEffect } from 'react';

const Index = () => {

  return (
    <div className="gap-5 flex w-3/5 h-full animate__slideInBottom">
      <div className="w-3/4">
        <Announcement></Announcement>
      </div>
      <div className="w-1/4">
        <Recommend></Recommend>
      </div>
    </div>
  )
}

export default Index;