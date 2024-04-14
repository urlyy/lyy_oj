import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';
import PieChart from '@/components/PieChart';
import userStore from '@/store/user';
import api from './api';
import { dateFormat, gender2text, status2text } from '@/utils/data2text';
import domainStore from '@/store/domain';
import Toast from '@/utils/toast';


const LeftProfile = ({ userID }) => {
    const { id: myID, username: myUsername } = userStore();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [school, setSchool] = useState("");
    const [gender, setGender] = useState(null);
    const [lastLogin, setLastLogin] = useState(null);
    const [website, setWebsite] = useState("");

    useEffect(() => {
        if (userID !== null) {
            api.getProfile(userID).then(res => {
                if (res.success) {
                    const user = res.data.user;
                    setUsername(user.username);
                    setGender(user.gender);
                    setSchool(user.school);
                    setLastLogin(user.lastLogin);
                    setWebsite(user.website);
                }
            })
        }
    }, [userID])

    return (
        <>
            <div className='flex gap-2'>
                {/* <div>
                        <img className='w-24 h-24 rounded-xl' src={'https://assets.leetcode.cn/aliyun-lc-upload/users/zui-shang-chuan-k/avatar_1609037031.png?x-oss-process=image%2Fformat%2Cwebp'} />
                    </div> */}
                <div className='flex justify-between flex-col'>
                    <div className='font-bold text-2xl'>{username}</div>
                    <div>上次登录:{dateFormat(lastLogin)}</div>
                </div>
            </div>
            <div>
                <button onClick={() => { navigate("/profile/edit") }} className='w-full border p-2 rounded-md text-green-700 bg-green-100 hover:bg-green-200'>编辑个人资料</button>
            </div>
            <div className='flex flex-col gap-1'>
                <h4 className='font-bold text-lg'>个人资料</h4>
                {/* <div>无</div> */}
                <div>{gender2text(gender)}</div>
                <div>{school}</div>
                {/* <div><a href="https://github.com/urlyy">urlyy</a></div> */}
                {website !== "" && <div>个人网站 <a className='text-blue-400' href={website}>{website}</a></div>}
            </div>
        </>
    )
}

