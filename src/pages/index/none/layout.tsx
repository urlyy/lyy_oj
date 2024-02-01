import './globals.css'
import { Metadata } from 'next';
import Footer from '@/components/Footer'
import Nav from '@/components/Nav/Nav'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'jsuacm',
  },
  description: '吉首大学计算机编程题教学平台'
};

export default ({ children }) => {
  return (
    <html lang="zh-cn">
      <body className="bg-gray-100 flex justify-center h-screen">
        <div className='w-3/5 rounded-sm  min-h-screen flex flex-col'>
          <Nav />
          <main className='flex-grow'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}