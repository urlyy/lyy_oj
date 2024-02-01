const getData = async () => {
  const res = await fetch('http://0.0.0.0:8000')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json();
}


const RankLayout = async ({ children }) => {
  let res = await getData();
  return (
    <>
      {children}
    </>
  )
}
export default RankLayout