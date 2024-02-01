"use client"
import { useEffect } from "react";
const ChangePageChecker = ({ onIn = () => { }, onOut = () => { } }) => {
    const key = "in";
    let timer = null;

    useEffect(() => {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                onOut();
                localStorage.setItem(key, 0);
                if (timer == null) {
                    timer = setTimeout(() => {
                        // TODO 排除断网和网速慢的情况
                        // if (navigator.onLine) {
                        console.log("上传切屏记录");
                        // }
                        timer = null;
                    }, 500);
                }
            } else {
                onIn();
                localStorage.setItem(key, 1);
            }
        });
        window.addEventListener('storage', e => {
            if (e.key == key && e.newValue == "1") {
                clearTimeout(timer);
                timer = null;
            }
        })
    })
    return (<></>)
}
export default ChangePageChecker;