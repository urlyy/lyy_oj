import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';
import PieChart from '@/components/PieChart';

const Profile = () => {
    const navigate = useNavigate();
    const { userID } = useParams();
    const [curPassPage, setCurPassPage] = useState(1);
    useEffect(() => {
        console.log(userID);
    })
    const handleChangePage = (newPageNum) => {
        setCurPassPage(newPageNum)
    }
    return (
        <div className='w-3/5 h-full flex gap-1'>
            <div className='w-1/4 h-full flex gap-2 flex-col p-2 border shadow-lg rounded-md'>
                <div className='flex gap-2'>
                    <div>
                        <img className='w-24 h-24 rounded-xl' src={'https://assets.leetcode.cn/aliyun-lc-upload/users/zui-shang-chuan-k/avatar_1609037031.png?x-oss-process=image%2Fformat%2Cwebp'} />
                    </div>
                    <div className='flex justify-between flex-col'>
                        <div className='font-bold text-2xl'>最上川</div>
                    </div>
                </div>
                <div>
                    <button onClick={() => { navigate("/profile/edit") }} className='w-full border p-2 rounded-md text-green-700 bg-green-100 hover:bg-green-200'>编辑个人资料</button>
                </div>
                <div className='flex flex-col gap-1'>
                    <h4 className='font-bold text-lg'>个人简介</h4>
                    <div>无</div>
                    <div>男</div>
                    <div>吉首大学</div>
                    <div><a href="https://github.com/urlyy">urlyy</a></div>
                    <div><a href="https://urlyy.github.io/">https://urlyy.github.io/</a></div>
                </div>
            </div>
            <div className='w-3/4 h-full flex gap-3 border shadow-lg rounded-md'>
                <div className='w-2/3 h-full p-2 flex flex-col gap-2'>
                    <div className='flex  items-center gap-2'>
                        <div>已通过题目</div>
                        <div className='group'>
                            <input placeholder='题目ID' className='border-l border-b border-t group-hover:border-blue-300 pl-1 pt-1 pb-1' />
                            <button className='bg-white h-full border-r border-t border-b group-hover:border-blue-300 pr-1 pt-1 pb-1'>搜</button>
                        </div>
                    </div>
                    <div>
                        <div className={`grid grid-cols-2 border-l border-t border-r`}>
                            <div className='p-2 border'>最近提交时间</div>
                            <div className='p-2 border'>题目</div>
                            <div className='p-2 border'>2个月前</div>
                            <div className='p-2 border'>#322 零钱兑换</div>
                        </div>
                        <div className='col-span-2 grid grid-cols-4 border'>
                            <div className='border-b'>提交时间</div>
                            <div className='border-b'>语言</div>
                            <div className='border-b'>执行时长</div>
                            <div className='border-b'>操作</div>

                            <div className='border-b'>2023-11-22 21:21</div>
                            <div className='border-b'>Java</div>
                            <div className='border-b'>27ms</div>
                            <div className='border-b'><button>查看详情</button></div>
                        </div>
                    </div>
                    <Pagination current={curPassPage} pageNum={20} onChange={handleChangePage}></Pagination>
                </div>
                <div className='w-1/3 h-full'>
                    <PieChart />
                    <div className='px-10'>
                        <div className='flex justify-between'>
                            <div>提交总数</div>
                            <div>1234</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>已通过题目</div>
                            <div>1234</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>提交通过率</div>
                            <div>1234</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>答案错误</div>
                            <div>1234</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>运行超时</div>
                            <div>1234</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>内存超限</div>
                            <div>1234</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>运行错误</div>
                            <div>1234</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>编译错误</div>
                            <div>1234</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Profile;