"use client"
import { useState, useEffect, useRef } from 'react';
import { get, post } from '@/app/utils/request'
import { FixedSizeList as List } from 'react-window';
import clsx from 'clsx';
import React from 'react'

const TheadRow = ({ template, pr }) => {
    return (
        <div className="flex" style={{ paddingRight: pr, borderTopWidth: '1px', borderTopColor: '#ccc', borderBottomWidth: '1px', borderBottomColor: '#ccc' }}>
            {template}
        </div >
    )
}

const Pagination = ({ current, pageNum, onChange }) => {
    const range1 = [1, 2, 3];
    const range2 = [pageNum - 2, pageNum - 1, pageNum];
    const range3 = [current - 1, current, current + 1];
    const ranges = Array.from(new Set([...range1, ...range2, ...range3])).filter(item => item > 0 && item <= pageNum).sort((a, b) => a - b);
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
    if (current <= pageNum - 1) {
        buttons.push(<button onClick={() => { onChange(current + 1) }} key="page-next" className="p-1 text-center">{'>'}</button>);
    }
    return (
        <div className='flex justify-center'>
            {current}
            {buttons}
        </div>
    )
}

const Table = ({ header, rows, height, width, pagination = false, pageSize = 1 }) => {
    const [scrollPR, setPR] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const listRef = useRef(null);
    const scrollToRow = () => {
        listRef.current.scrollToItem(rows.length - 3, 'center');
    };
    // 监听滑动条大小，避免往左挤
    const updateHeaderPR = () => {
        let list = document.getElementsByClassName('List')[0];
        let scrollbarWidth = list.offsetWidth - list.clientWidth;
        //处理第一次渲染的情况
        if (scrollbarWidth == 0) {
            const scrollDiv = document.createElement('div');
            scrollDiv.style.width = '100px';
            scrollDiv.style.height = '100px';
            scrollDiv.style.overflow = 'scroll';
            scrollDiv.style.position = 'absolute';
            scrollDiv.style.top = '-9999px';
            list.appendChild(scrollDiv);
            scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            // 删除创建的元素
            list.removeChild(scrollDiv);
        }
        setPR(scrollbarWidth)
    }
    useEffect(() => {
        updateHeaderPR();
        // 添加resize事件监听器
        window.addEventListener('resize', updateHeaderPR);
    }, [curPage])
    const Row = ({ index, style }) => {
        // 这句不能删
        if (rows.length == 0) {
            return (<></>);
        }
        const classes = clsx('tr flex border', { 'list-even': index % 2 == true, 'list-odd': index % 2 == false, });
        return (
            // 不要删style
            <div className={classes} style={style}>
                {rows[index]}
            </div >
        )
    };
    const getPageNum = (totalPage, pageSize) => {
        let tmp = Math.floor(totalPage / pageSize);
        if (totalPage % pageSize > 0) {
            tmp + 1;
        }
        return tmp;
    }
    return (
        <div>
            <div>{curPage}</div>
            <button className="ExampleButton" onClick={scrollToRow}>
                Scroll to row {rows.length - 3} (align: center)
            </button>
            <TheadRow template={header} pr={scrollPR} ></TheadRow >
            <List
                className="List"
                ref={listRef}
                itemCount={rows.length}
                itemSize={35}
                height={height}
                width={width}
            >
                {Row}
            </List>
            <Pagination current={curPage} pageNum={getPageNum(rows.length, pageSize)} onChange={setCurPage}></Pagination>
        </div>
    );
}

export default Table;