import Checker from '../components/ChangePageChecker'
import Footer from '../components/Footer'
import Nav from './Nav'

export const metadata = {
  title: '域',
}

export default ({ children }) => {
  return (
    <div className='flex flex-col items-center w-full min-h-full'>
      <Nav />
      <div className='w-3/5'>
        {children}
        {/* <Checker></Checker> */}
      </div>
      <Footer />
    </div>
  )
}