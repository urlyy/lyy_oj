import Table from "../components/Table";
import { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const init = async () => {
      // const res = await get('/api/rank', "");
      // setData(res.ranklist)
      let datum = {
        username: "2020401387",
        question: "question",
        status: "Accepted",
        spendTime: "1200ms",
        spendMemory: "300mb",
        lang: "CPP",
        submitTime: `2020-02-10 10:30`,
      };
      let tmp = [];
      for (let i = 0; i < 50; i++) {
        tmp.push(datum)
      }
      setData(tmp);
    }
    init();
  }, []);
  const columnMap = {
    "username": "递交者",
    "question": "题目",
    "status": "状态",
    "spendTime": "时间",
    "spendMemory": "内存",
    "lang": "语言",
    "submitTime": "递交时间",
  }
  const tableHeader = (
    Object.values(columnMap).map((column, idx) => (
      <div className='flex-1' key={idx}>{columnMap.hasOwnProperty(column) ? columnMap[column] : column}</div>
    ))
  )

  const tableRows = (
    data.map((row, index) => (
      Object.values(row).map((column, idx) => {
        if (idx == 0) {
          return <div className='flex-1 text-blue' key={`${index}-${idx}`}>{column}</div>
        }
        return <div className='flex-1' key={`${index}-${idx}`}>{column}</div>
      })
    ))
  )
  // console.log(tableRows);
  return (
    <>
      <div>rank</div>
      <Table data={data} header={tableHeader} rows={tableRows} pagination={true} height={600} width={1200} pageSize={5}></Table >
    </>
  )
}

export default Page;