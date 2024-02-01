import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useVirtualList } from 'ahooks';
import clsx from 'clsx';

const Pagination = ({ current, totalPage, onChange }) => {
    const range1 = [1, 2, 3];
    const range2 = [totalPage - 2, totalPage - 1, totalPage];
    const range3 = [current - 1, current, current + 1];
    const ranges = Array.from(new Set([...range1, ...range2, ...range3])).filter(item => item > 0 && item <= totalPage).sort((a, b) => a - b);
    const buttons = [];
    if (current >= 2) {
        buttons.push(<button onClick={() => { onChange(current - 1) }} key="page-last" className="p-1 text-center">{'<'}</button>);
    }
    ranges.forEach((num, idx) => {
        const className = clsx("p-1 text-center", { 'text-blue pointer-events-none': num == current });
        //不连续，即省略号
        if (idx > 0 && num - ranges[idx - 1] != 1) {
            buttons.push(<button key={`page-n-${idx}`} disabled className={className}>...</button>);
        }
        buttons.push(<button key={`page-${idx}`} className={className} onClick={() => { onChange(num) }}>{num}</button>);
    })
    if (current <= totalPage - 1) {
        buttons.push(<button onClick={() => { onChange(current + 1) }} key="page-next" className="p-1 text-center">{'>'}</button>);
    }
    return (
        <div className='flex justify-center'>
            {current}
            {buttons}
        </div>
    )
}

const TableHead = ({ data, transFunc, pr }) => {
    return (
        <div className="flex border" style={{ paddingRight: pr }}>
            {Object.values(data).map((column, idx) => (
                <div className='flex-1' key={idx}>{transFunc != undefined ? transFunc(column, idx) : column}</div>
            ))}
        </div >
    )
}


const TableBody = ({ data, transFunc, onResize, pageNum, pageSize, startIndex = 1 }) => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    useEffect(() => {
        const list = containerRef.current;
        const updateHeaderPR = () => {
            const scrollbarWidth = list.offsetWidth - list.clientWidth;
            onResize(scrollbarWidth);
        };
        // 在需要时调用
        updateHeaderPR();
        // 添加滚动事件监听
        window.addEventListener('resize', updateHeaderPR);
        // 在组件卸载时清理监听器
        return () => {
            window.addEventListener('resize', updateHeaderPR);
        };
    }, []);
    const memoData = useMemo(() => Array.from(data), []);
    const [virtualData, scrollTo] = useVirtualList(memoData, {
        containerTarget: containerRef,
        wrapperTarget: wrapperRef,
        itemHeight: 100,
        overscan: 100,
    });
    return (
        <>
            <div className='table-list' ref={containerRef} style={{ height: '600px', overflow: 'scroll' }}>
                <div ref={wrapperRef}>
                    {virtualData.map(row => {
                        // const trClasses = clsx('flex border', { 'list-even': row.index % 2 == true, 'list-odd': row.index % 2 == false, });
                        //注意这里必须用他自己的index，不能用map的
                        return (
                            //必须用style的height
                            //少于52好像有问题？
                            <div className='flex border items-center' style={{ height: 52 }} key={row.index}>
                                {
                                    [row.index + startIndex, ...Object.values(row.data)].map(
                                        (column, colIdx) => <div className='flex-1' key={`${row.index}-${colIdx}`}>
                                            {transFunc != undefined ? transFunc(column, row.index, colIdx) : column}
                                        </div>
                                    )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default ({ headData, headTrans, bodyData, bodyTrans, curPage, totalPage, pageSize = 5, onPageChange = () => { } }) => {
    const [scrollPR, setPR] = useState(0);
    return (
        <>
            <TableHead data={headData} transFunc={headTrans} pr={scrollPR}></TableHead>
            <TableBody data={bodyData} transFunc={bodyTrans} onResize={setPR} startIndex={curPage != undefined && totalPage != undefined ? (curPage - 1) * pageSize + 1 : 1}></TableBody>
            {curPage != undefined && totalPage != undefined && <Pagination current={curPage} pageSize={pageSize} totalPage={totalPage} onChange={onPageChange}></Pagination>}
        </>
    )
}