const MiddleRecordsArea = ({ userID }) => {
    const [curPage, setCurPage] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [records, setRecords] = useState([]);
    const [selectedRecordIdx, setSelectedRecordIdx] = useState(-1);
    const [recordSubmissions, setRecordSubmissions] = useState([]);
    const [filterTitle, setFilterTitle] = useState("");

    const { id: domainID } = domainStore();
    const handleGetRecords = async (newPage) => {
        setCurPage(newPage);
        setSelectedRecordIdx(-1);
        const res = await api.getRecords(domainID, userID, newPage, filterTitle);
        if (res.success) {
            const { records: r, pageNum: p } = res.data;
            setRecords(r);
            setPageNum(p);
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (userID !== null) {
            handleGetRecords(1);
        }
    }, [userID])
    const handleGetDetailRecord = async (idx) => {
        if (idx === selectedRecordIdx) {
            setSelectedRecordIdx(-1);
            return;
        }
        setSelectedRecordIdx(idx);
        const res = await api.getRecordSubmissions(domainID, userID, records[idx].problemID)
        if (res.success) {
            console.log(res.data.submissions);
            setRecordSubmissions(res.data.submissions)
        }
    }

    const handleFilter = async () => {
        setCurPage(1);
        const res = await handleGetRecords(1);
        if (res) {
            Toast("过滤成功", "success");
        }
    }

    return (
        <>
            <div className='flex items-center gap-2'>
                <div>已通过题目</div>
                <div className='group'>
                    <input value={filterTitle} onChange={(e) => { setFilterTitle(e.target.value) }} placeholder='题目标题' className='rounded-l-sm border-l border-b border-t group-hover:border-blue-300 pl-1 pt-1 pb-1' />
                    <button onClick={handleFilter} className='rounded-r-sm bg-white h-full border-r border-t border-b group-hover:border-blue-300 pr-1 pt-1 pb-1'>搜</button>
                </div>
            </div>
            <div className={`grid grid-cols-3 border-l border-t border-r`}>
                <div className='p-2 border'>最近提交时间</div>
                <div className='p-2 border'>题目</div>
                <div className='p-2 border'>提交次数</div>
                {records.map((record, idx) => (
                    <>
                        <div key={idx} className='col-span-3 grid grid-cols-3'>
                            <div className='p-2 border'>{dateFormat(record.recent)}</div>
                            <div className='p-2 border'>#{record.problemID} {record.problemTitle}</div>
                            <div className='p-2 border flex justify-between'>
                                <div>
                                    {record.count}
                                </div>
                                <div className='cursor-pointer' onClick={handleGetDetailRecord.bind(null, idx)}>
                                    {idx === selectedRecordIdx ? "收起" : "展开"}
                                </div>
                            </div>
                        </div>
                        {idx === selectedRecordIdx && <table key={`${idx}-table`} className='col-span-3 border mt-1 mb-1'>
                            <thead>
                                <tr>
                                    <th className='border'>提交时间</th>
                                    <th className='border'>结果</th>
                                    <th className='border'>语言</th>
                                    <th className='border'>运行时间</th>
                                    <th className='border'>内存消耗</th >
                                </tr>
                            </thead>
                            <tbody>
                                {recordSubmissions.map((sub, idx2) => (
                                    <tr key={`${idx}-${idx2}`}>
                                        <td className='text-center border'>{dateFormat(sub.submitTime)}</td>
                                        <td className={`${sub.status === 0 ? "text-green-500" : "text-red-500"} text-center border`}>{status2text(sub.status)}</td>
                                        <td className='text-center border'>{sub.lang}</td>
                                        <td className='text-center border'>{sub.maxTime}</td>
                                        <td className='text-center border'>{sub.maxMemory}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </>
                ))
                }
            </div >
            <Pagination current={curPage} pageNum={pageNum} onChange={handleGetRecords}></Pagination>
        </>
    )
}

const RightPieArea = ({ userID }) => {
    const [statusData, setStatusData] = useState({});
    const [pieData, setPieData] = useState([]);
    const [passProblemNum, setPassProblemNum] = useState(0);
    const { id: domainID } = domainStore();

    useEffect(() => {
        if (userID !== null) {
            api.getPieData(domainID, userID).then(res => {
                if (res.success) {
                    const { pie: data, passProblemNum } = res.data;
                    setStatusData(data);
                    const pie = [];
                    for (let status in data) {
                        const count = data[status]
                        if (count === 0) continue;
                        pie.push({ name: status2text(parseInt(status)), value: count })
                    }
                    setPieData(pie);
                    setPassProblemNum(passProblemNum);
                }
            })
        }
    }, [])
    return (
        <>
            <PieChart data={pieData} />
            <div className='px-10'>
                <div className='flex justify-between'>
                    <div>提交总数</div>
                    <div>{pieData.reduce((pre, cur) => pre + cur.value, 0)}</div>
                </div>
                <div className='flex justify-between'>
                    <div>已通过题目</div>
                    <div>{passProblemNum}</div>
                </div>
                <div className='flex justify-between'>
                    <div>答案正确</div>
                    <div>{statusData["0"]}</div>
                </div>
                <div className='flex justify-between'>
                    <div>答案错误</div>
                    <div>{statusData["2"]}</div>
                </div>
                <div className='flex justify-between'>
                    <div>时间超限</div>
                    <div>{statusData["4"]}</div>
                </div>
                <div className='flex justify-between'>
                    <div>内存超限</div>
                    <div>{statusData["5"]}</div>
                </div>
                <div className='flex justify-between'>
                    <div>运行错误</div>
                    <div>{statusData["3"]}</div>
                </div>
                <div className='flex justify-between'>
                    <div>编译错误</div>
                    <div>{statusData["1"]}</div>
                </div>
            </div>
        </>
    )
}



const Profile = () => {
    const { userID = null } = useParams();
    const navigate = useNavigate();
    return (
        <div className='bg-white w-3/5 h-full flex gap-1 animate__slideInBottom'>
            <div className='w-1/4 h-full flex gap-2 flex-col p-2 border shadow-lg rounded-md'>
                <LeftProfile userID={userID} />
            </div>
            <div className='w-3/4 h-full flex gap-3 border shadow-lg rounded-md'>
                <div className='w-2/3 h-full p-2 flex flex-col gap-2'>
                    <MiddleRecordsArea userID={userID} />
                </div >
                <div className='w-1/3 h-full'>
                    <RightPieArea userID={userID} />
                </div>
            </div >
        </div >
    )
}
export default Profile;